import {
  FC,
  ReactNode,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type SessionState = {
  sessionToken: string | null;
  playerName: string | null;
  difficulty: string | null;
  setSessionToken: (token: string | null) => void;
  setPlayerName: (name: string | null) => void;
  setDifficulty: (difficulty: string | null) => void;
  resetSession: () => void;
};

const defaultState: SessionState = {
  sessionToken: null,
  playerName: null,
  difficulty: null,
  setSessionToken: () => {},
  setPlayerName: () => {},
  setDifficulty: () => {},
  resetSession: () => {},
};

export const SessionContext = createContext<SessionState>(defaultState);

export const SessionProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [sessionToken, setSessionToken] = useState<string | null>(
    localStorage.getItem("sessionToken")
  );
  const [playerName, setPlayerName] = useState<string | null>(
    localStorage.getItem("playerName")
  );
  const [difficulty, setDifficulty] = useState<string | null>(
    localStorage.getItem("difficulty")
  );

  useEffect(() => {
    try {
      localStorage.setItem("sessionToken", sessionToken ?? "");
      localStorage.setItem("playerName", playerName ?? "");
      localStorage.setItem("difficulty", difficulty ?? "");
    } catch (error) {
      console.error("Failed to save to localStorage", error);
    }
  }, [sessionToken, playerName, difficulty]);

  const resetSession = () => {
    try {
      localStorage.removeItem("sessionToken");
      localStorage.removeItem("playerName");
      localStorage.removeItem("difficulty");
    } catch (error) {
      console.error("Failed to clear localStorage", error);
    }
    setSessionToken(null);
    setPlayerName(null);
    setDifficulty(null);
  };

  const value = useMemo(
    () => ({
      sessionToken,
      playerName,
      difficulty,
      setSessionToken,
      setPlayerName,
      setDifficulty,
      resetSession,
    }),
    [sessionToken, playerName, difficulty]
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};
