import styled from "styled-components";
import AnswerButton from "../components/ui/AnswerButton";
import Button from "../components/ui/Button";
import { useParams } from "react-router-dom";
import { useQuestions } from "../hooks/useQuestions";
import { useContext } from "react";
import { SessionContext } from "../store/SessionContext";
import { useToast } from "../store/useToast";

const QuizContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ButtonsRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 60px;
  margin-bottom: 50px;
`;

const QuestionText = styled.p`
  margin: 50px 0;
  font-size: calc(1.5vw + 1em);
  text-align: center;
  font-weight: bold;
  color: #333;
  max-width: 70vw;
`;

const ButtonsFooter = styled.div`
  display: flex;
  justify-content: center;
  gap: 160px;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 120px;
`;

const Game = () => {
  const { showToast } = useToast();
  const { sessionToken, difficulty, resetSession } = useContext(SessionContext);
  const { id: categoryId } = useParams<{ id: string }>();

  const {
    data: questions,
    isLoading,
    isError,
    error,
  } = useQuestions({
    category: categoryId ? parseInt(categoryId) : undefined,
    difficulty: difficulty,
    token: sessionToken,
    amount: 10,
  });

  // console.log(questions);

  if (isLoading) {
    return <div>Loading questions...</div>;
  }

  if (isError && error) {
    showToast(`Error: ${error.message}`);
  }
  return (
    <QuizContainer>
      <QuestionText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi suscipit
        eu felis eget tincidunt?
      </QuestionText>
      <ButtonsRow>
        <AnswerButton label="True" shortcut="T" />
        <AnswerButton label="False" shortcut="F" />
      </ButtonsRow>
      <ButtonsFooter>
        <Button onClick={() => {}} $padding="10px 60px">
          Skip
        </Button>
        <Button onClick={() => {}} $padding="10px 60px">
          Next
        </Button>
      </ButtonsFooter>
    </QuizContainer>
  );
};

export default Game;
