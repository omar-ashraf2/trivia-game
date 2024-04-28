import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { useCategories } from "../hooks/useCategories";

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
`;

const CategoryItem = styled.button`
  border: solid 1px #000;
  background-color: #b6b6b6;
  border-radius: 10px;
  width: 300px;
  height: 100px;
  cursor: pointer;
`;

const PickCategory = () => {
  const navigate = useNavigate();
  const { data: categories, isLoading, isError, error } = useCategories();

  if (isLoading) {
    return <div>Loading...</div>; // Or some loading spinner
  }

  if (isError) {
    return <div>Error: {error.message}</div>; // Adjust error handling as needed
  }

  return (
    <QuestionCategoryContainer>
      <Header>Questions Category</Header>
      {categories && (
        <CategoryList>
          {categories.map((category) => (
            <CategoryItem
              key={category.id}
              onClick={() => navigate(`/category/${category.id}`)}
            >
              {category.name}
            </CategoryItem>
          ))}
        </CategoryList>
      )}
      <Button width="160px" onClick={() => navigate("/game")}>
        START
      </Button>
    </QuestionCategoryContainer>
  );
};

export default PickCategory;
