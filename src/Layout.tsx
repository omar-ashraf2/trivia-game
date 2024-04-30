import { useState, useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "./components/ui/Button";
import { SessionContext } from "./store/SessionContext";
import { footerItemsWelcomeScreen } from "./constants/footerItems";
import Footer from "./components/Footer";

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
  const { sessionToken, resetSession } = useContext(SessionContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const sessionStartTime = localStorage.getItem("sessionStartTime");
    if (
      sessionToken &&
      sessionStartTime &&
      new Date().getTime() - parseInt(sessionStartTime) <= 21600000
    ) {
      setShowModal(true);
    }
  }, [sessionToken]);

  const handleContinue = () => {
    navigate("/pick-category");
    setShowModal(false);
  };

  const handleReset = () => {
    resetSession();
    setShowModal(false);
  };

  return (
    <>
      {showModal ? (
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
    </>
  );
};

export default Layout;
