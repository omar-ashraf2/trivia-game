export type Question = {
  type: "multiple" | "boolean";
  difficulty: "easy" | "medium" | "hard" | null;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};