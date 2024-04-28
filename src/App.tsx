import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import { footerItemsWelcomeScreen } from "./constants/footerItems";
import { useSession } from "./store/SessionContext";

function App() {
  const { sessionToken } = useSession();

  if (!sessionToken) {
    console.log("No session token available.");
  }
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
