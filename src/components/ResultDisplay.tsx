import type { BackendResponse } from "./TestForm";

interface Props {
  result: BackendResponse;
  student: { name: string; gender: string; school: string };
  onRestart: () => void;
}

export default function ResultDisplay({ result, student, onRestart }: Props) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg w-full max-w-md text-center">
      <h2 className="text-2xl font-bold mb-2">Resultado del Test</h2>
      <p className="mb-1">Estudiante: <strong>{student.name}</strong></p>
      <p className="mb-4">Colegio: <strong>{student.school}</strong></p>

      <div className="text-left mb-4">
        <ul className="list-disc ml-5">
          {Object.entries(result.profile).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={onRestart}
        className="bg-violet-700 text-white font-bold px-4 py-2 rounded-full hover:bg-violet-800"
      >
        Volver al inicio
      </button>
    </div>
  );
}
