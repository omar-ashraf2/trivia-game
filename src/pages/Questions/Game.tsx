import { FC, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CountdownPie from "../../components/CountdownPie";
import Button from "../../components/ui/Button";
import { useQuestions } from "../../hooks/useQuestions";
import { SessionContext } from "../../store/SessionContext";
import { useToast } from "../../store/useToast";
import MCquestion from "./components/MCquestion";
import TFquestion from "./components/TFquestion";
import { getTimerValue } from "./helpers/helpers";

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

const Game: FC = () => {
  const { showToast } = useToast();
  const { sessionToken, difficulty } = useContext(SessionContext);
  const { id: categoryId } = useParams<{ id: string }>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [wrongAnswersCount, setWrongAnswersCount] = useState(0);

  const navigate = useNavigate();

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

  const handleNextQuestion = () => {
    if (
      questions &&
      selectedAnswer &&
      selectedAnswer === questions[currentQuestionIndex].correct_answer
    ) {
      setScore((score) => score + 1);
    } else {
      setWrongAnswersCount((count) => count + 1);
    }
    setSelectedAnswer(null);
    if (questions && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((index) => index + 1);
    }
  };

  const handleSkipQuestion = () => {
    setSelectedAnswer(null);
    if (questions && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((index) => index + 1);
    }
  };

  const handleAnswerSelection = (answer: string) => {
    setSelectedAnswer(answer);
  };

  useEffect(() => {
    if (score + wrongAnswersCount === 10) {
      navigate("/score", { state: { score } });
    }
  }, [score, wrongAnswersCount, navigate]);

  if (isLoading) {
    return <div>Loading questions...</div>;
  }

  if (isError && error) {
    showToast(`Error: ${error.message}`);
  }

  if (!questions || questions.length === 0) {
    return (
      <div style={{ textAlign: "center" }}>
        No questions available. <br /> Please select another category or try
        again later.
      </div>
    );
  }

  return (
    <QuizContainer>
      <QuestionText>{questions[currentQuestionIndex].question}</QuestionText>
      {questions[currentQuestionIndex].type === "multiple" ? (
        <MCquestion
          question={questions[currentQuestionIndex]}
          handleAnswerSelection={handleAnswerSelection}
          selectedAnswer={selectedAnswer}
        />
      ) : (
        <TFquestion
          handleAnswerSelection={handleAnswerSelection}
          selectedAnswer={selectedAnswer}
        />
      )}
      <CountdownPie
        key={currentQuestionIndex}
        initialSeconds={getTimerValue(difficulty)}
        onExpire={handleNextQuestion}
      />
      <ButtonsFooter>
        <Button $padding="10px 50px" onClick={handleSkipQuestion}>Skip</Button>
        <Button $padding="10px 50px" onClick={handleNextQuestion}>Next</Button>
      </ButtonsFooter>
    </QuizContainer>
  );
};

export default Game;
