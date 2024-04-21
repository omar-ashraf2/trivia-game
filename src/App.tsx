import Footer from "./components/Footer";
import WelcomeScreen from "./components/WelcomeScreen";
import { footerItemsWelcomeScreen } from "./constants/footerItems";

function App() {
  return (
    <>
      <main>
        <WelcomeScreen />
      </main>
      <Footer items={footerItemsWelcomeScreen} />
    </>
  );
}

export default App;
