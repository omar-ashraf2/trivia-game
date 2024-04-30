import { FC } from "react";
import styled from "styled-components";
import AnswerButton from "../../../components/ui/AnswerButton";

const ButtonsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 60px;
  justify-content: center;
  margin-bottom: 50px;
`;

interface TFQProps {
  handleAnswerSelection: (answer: string) => void;
  selectedAnswer: string | null;
}

const TFquestion: FC<TFQProps> = ({
  handleAnswerSelection,
  selectedAnswer,
}) => {
  const answers = ["True", "False"];

  return (
    <ButtonsRow>
      {answers.map((answer) => (
        <AnswerButton
          key={answer}
          label={answer}
          shortcut={answer[0].toUpperCase()}
          onClick={() => handleAnswerSelection(answer)}
          $isSelected={selectedAnswer === answer}
        />
      ))}
    </ButtonsRow>
  );
};

export default TFquestion;
