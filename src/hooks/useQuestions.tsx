import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Question {
  category: string;
  type: "multiple" | "boolean";
  difficulty: "easy" | "medium" | "hard" | null;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

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

interface UseQuestionsParams {
  category?: number;
  difficulty?: string | null;
  amount?: number;
  token?: string | null;
}

const useQuestions = ({
  category,
  difficulty,
  amount = 10,
  token,
}: UseQuestionsParams) => {
  return useQuery({
    queryKey: ["questions", category, difficulty, amount, token],
    queryFn: () => fetchQuestions({ category, difficulty, amount, token }),
    enabled: !!token,
    staleTime: 60000,
    retry: 2,
  });
};

export { useQuestions };
