import { FC, useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/ui/Button";
import { useQuestions } from "../../hooks/useQuestions";
import useTimer from "../../hooks/useTimer";
import { SessionContext } from "../../store/SessionContext";
import { useToast } from "../../store/useToast";
import MCquestion from "./components/MCquestion";
import TFquestion from "./components/TFquestion";
import { calculateScore, getTimerValue } from "./helpers/helpers";

const QuizContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const Timer = styled.div`
  font-size: 1.5rem;
  color: red;
`;

const Game: FC = () => {
  const { showToast } = useToast();
  const { sessionToken, difficulty } = useContext(SessionContext);
  const { id: categoryId } = useParams<{ id: string }>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);

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

  const handleSkipQuestion = () => {
    setSelectedAnswer(null);
    if (questions && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((index) => index + 1);
    } else {
      showToast(`Quiz completed! Your score: ${score}`);
    }
  };

  const { timeLeft, resetTimer } = useTimer(
    getTimerValue(difficulty),
    handleSkipQuestion
  );

  const handleNextQuestion = useCallback(() => {
    if (
      questions &&
      selectedAnswer === questions[currentQuestionIndex].correct_answer
    ) {
      setScore((score) => calculateScore(score, true));
    }
    setSelectedAnswer(null);
    if (questions && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((index) => index + 1);
      resetTimer(getTimerValue(difficulty));
    } else {
      showToast(`Quiz completed! Your score: ${score}`);
    }
  }, [
    currentQuestionIndex,
    questions,
    selectedAnswer,
    score,
    showToast,
    difficulty,
    resetTimer,
  ]);

  useEffect(() => {
    if (questions) {
      resetTimer(getTimerValue(difficulty));
    }
  }, [questions, difficulty, resetTimer]);

  const handleAnswerSelection = (answer: string) => {
    setSelectedAnswer(answer);
  };

  if (isLoading) {
    return <div>Loading questions...</div>;
  }

  if (isError && error) {
    showToast(`Error: ${error.message}`);
  }

  if (!questions || questions.length === 0) {
    return <div>No questions available. Please try again later.</div>;
  }

  return (
    <QuizContainer>
      <QuestionText>{questions[currentQuestionIndex].question}</QuestionText>
      {questions[currentQuestionIndex].type === "multiple" ? (
        <MCquestion
          question={questions[currentQuestionIndex]}
          handleAnswerSelection={handleAnswerSelection}
        />
      ) : (
        <TFquestion handleAnswerSelection={handleAnswerSelection} />
      )}

      <Timer>Time Remaining: {timeLeft} seconds</Timer>
      <ButtonsFooter>
        <Button onClick={handleSkipQuestion}>Skip</Button>
        <Button onClick={handleNextQuestion}>Next</Button>
      </ButtonsFooter>
    </QuizContainer>
  );
};

export default Game;
