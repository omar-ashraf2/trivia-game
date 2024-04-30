import { useState, useEffect } from "react";

const useTimer = (initialTime: number, onExpire: () => void) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft === 0) {
      onExpire();
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((currentTime) => currentTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, onExpire]);

  const resetTimer = (newTime: number) => {
    setTimeLeft(newTime);
  };

  return { timeLeft, resetTimer };
};

export default useTimer;
