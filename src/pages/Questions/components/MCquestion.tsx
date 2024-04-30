import { FC, useEffect, useState } from "react";
import AnswerButton from "../../../components/ui/AnswerButton";
import styled from "styled-components";

const ButtonsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 60px;
  justify-content: center;
  margin-bottom: 50px;
`;

interface MCQProps {
  question: {
    correct_answer: string;
    incorrect_answers: string[];
  };
  handleAnswerSelection: (answer: string) => void;
}

const MCquestion: FC<MCQProps> = ({
  question: { correct_answer, incorrect_answers },
  handleAnswerSelection,
}) => {
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);

  useEffect(() => {
    const answers = [correct_answer, ...incorrect_answers];
    const shuffleAnswers = shuffleArray(answers);
    setShuffledAnswers(shuffleAnswers);
  }, [correct_answer, incorrect_answers]);

  const shuffleArray = (array: string[]) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  return (
    <ButtonsRow>
      {shuffledAnswers.map((answer) => (
        <AnswerButton
          key={answer}
          label={answer}
          shortcut={answer[0].toUpperCase()}
          onClick={() => handleAnswerSelection(answer)}
        />
      ))}
    </ButtonsRow>
  );
};

export default MCquestion;
