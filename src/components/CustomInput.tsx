import type { ChangeEvent } from "react";

export default function CustomInput({
  name,
  value,
  onChange,
}: {
  name: string;
  value: number;
  onChange: (value: number) => void;
}) {
  const options = [
    { value: 1, label: "Muy en desacuerdo" },
    { value: 2, label: "En desacuerdo" },
    { value: 3, label: "Neutral" },
    { value: 4, label: "De acuerdo" },
    { value: 5, label: "Muy de acuerdo" },
  ];

  return (
    <div className="mb-3">
      <div className="flex justify-between gap-8 text-center w-full max-w-[700px] mx-auto">
        {options.map((option) => (
          <label
            key={option.value}
            className="hover:cursor-pointer flex flex-col items-center justify-center text-xs"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                onChange(parseInt(e.target.value))
              }
              className="appearance-none w-4 h-4 rounded-full border border-violet-700 checked:bg-violet-700 checked:border-transparent transition-colors"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
