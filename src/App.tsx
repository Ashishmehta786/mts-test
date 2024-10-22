import "./App.css";
import LoginPage from "./components/Login";
import { ModeToggle } from "./components/mode-toggle";
import Dashboard from "./Dashboard";
import { useAuth } from "./context/AuthContext";
import Navbar from "./Navbar";
import Test from "./test";
function App() {
  const ath = useAuth();

  return (
    <div className="w-full">
      <div className="flex flex-col min-h-screen w-[100%]">
      {ath?.isLoggedIn ? <Dashboard /> : <LoginPage />}
      </div>
    </div>
  );
}

export default App;
