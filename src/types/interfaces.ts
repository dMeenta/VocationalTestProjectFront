export interface StudentData {
  name: string;
  lastName: string;
  age: number | null;
  gender: number;
}

export interface BackendResponse {
  name: string;
  last_name: string;
  predicted_major: string;
  symbolic_reasoning: {
    profile: string;
    scores: Record<string, number>;
    explanation: string;
    activated_rules: string[];
  };
  feedback: string;
}
