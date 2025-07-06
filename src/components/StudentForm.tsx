import { useState } from "react";

interface Props {
  onNext: (data: { name: string; gender: string; school: string }) => void;
  onRestart: () => void;
}

export default function StudentForm({ onNext }: Props) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [school, setSchool] = useState("");

  const isValid = name && gender && school;

  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg w-full max-w-md">
      <h1 className="text-xl font-bold mb-4 text-center">Datos del Estudiante</h1>

      <div className="space-y-6">
        <input
          type="text"
          placeholder="Nombre"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          value={gender}
          className="w-full p-2 border rounded"
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Selecciona género</option>
          <option value="Femenino">Femenino</option>
          <option value="Masculino">Masculino</option>
          <option value="Otro">Otro</option>
        </select>
        <input
          type="text"
          placeholder="Colegio"
          className="w-full p-2 border rounded"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />

        <button
          disabled={!isValid}
          className={`w-full p-2 rounded text-white font-bold ${
            isValid ? "bg-violet-700 hover:bg-violet-800" : "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={() => onNext({ name, gender, school })}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
