import type BackendResponse from "../assets/BackendResponse";

interface Props {
  result: BackendResponse;
  student: {
    name: string;
    lastName: string;
    age?: number | null;
    gender?: number;
  };
  onRestart: () => void;
}

export default function ResultDisplay({ result, onRestart }: Props) {
  return (
    <div className="transition-all duration-300 fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="flex flex-col gap-2 overflow-x-hidden overflow-y-auto bg-white px-6 py-3 rounded-2xl shadow-xl max-w-lg w-full relative">
        <h2 className="text-xl font-bold text-center">
          Resultado del Test Vocacional
        </h2>
        <p>
          <strong>Carrera sugerida:</strong> {result.predicted_major}
        </p>
        <p>
          <strong>Perfil:</strong> {result.symbolic_reasoning.profile}
        </p>

        <div>
          <strong>Puntajes RIASEC:</strong>
          <ul className="list-disc ml-6">
            {Object.entries(result.symbolic_reasoning.scores).map(
              ([dim, val]) => (
                <li key={dim}>
                  {dim}: {(val as number).toFixed(2)}
                </li>
              )
            )}
          </ul>
        </div>

        <p className="mt-2">
          <strong>Caracteristicas destacables: </strong>
          {result.symbolic_reasoning.explanation}
        </p>

        <p className="mt-2">
          <strong>Feedback:</strong> {result.feedback}
        </p>

        <button
          onClick={onRestart}
          className="cursor-pointer bg-violet-700 text-white font-bold px-4 py-2 rounded-full w-full hover:bg-violet-800"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
}
