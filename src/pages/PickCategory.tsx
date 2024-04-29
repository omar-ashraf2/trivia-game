import { useState } from "react";
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

const CategoryItem = styled.button<{ selected: boolean }>`
  border: solid 1px #000;
  background-color: ${({ selected }) => (selected ? "#4CAF50" : "#b6b6b6")};
  border-radius: 10px;
  width: 300px;
  height: 100px;
  cursor: pointer;
  font-size: 18px;
  color: white;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3e8e41;
  }
`;

const PickCategory = () => {
  const navigate = useNavigate();
  const { data: categories, isLoading, isError, error } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const { showToast } = useToast();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError && error) {
    showToast(`Error: ${error.message}`);
  }

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  const handleStartClick = () => {
    if (selectedCategory) {
      navigate(`/category/${selectedCategory}`);
    } else {
      showToast("Please select a category before starting.");
    }
  };

  return (
    <QuestionCategoryContainer>
      <Header>Questions Category</Header>
      <CategoryList>
        {categories?.map((category) => (
          <CategoryItem
            key={category.id}
            selected={category.id === selectedCategory}
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
