import { FC, createContext, useState } from "react";
import Toaster from "../components/ui/Toaster";

type ToastProps = {
  children: React.ReactNode;
};

export const ToastContext = createContext(
  {} as {
    showToast: (message: string) => void;
    hideToast: () => void;
  }
);

export const ToastProvider: FC<ToastProps> = ({ children }) => {
  const [toast, setToast] = useState({ show: false, message: "" });

  const showToast = (message: string) => {
    setToast({ show: true, message });
  };

  const hideToast = () => {
    setToast({ show: false, message: "" });
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {toast.show && <Toaster message={toast.message} />}
    </ToastContext.Provider>
  );
};
