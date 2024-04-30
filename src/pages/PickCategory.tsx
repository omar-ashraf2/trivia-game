import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/ui/Button";
import { useCategories } from "../hooks/useCategories";
import { useToast } from "../store/useToast";

const QuestionCategoryContainer = styled.section`
  width: 100%;
  text-align: center;
`;

const Header = styled.h1`
  font-size: 60px;
  font-weight: 600;
`;

const CategoryList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 60px;
  margin: 30px auto 50px;
  padding-inline: 15px;
  max-height: 65vh;
  overflow-y: auto;
  overflow-x: hidden;
`;

const CategoryItem = styled.button<{ selected: boolean; disabled: boolean }>`
  border: solid 1px #000;
  background-color: ${({ selected, disabled }) =>
    selected ? "#4CAF50" : disabled ? "#5c5555" : "#b6b6b6"};
  border-radius: 10px;
  width: 300px;
  height: 100px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-size: 18px;
  color: white;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${({ disabled }) => (disabled ? "" : "#3e8e41")};
  }
`;

const PickCategory = () => {
  const navigate = useNavigate();
  const { data: categories, isLoading, isError, error } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [playedCategories, setPlayedCategories] = useState<number[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    const storedCategories = JSON.parse(
      localStorage.getItem("playedCategories") ?? "[]"
    );
    setPlayedCategories(storedCategories);
  }, []);

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  const handleStartClick = () => {
    if (selectedCategory !== null) {
      const updatedPlayedCategories = [...playedCategories, selectedCategory];
      localStorage.setItem(
        "playedCategories",
        JSON.stringify(updatedPlayedCategories)
      );
      setPlayedCategories(updatedPlayedCategories);
      navigate(`/category/${selectedCategory}`);
    } else {
      showToast("Please select a category to start.");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError && error) {
    showToast(`Error: ${error.message}`);
    return <div>Error loading categories.</div>;
  }

  return (
    <QuestionCategoryContainer>
      <Header>Questions Category</Header>
      <CategoryList>
        {categories?.map((category) => (
          <CategoryItem
            key={category.id}
            selected={category.id === selectedCategory}
            disabled={playedCategories.includes(category.id)}
            onClick={() => handleCategorySelect(category.id)}
          >
            {category.name}
          </CategoryItem>
        ))}
      </CategoryList>
      <Button $width="160px" onClick={handleStartClick}>
        START
      </Button>
    </QuestionCategoryContainer>
  );
};

export default PickCategory;
