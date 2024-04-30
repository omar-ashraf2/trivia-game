import { FC, useCallback, useContext, useEffect, useState } from "react";
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
  const { sessionToken, difficulty, gameScores, updateGameScores } =
    useContext(SessionContext);
  const { id: categoryId } = useParams<{ id: string | undefined }>();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(gameScores.score || 0);
  const [wrongAnswersCount, setWrongAnswersCount] = useState(
    gameScores.wrong || 0
  );
  const [skippedAnswersCount, setSkippedAnswersCount] = useState(
    gameScores.skipped || 0
  );
  const [timeSpent, setTimeSpent] = useState(gameScores.timeSpent || 0);

  const [playedCategories, setPlayedCategories] = useState<number[]>([]);

  useEffect(() => {
    updateGameScores({
      score,
      wrong: wrongAnswersCount,
      skipped: skippedAnswersCount,
      timeSpent,
    });
  }, [
    score,
    wrongAnswersCount,
    skippedAnswersCount,
    timeSpent,
    updateGameScores,
  ]);

  const {
    data: questions,
    isLoading,
    isError,
    error,
  } = useQuestions({
    category: categoryId ? parseInt(categoryId) : undefined,
    difficulty: difficulty,
    token: sessionToken,
    amount: 5,
  });

  useEffect(() => {
    const storedCategories = JSON.parse(
      localStorage.getItem("playedCategories") ?? "[]"
    );
    setPlayedCategories(storedCategories);
  }, []);

  const navigateToEnd = useCallback(() => {
    if (playedCategories.length >= 3) {
      navigate("/score");
    } else {
      navigate("/pick-category");
    }
  }, [navigate, playedCategories.length]);

  const handleSkipQuestion = () => {
    setSkippedAnswersCount(skippedAnswersCount + 1);
    navigateToNextQuestion();
  };

  const navigateToNextQuestion = () => {
    if (questions && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigateToEnd();
    }
  };

  const handleNextQuestion = () => {
    if (!questions) {
      showToast("No questions available. Please try a different category.");
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion?.correct_answer;

    if (selectedAnswer === null) {
      showToast("You must choose an answer.");
      return;
    }

    if (isCorrect) {
      setScore(score + 1);
    } else if (selectedAnswer !== null) {
      setWrongAnswersCount(wrongAnswersCount + 1);
    }

    setSelectedAnswer(null);
    navigateToNextQuestion();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeSpent(timeSpent + 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeSpent]);

  if (isLoading) return <div>Loading questions...</div>;
  if (isError && error) showToast(`Error: ${error.message}`);
  if (!questions || questions.length === 0)
    return <div>No questions available. Please try again later.</div>;

  return (
    <QuizContainer>
      <QuestionText>{questions[currentQuestionIndex]?.question}</QuestionText>
      {questions[currentQuestionIndex]?.type === "multiple" ? (
        <MCquestion
          question={questions[currentQuestionIndex]}
          handleAnswerSelection={setSelectedAnswer}
          selectedAnswer={selectedAnswer}
        />
      ) : (
        <TFquestion
          handleAnswerSelection={setSelectedAnswer}
          selectedAnswer={selectedAnswer}
        />
      )}
      <CountdownPie
        key={currentQuestionIndex}
        initialSeconds={getTimerValue(difficulty)}
        onExpire={handleSkipQuestion}
      />
      <ButtonsFooter>
        <Button $padding="10px 50px" onClick={handleSkipQuestion}>
          Skip
        </Button>
        <Button $padding="10px 50px" onClick={handleNextQuestion}>
          Next
        </Button>
      </ButtonsFooter>
    </QuizContainer>
  );
};

export default Game;
