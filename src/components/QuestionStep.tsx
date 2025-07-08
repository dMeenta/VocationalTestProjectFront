import { useState } from "react";
import questions from "../assets/questions";
import CustomInput from "./CustomInput";
import axios from "axios";
import type { StudentData } from "../App";
import type BackendResponse from "../assets/BackendResponse";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);

  const currentQuestion = questions[currentIndex];
  const selectedValue = answers[currentQuestion.code] ?? 0;

  const handleChange = (val: number) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.code]: val }));
  };

  const handleNext = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    if (!selectedValue) return;

    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
    } else {
      setLoading(true);
      try {
        const payload = {
          name: studentData.name,
          last_name: studentData.lastName,
          user_test_answers: {
            ...answers,
            age: studentData.age, // si tienes esta propiedad
            gender: studentData.gender, // lo mismo aquí
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
    <div className="bg-white p-6 rounded-3xl shadow-lg w-full max-w-4xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-center w-full">
          Pregunta {currentIndex + 1} de {questions.length}
        </h2>
        <button
          onClick={onRestart}
          className="text-sm text-violet-700 font-semibold underline hover:text-violet-900 absolute top-4 right-6"
        >
          Volver al inicio
        </button>
      </div>

      <div className="mb-6">
        <p className="font-medium mb-6">{currentQuestion.text}</p>
        <CustomInput
          name={currentQuestion.code}
          value={selectedValue}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-wrap gap-4 mt-6 justify-end">
        {currentIndex > 0 && (
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded font-semibold"
          >
            Anterior
          </button>
        )}

        <button
          onClick={handleNext}
          disabled={!selectedValue || loading}
          className={`px-4 py-2 font-bold text-white rounded ${
            selectedValue
              ? "bg-violet-700 hover:bg-violet-800"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {loading
            ? "Enviando..."
            : currentIndex === questions.length - 1
            ? "Finalizar"
            : "Siguiente"}
        </button>
      </div>
    </div>
  );
}
