import styled from "styled-components";
import Button from "../components/ui/Button";
import { useEffect, useState } from "react";
import { useRequestToken } from "../hooks/useToken";

const WelcomeScreenContainer = styled.section`
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
  &:focus {
    outline: none;
  }
`;
const ButtonsGroup = styled.div`
  display: flex;
  gap: 35px;
`;

const WelcomeScreen = () => {
  const [playerName, setPlayerName] = useState("");
  const { mutate: requestToken, error, isError, isPending } = useRequestToken();

  useEffect(() => {
    requestToken();
  }, [requestToken]);



  if (isPending) return <div>Loading...</div>;
  if (isError && error) return <div>Error: {error.message}</div>;

  return (
    <WelcomeScreenContainer>
      <PlayerBox>
        <PlayerNameInput
          type="text"
          placeholder="player name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <ButtonsGroup>
          <Button width="90px" height="75px">
            easy
          </Button>
          <Button width="90px" height="75px">
            medium
          </Button>
          <Button width="90px" height="75px">
            hard
          </Button>
        </ButtonsGroup>
      </PlayerBox>
      <Button
        padding="10px 20px"
        width="150px"
        disabled={isPending}
      >
        PLAY
      </Button>
    </WelcomeScreenContainer>
  );
};

export default WelcomeScreen;
