import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import { footerItemsWelcomeScreen } from "./constants/footerItems";

function App() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <Footer items={footerItemsWelcomeScreen} />
    </>
  );
}

export default App;
