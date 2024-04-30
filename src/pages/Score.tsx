import { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import styled from "styled-components";
import Button from "../components/ui/Button";
import { SessionContext } from "../store/SessionContext";

const ScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StatsBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin: 20px;
`;

const Box = styled.div`
  width: 500px;
  height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #e8e8e8;
  font-size: 40px;
`;

const TimeSpent = styled.p`
  margin-top: 20px;
`;

const Time = styled.span`
  font-size: 80px;
`;

const PlayerName = styled.h2`
  position: fixed;
  left: 80px;
  top: 80px;
  font-size: 40px;
  font-weight: normal;
`;

const NewGameButton = styled(Button)`
  position: fixed;
  bottom: 150px;
  font-size: 40px;
  font-weight: normal;
`;

const Score = () => {
  const { resetSession } = useContext(SessionContext);
  const [scores, setScores] = useState<{
    score: number;
    skipped: number;
    wrong: number;
    timeSpent: number;
  } | null>(null);

  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem("gameScores") ?? "{}");
    setScores(storedScores);
  }, []);

  const { score, skipped, wrong, timeSpent } = scores || {
    score: 0,
    skipped: 0,
    wrong: 0,
    timeSpent: 0,
  };
  const playerName = localStorage.getItem("playerName") ?? "Player Name";
  const chartOptions = {
    labels: ["Correct", "Wrong", "Skipped"],
    colors: ["#82ca9d", "#ff726f", "#ffc658"],
    legend: {
      position: "bottom" as const,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom" as const,
          },
        },
      },
    ],
  };

  const chartSeries = [score, wrong, skipped];

  const handleNewGame = () => {
    resetSession();
  };

  const formattedTimeSpent =
    timeSpent >= 60 ? `${Math.floor(timeSpent / 60)} min` : `${timeSpent} sec`;

  return (
    <ScoreContainer>
      <PlayerName>{playerName}</PlayerName>
      <StatsBox>
        <Box>
          Time
          <TimeSpent>
            <Time>{formattedTimeSpent}</Time>
          </TimeSpent>
        </Box>
        <Box>
          <Chart
            type="pie"
            width={300}
            options={chartOptions}
            series={chartSeries}
          />
        </Box>
      </StatsBox>
      <NewGameButton onClick={handleNewGame}>New Game</NewGameButton>
    </ScoreContainer>
  );
};

export default Score;
