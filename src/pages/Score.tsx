import { useLocation } from "react-router-dom";

const Score = () => {
  const location = useLocation();
  const score = location.state?.score;

  return (
    <div>
      <h1>Your Score: {score}</h1>
    </div>
  );
};

export default Score;
