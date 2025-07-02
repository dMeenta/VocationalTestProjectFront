import { useState } from "react";
import type { FormEvent } from "react";
import axios from "axios";
import CustomInput from "./CustomInput";
import questions from "../assets/questions";

export interface BackendResponse {
  cluster: number;
  profile: Profile;
}

export interface Profile {
  R: number;
  I: number;
  A: number;
  S: number;
  E: number;
  C: number;
}

export default function TestForm() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<BackendResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (code: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [code]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    // Verifica que todas estén respondidas
    const unanswered = questions.filter((q) => !(q.code in answers));
    if (unanswered.length > 0) {
      alert("Por favor responde todas las preguntas antes de enviar.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post<BackendResponse>(
        "http://localhost:8000/predict",
        { answers }
      );
      setResult(res.data);
    } catch (err) {
      console.error("Error al predecir:", err);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-3/4 w-1/2 overflow-y-scroll p-6 bg-teal-100 rounded-4xl">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Test Vocacional RIASEC
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {questions.map((q) => (
          <div key={q.code} className="mb-2">
            <p className="font-semibold mb-1">
              {q.text}
              {!answers[q.code] && (
                <span className="text-red-600 ml-2 text-sm font-normal">
                  (Sin respuesta)
                </span>
              )}
            </p>
            <CustomInput
              name={q.code}
              value={answers[q.code] ?? 0} // 0 para no marcar ningún radio
              onChange={(val) => handleChange(q.code, val)}
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={loading}
          className="bg-violet-700 hover:cursor-pointer font-semibold transition-colors duration-300 hover:bg-indigo-800 w-full text-white px-4 py-2 rounded-full"
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </form>

      {result && (
        <div className="mt-6 text-xl">
          <strong>Tu perfil vocacional es:</strong>
          <ul className="list-disc ml-5 mt-2">
            {Object.entries(result.profile).map(([key, value]) => (
              <li key={key}>
                {key}: {value.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
