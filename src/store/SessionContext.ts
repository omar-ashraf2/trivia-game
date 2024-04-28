import { createContext, useContext } from "react";

interface SessionState {
  sessionToken: string | null;
  playerName: string | null;
  setSessionToken: (token: string | null) => void;
  setPlayerName: (name: string | null) => void;
}

const defaultState: SessionState = {
  sessionToken: null,
  playerName: null,
  setSessionToken: () => {},
  setPlayerName: () => {},
};

export const SessionContext = createContext(defaultState);

export const useSession = () => useContext(SessionContext);
