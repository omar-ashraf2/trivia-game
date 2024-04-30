import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import { SessionProvider } from "./store/SessionContext";
import HomePage from "./pages/HomePage";
import PickCategory from "./pages/PickCategory";
import Game from "./pages/Game";

const App: React.FC = () => {
  return (
    <Router>
      <SessionProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="pick-category" element={<PickCategory />} />
            <Route path="category/:id" element={<Game />} />
          </Route>
        </Routes>
      </SessionProvider>
    </Router>
  );
};

export default App;
