import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import Button from "./Button";

interface AnswerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  shortcut: string;
  label: string;
  $isSelected?: boolean;
}

const ButtonContainer = styled(Button)<{ $isSelected?: boolean }>`
  padding: 24px 60px;
  position: relative;
  font-size: 20px;
  background-color: ${({ $isSelected }) =>
    $isSelected ? "#0c8e0c" : "lightgrey"};
  color: ${({ $isSelected }) => ($isSelected ? "white" : "black")};
  &:hover {
    background-color: ${({ $isSelected }) =>
      $isSelected ? "#169f16dc" : "#65626285"};
  }
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
  $isSelected,
  ...props
}) => {
  return (
    <ButtonContainer onClick={onClick} $isSelected={$isSelected} {...props}>
      <ShortcutBox>{shortcut}</ShortcutBox>
      <Label>{label}</Label>
    </ButtonContainer>
  );
};

export default AnswerButton;
