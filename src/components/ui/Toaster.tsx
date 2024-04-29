import { FC, useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1050;
`;

const Toast = styled.div`
  min-width: 300px;
  border: none;
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  animation: slideIn 0.5s ease-out;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const ToastBody = styled.p`
  font-size: 16px;
  color: #333;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #666;
  font-size: 24px;
  cursor: pointer;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #333;
  }
`;

type ToastProps = {
  message: string;
  onClose?: () => void;
  duration?: number;
};
const Toaster: FC<ToastProps> = ({ message, onClose, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    if (onClose) {
      setTimeout(onClose, 300);
    }
  }, [onClose]);

  useEffect(() => {
    const timer = setTimeout(handleClose, duration);
    return () => clearTimeout(timer);
  }, [handleClose, duration]);

  if (!isVisible) return null;

  return (
    <ToastContainer aria-live="polite" aria-atomic="true">
      <Toast>
        <ToastBody>{message}</ToastBody>
        <CloseButton onClick={handleClose} aria-label="Close">
          ×
        </CloseButton>
      </Toast>
    </ToastContainer>
  );
};

export default Toaster;
