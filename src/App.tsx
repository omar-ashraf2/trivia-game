import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import { SessionProvider } from "./store/SessionContext";
import HomePage from "./pages/HomePage";
import PickCategory from "./pages/PickCategory";
import GameQuestions from "./pages/GameQuestions";

const App: React.FC = () => {
  return (
    <Router>
      <SessionProvider>
        <Layout />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pick-category" element={<PickCategory />} />
          <Route path="/category/:id" element={<GameQuestions />} />
        </Routes>
      </SessionProvider>
    </Router>
  );
};

export default App;
