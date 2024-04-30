import {
  FC,
  ReactNode,
  createContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";

type SessionState = {
  sessionToken: string | null;
  playerName: string | null;
  difficulty: string | null;
  gameScores: GameScores;
  setSessionToken: (token: string | null) => void;
  setPlayerName: (name: string | null) => void;
  setDifficulty: (difficulty: string | null) => void;
  updateGameScores: (scores: Partial<GameScores>) => void;
  resetSession: () => void;
};

type GameScores = {
  score: number;
  wrong: number;
  skipped: number;
  timeSpent: number;
};

const defaultState: SessionState = {
  sessionToken: null,
  playerName: null,
  difficulty: null,
  gameScores: {
    score: 0,
    wrong: 0,
    skipped: 0,
    timeSpent: 0,
  },
  setSessionToken: () => {},
  setPlayerName: () => {},
  setDifficulty: () => {},
  updateGameScores: () => {},
  resetSession: () => {},
};

export const SessionContext = createContext<SessionState>(defaultState);

export const SessionProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [playerName, setPlayerName] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [gameScores, setGameScores] = useState<GameScores>(
    defaultState.gameScores
  );

  const resetSession = useCallback(() => {
    localStorage.clear();
    setSessionToken(null);
    setPlayerName(null);
    setDifficulty(null);
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("sessionToken");
    const name = localStorage.getItem("playerName");
    const diff = localStorage.getItem("difficulty");
    setSessionToken(token);
    setPlayerName(name);
    setDifficulty(diff);

    if (token && name && diff) {
      const sessionStartTime = localStorage.getItem("sessionStartTime");
      if (
        sessionStartTime &&
        new Date().getTime() - parseInt(sessionStartTime) > 21600000
      ) {
        resetSession();
      }
    } else {
      navigate("/");
    }
  }, [navigate, resetSession]);

  useEffect(() => {
    if (sessionToken && playerName && difficulty) {
      localStorage.setItem("sessionStartTime", String(new Date().getTime()));
    }
  }, [sessionToken, playerName, difficulty]);

  useEffect(() => {
    localStorage.setItem("gameScores", JSON.stringify(gameScores));
  }, [gameScores]);

  const updateGameScores = useCallback((scores: Partial<GameScores>) => {
    setGameScores((prevScores) => ({ ...prevScores, ...scores }));
  }, []);

  const value = useMemo(
    () => ({
      sessionToken,
      playerName,
      difficulty,
      gameScores,
      setSessionToken,
      setPlayerName,
      setDifficulty,
      updateGameScores,
      resetSession,
    }),
    [
      sessionToken,
      playerName,
      difficulty,
      gameScores,
      setSessionToken,
      setPlayerName,
      setDifficulty,
      updateGameScores,
      resetSession,
    ]
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};
