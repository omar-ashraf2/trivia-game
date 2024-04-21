import { FC } from "react";
import styled from "styled-components";
import ShortcutButton from "./ui/ShortcutButton";
import MoveAroundShortcut from "./ui/MoveAroundShortcut";

const FooterContainer = styled.footer`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  gap: 30px;
  align-items: center;
  padding: 10px 30px;
  color: #000;
  text-align: left;
  font-size: 25px;
`;

const MoveAroundShortcutContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

interface FooterProps {
  items: string[];
}

const Footer: FC<FooterProps> = ({ items }) => {
  return (
    <FooterContainer>
      <MoveAroundShortcutContainer>
        <MoveAroundShortcut />
        move around
      </MoveAroundShortcutContainer>
      {items.map((item) => (
        <ShortcutButton key={item} label={item} />
      ))}
    </FooterContainer>
  );
};

export default Footer;
