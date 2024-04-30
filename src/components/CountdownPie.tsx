import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface CountdownPieProps {
  initialSeconds: number;
  onExpire: () => void;
}

const CountdownPieStyled = styled.svg`
  width: 50px;
  height: 50px;
  position: fixed;
  top: 50px;
  left: 50px;
`;

const CountdownPie: React.FC<CountdownPieProps> = ({
  initialSeconds,
  onExpire,
}) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [expired, setExpired] = useState(false);
  const radius = 20;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (seconds <= 0 && !expired) {
      onExpire();
      setExpired(true);
    }
  }, [seconds, onExpire, expired]);

  useEffect(() => {
    setSeconds(initialSeconds);
    setExpired(false);
  }, [initialSeconds]);

  const strokeDasharray = `${
    (seconds / initialSeconds) * circumference
  } ${circumference}`;

  return (
    <CountdownPieStyled viewBox="0 0 50 50">
      <circle
        cx="25"
        cy="25"
        r={radius}
        fill="none"
        stroke="#ddd"
        strokeWidth="10"
      />
      <circle
        cx="25"
        cy="25"
        r={radius}
        fill="none"
        stroke="black"
        strokeWidth="10"
        strokeDasharray={strokeDasharray}
        transform="rotate(-90 25 25)"
      />
      <text x="50%" y="50%" textAnchor="middle" stroke="#51c5cf" dy=".3em">
        {seconds}
      </text>
    </CountdownPieStyled>
  );
};

export default CountdownPie;
