import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Question {
  category: string; 
  type: "multiple" | "boolean"; 
  difficulty: "easy" | "medium" | "hard"; 
  question: string; 
  correct_answer: string;
  incorrect_answers: string[];
}

// Define the function to fetch questions using axios with proper typing
const fetchQuestions = async ({
  category,
  difficulty,
  amount = 10,
  token,
}: UseQuestionsParams) => {
  const params = new URLSearchParams();
  params.append("amount", amount.toString());
  if (category) params.append("category", category.toString());
  if (difficulty) params.append("difficulty", difficulty);
  if (token) params.append("token", token);

  const response = await axios.get<{ results: Question[] }>(
    "https://opentdb.com/api.php",
    { params }
  );
  return response.data.results;
};

// Define TypeScript interfaces for the parameters used in the hook
interface UseQuestionsParams {
  category?: number;
  difficulty?: "easy" | "medium" | "hard";
  amount?: number;
  token?: string;
}

// Create the custom hook to fetch trivia questions
const useQuestions = ({
  category,
  difficulty,
  amount = 10,
  token,
}: UseQuestionsParams) => {
  return useQuery({
    queryKey: ["questions", category, difficulty, amount, token],
    queryFn: () => fetchQuestions({ category, difficulty, amount, token }),
    enabled: !!token, // Ensures the query runs only if a token is provided
    staleTime: 60000, // Optional: Override the global staleTime for this specific query if needed
    retry: 2, // Optional: Override the global retry setting for this specific query if needed
  });
};

export { useQuestions };
