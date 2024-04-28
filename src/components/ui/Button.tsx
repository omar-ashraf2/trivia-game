import { ButtonHTMLAttributes, FC } from "react";
import styled from "styled-components";

// Styled component
const ButtonStyles = styled.button<ButtonProps>`
  background-color: #b6b6b6;
  color: #000;
  border: solid 1px #000;
  border-radius: 4px;
  font-size: 25px;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  padding: ${({ padding }) => padding ?? "5px"};
  width: ${({ width }) => width ?? "auto"};
  height: ${({ height }) => height ?? "auto"};
  text-align: center;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #b6b6b692;
  }

  &:active {
    transform: translateY(3px);
  }
`;

// ButtonProps interface extending standard button attributes
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  padding?: string;
  width?: string;
  height?: string;
}

// Button component
const Button: FC<ButtonProps> = ({
  children,
  padding,
  width,
  height,
  onClick,
  ...props
}) => {
  return (
    <ButtonStyles
      onClick={onClick}
      padding={padding}
      width={width}
      height={height}
      {...props}
    >
      {children}
    </ButtonStyles>
  );
};

export default Button;
export { Button };

