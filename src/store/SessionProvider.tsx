import { ReactNode, useEffect, useMemo, useState } from "react";
import { SessionContext } from "./SessionContext";

export const SessionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sessionToken, setSessionToken] = useState<string | null>(
    localStorage.getItem("sessionToken")
  );
  const [playerName, setPlayerName] = useState<string | null>(
    localStorage.getItem("playerName")
  );

  useEffect(() => {
    if (sessionToken !== null) {
      localStorage.setItem("sessionToken", sessionToken);
    }
    if (playerName !== null) {
      localStorage.setItem("playerName", playerName);
    }
  }, [sessionToken, playerName]);

  const value = useMemo(
    () => ({
      sessionToken,
      setSessionToken,
      playerName,
      setPlayerName,
    }),
    [sessionToken, playerName]
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};
