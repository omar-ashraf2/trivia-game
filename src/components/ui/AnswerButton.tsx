import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import Button from "./Button";

interface AnswerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  shortcut: string;
  label: string;
  onClick?: () => void;
}

const ButtonContainer = styled(Button)`
  padding: 24px 60px;
  position: relative;
  font-size: 28px;
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

const AnswerButton: React.FC<AnswerButtonProps> = ({
  shortcut,
  label,
  onClick,
}) => {
  return (
    <ButtonContainer onClick={onClick}>
      <ShortcutBox>{shortcut}</ShortcutBox>
      <Label>{label}</Label>
    </ButtonContainer>
  );
};

export default AnswerButton;
