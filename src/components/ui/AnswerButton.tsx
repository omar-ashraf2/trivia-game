import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import Button from "./Button";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  shortcut: string;
  label: string;
}

const ButtonContainer = styled(Button)`
  padding: 24px 100px;
  position: relative;
  font-size: 40px;
`;

const ShortcutBox = styled.span`
  position: absolute;
  left: 5px;
  top: 5px;
  font-weight: bold;
  border: 1px solid #000;
  font-size: 25px;
  padding-inline: 7px;
`;

const Label = styled.span`
  text-transform: capitalize;
`;

const AnswerButton: React.FC<ButtonProps> = ({ shortcut, label }) => {
  return (
    <ButtonContainer>
      <ShortcutBox>{shortcut}</ShortcutBox>
      <Label>{label}</Label>
    </ButtonContainer>
  );
};

export default AnswerButton;
