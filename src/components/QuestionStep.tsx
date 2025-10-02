import { useState } from "react";
import questions from "../assets/questions";
import CustomInput from "./CustomInput";
import axios from "axios";
import type BackendResponse from "../assets/BackendResponse";
import type { StudentData } from "../types/interfaces";

interface Props {
  onComplete: (result: BackendResponse) => void;
  onRestart: () => void;
  studentData: StudentData;
}

export default function QuestionStep({
  onComplete,
  onRestart,
  studentData,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0); // índice del bloque
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);

  const QUESTIONS_PER_PAGE = 6;
  const startIndex = currentIndex * QUESTIONS_PER_PAGE;
  const currentQuestions = questions.slice(
    startIndex,
    startIndex + QUESTIONS_PER_PAGE
  );

  const handleChange = (code: string, val: number) => {
    setAnswers((prev) => ({ ...prev, [code]: val }));
  };

  const handleNext = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    // validar que todas las preguntas de la página estén contestadas
    const allAnswered = currentQuestions.every((q) => answers[q.code]);
    if (!allAnswered) return;

    const nextIndex = currentIndex + 1;
    const reachedEnd = nextIndex * QUESTIONS_PER_PAGE >= questions.length;

    if (!reachedEnd) {
      setCurrentIndex(nextIndex);
    } else {
      setLoading(true);
      try {
        const payload = {
          name: studentData.name,
          last_name: studentData.lastName,
          user_test_answers: {
            ...answers,
            age: studentData.age,
            gender: studentData.gender,
          },
        };

        const res = await axios.post<BackendResponse>(
          apiUrl + "/predict",
          payload
        );
        onComplete(res.data);
      } catch (err) {
        alert("Error al enviar las respuestas");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={onRestart}
          className="text-sm text-violet-700 font-semibold underline hover:text-violet-900 absolute top-4 right-6"
        >
          Volver al inicio
        </button>
      </div>

      {/* Renderizar las 6 preguntas */}
      <div className="bg-amber-200 px-10 py-6 rounded-4xl mb-2">
        {currentQuestions.map((q) => (
          <div key={q.code} className="mb-4">
            <h5 className="font-medium mb-2 text-center">{q.text}</h5>
            <CustomInput
              name={q.code}
              value={answers[q.code] ?? 0}
              onChange={(val) => handleChange(q.code, val)}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          onClick={handleBack}
          disabled={loading || currentIndex < 1}
          className="px-3 py-2 font-semibold rounded-full disabled:opacity-75 bg-gray-400 not-disabled:hover:bg-gray-500 not-disabled:cursor-pointer not-disabled:text-white"
        >
          Anterior
        </button>

        <button
          onClick={handleNext}
          disabled={
            loading || !currentQuestions.every((q) => answers[q.code]) // deshabilitado si faltan respuestas
          }
          className="px-3 py-2 font-semibold text-white rounded-full not-disabled:bg-violet-700 not-disabled:hover:bg-violet-900 not-disabled:cursor-pointer disabled:opacity-75 bg-gray-400 cursor-not-allowed"
        >
          {loading
            ? "Enviando..."
            : startIndex + QUESTIONS_PER_PAGE >= questions.length
            ? "Finalizar"
            : "Siguiente"}
        </button>
      </div>
    </div>
  );
}
