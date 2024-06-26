import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer";
import Button from "../components/ui/Button";
import { footerItemsWelcomeScreen } from "../constants/footerItems";
import { useRequestToken } from "../hooks/useToken";
import { useToast } from "../store/useToast";

const HomePageContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 45px;
`;

const PlayerBox = styled.div`
  width: 616px;
  height: 448px;
  background-color: #d9d9d9;
  border-radius: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 35px;
`;

const PlayerNameInput = styled.input`
  border-radius: 4px;
  border: solid 1px #000;
  background-color: #f2f2f2;
  padding: 30px 35px;
  font-size: 25px;
  outline: none;
`;

const ButtonsGroup = styled.div`
  display: flex;
  gap: 35px;
`;

const DifficultyButton = styled(Button)<{
  selected: boolean;
  $padding: string;
}>`
  background-color: ${({ selected }) => (selected ? "#4CAF50" : "#b6b6b6")};
  color: ${({ selected }) => (selected ? "white" : "black")};
  padding: ${({ $padding }) => $padding};
  &:hover {
    background-color: ${({ selected }) => (selected ? "#45a049" : "#ddd")};
  }
`;

const HomePage = () => {
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState("");
  const { mutate: requestToken, isError, isPending } = useRequestToken();
  const [difficulty, setDifficulty] = useState<string>("");
  const { showToast } = useToast();

  const handlePlayClick = useCallback(() => {
    if (!playerName || !difficulty) {
      showToast("Please enter your name and select a difficulty level.");
      return;
    }
    requestToken(undefined, {
      onSuccess: (data) => {
        localStorage.setItem("sessionToken", data.token);
        localStorage.setItem("playerName", playerName);
        localStorage.setItem("difficulty", difficulty);
        navigate("/pick-category");
      },
      onError: () => {
        showToast("Error requesting token.");
      },
    });
  }, [navigate, playerName, difficulty, requestToken, showToast]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key.toUpperCase()) {
        case "E":
          setDifficulty("easy");
          break;
        case "M":
          setDifficulty("medium");
          break;
        case "H":
          setDifficulty("hard");
          break;
        case "P":
          handlePlayClick();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handlePlayClick]);

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: Token request failed!</div>;
  }

  return (
    <>
      <HomePageContainer>
        <PlayerBox>
          <PlayerNameInput
            type="text"
            placeholder="Player name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <ButtonsGroup>
            {["easy", "medium", "hard"].map((level) => (
              <DifficultyButton
                key={level}
                $padding="35px 15px"
                selected={difficulty === level}
                onClick={() => setDifficulty(level)}
              >
                {level}
              </DifficultyButton>
            ))}
          </ButtonsGroup>
        </PlayerBox>
        <Button
          onClick={handlePlayClick}
          $padding="10px 20px"
          $width="150px"
          disabled={isPending || !playerName || !difficulty}
        >
          PLAY
        </Button>
      </HomePageContainer>
      <Footer items={footerItemsWelcomeScreen} />
    </>
  );
};

export default HomePage;
