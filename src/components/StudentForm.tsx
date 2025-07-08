import { useState } from "react";
import ResultsModal from "./ResultsModal";
import ResultDisplay from "./ResultDisplay";

interface Props {
  onNext: (data: {
    name: string;
    lastName: string;
    age: number | null;
    gender: number;
  }) => void;
  onRestart: () => void;
}

export default function StudentForm({ onNext }: Props) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState(0);
  const [age, setAge] = useState<number | null>(null);

  const isValid =
    name.trim() !== "" &&
    lastName.trim() !== "" &&
    age !== null &&
    age > 0 &&
    gender !== 0;

  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg w-full max-w-md">
      <h1 className="text-xl font-bold mb-4 text-center">
        Datos del Estudiante
      </h1>

      <div className="space-y-6">
        <input
          type="text"
          placeholder="Nombre"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Apellido"
          className="w-full p-2 border rounded"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Ingrese su edad"
          className="w-full p-2 border rounded"
          value={age ?? ""}
          onChange={(e) => {
            const val = e.target.value;
            setAge(val === "" || val === "0" ? null : Number(val));
          }}
        />
        <select
          value={gender}
          className="w-full p-2 border rounded"
          onChange={(e) => setGender(Number(e.target.value))}
        >
          <option disabled value="0">
            Seleccione su género
          </option>
          <option value="1">Masculino</option>
          <option value="2">Femenino</option>
          <option value="3">Otro</option>
        </select>

        <button
          disabled={!isValid}
          className={`w-full p-2 rounded text-white font-bold transition-colors duration-500  ${
            isValid
              ? "bg-violet-700 hover:bg-violet-900 hover:cursor-pointer"
              : "bg-gray-600 cursor-not-allowed"
          }`}
          onClick={() => onNext({ name, lastName, age, gender })}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
