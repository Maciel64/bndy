import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoginScreen from "./components/login-screen";
import WelcomeScreen from "./components/welcome-screen";
import Toast from "./components/toast";

export type Screens = "login" | "welcome";

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screens>("login");
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "error" | "success";
  } | null>(null);

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen("login");
    setToast(null);
  };

  const closeToast = () => {
    setToast(null);
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
      <AnimatePresence mode="wait">
        {currentScreen === "login" && (
          <LoginScreen
            setCurrentScreen={setCurrentScreen}
            setToast={setToast}
            setUser={setUser}
          />
        )}

        {currentScreen === "welcome" && (
          <WelcomeScreen user={user!} onLogout={handleLogout} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <Toast
            key="toast"
            message={toast.message}
            type={toast.type}
            onClose={closeToast}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
