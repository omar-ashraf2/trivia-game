import { FC } from "react";
import styled from "styled-components";

interface ShortcutButtonProps {
  label: string;
  [key: string]: unknown;
}

const ShortcutButtonStyled = styled.button`
  font-size: 25px;
`;

const FirstLetter = styled.span`
  background-color: #b6b6b6;
  border: solid 1px #000;
  color: #000;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
`;

const ShortcutButton: FC<ShortcutButtonProps> = ({ label, ...props }) => {
  const firstLetter = label.charAt(0).toUpperCase();
  const restOfLabel = label.slice(1);

  return (
    <ShortcutButtonStyled {...props}>
      <FirstLetter>{firstLetter}</FirstLetter>
      {restOfLabel}
    </ShortcutButtonStyled>
  );
};

export default ShortcutButton;
