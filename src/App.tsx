import { useState } from "react";
import StudentForm from "./components/StudentForm";
import QuestionStep from "./components/QuestionStep";
import ResultDisplay from "./components/ResultDisplay";
import type { BackendResponse, StudentData } from "./types/interfaces";

export default function App() {
  const [step, setStep] = useState<"student" | "test" | "result">("student");
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [result, setResult] = useState<BackendResponse | null>(null);

  const handleStartTest = (data: StudentData) => {
    setStudentData(data);
    setStep("test");
  };

  const handleTestCompleted = (result: BackendResponse) => {
    setResult(result);
    setStep("result");
  };

  const restart = () => {
    setStudentData(null);
    setResult(null);
    setStep("student");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      {step === "student" && (
        <StudentForm onNext={handleStartTest} onRestart={restart} />
      )}
      {step === "test" && studentData && (
        <QuestionStep
          onComplete={handleTestCompleted}
          onRestart={restart}
          studentData={studentData} // <--- pasar el studentData
        />
      )}
      {step === "result" && result && (
        <ResultDisplay
          result={result}
          student={studentData!}
          onRestart={restart}
        />
      )}
    </div>
  );
}
