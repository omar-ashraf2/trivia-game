import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Category {
  id: number;
  name: string;
}

const fetchCategories = async (): Promise<Category[]> => {
  const response = await axios.get<{ trivia_categories: Category[] }>(
    "https://opentdb.com/api_category.php"
  );
  const categories = response.data.trivia_categories;
  return categories;
};

// Custom hook to use the categories query
export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    retry: 2,
  });
};
