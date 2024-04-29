import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Footer from "./components/Footer";
import Button from "./components/ui/Button";
import { footerItemsWelcomeScreen } from "./constants/footerItems";
import { useSession } from "./store/useSession";

const SessionModal = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
const ButtonsModal = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const Layout = () => {
  const { sessionToken, resetSession } = useSession();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(true);

  const handleContinue = () => {
    navigate("/pick-category");
    setShowModal(false);
  };

  const handleReset = () => {
    resetSession();
    navigate("/");
    setShowModal(false);
  };

  return (
    <div>
      {sessionToken && showModal ? (
        <SessionModal>
          <h2>
            Welcome back! Do you want to continue with your existing session or
            start over?
          </h2>

          <ButtonsModal>
            <Button onClick={handleContinue}>Continue Session</Button>
            <Button onClick={handleReset}>Start Over</Button>
          </ButtonsModal>
        </SessionModal>
      ) : (
        <>
          <Outlet />
          <Footer items={footerItemsWelcomeScreen} />
        </>
      )}
    </div>
  );
};

export default Layout;
