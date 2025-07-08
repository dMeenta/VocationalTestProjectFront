import type BackendResponse from "../assets/BackendResponse";

interface Props {
  result: BackendResponse;
  onClose: () => void;
}

export default function ResultsModal({ result, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl max-w-lg w-full relative">
        <h2 className="text-2xl font-bold mb-2 text-center">
          Resultado del Test Vocacional
        </h2>
        <p className="mb-1">
          <strong>Nombre:</strong> {result.name} {result.last_name}
        </p>
        <p className="mb-1">
          <strong>Carrera sugerida:</strong> {result.predicted_major}
        </p>
        <p className="mb-1">
          <strong>Perfil:</strong> {result.symbolic_reasoning.profile}
        </p>

        <div className="mt-4">
          <strong>Puntajes:</strong>
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

        <p className="mt-4">
          <strong>Explicación simbólica:</strong>{" "}
          {result.symbolic_reasoning.explanation}
        </p>

        <p className="mt-4">
          <strong>Feedback:</strong> {result.feedback}
        </p>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-violet-700 text-white font-bold px-4 py-2 rounded hover:bg-violet-800"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
