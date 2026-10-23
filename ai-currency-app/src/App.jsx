import { useState, useEffect } from "react";
import LoginPage from "./components/LoginPage";
import Navbar from "./components/Navbar";
import LiveTicker from "./components/LiveTicker";
import FloatingBackground from "./components/FloatingBackground";
import Dashboard from "./components/Dashboard";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  // Check if user is already logged in when the app loads
  useEffect(() => {
    const currentUser = localStorage.getItem("current_user");
    if (currentUser) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("current_user");
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="gradient-bg min-h-screen relative">
      <FloatingBackground />
      {/* We pass handleLogout to Navbar so we can add a logout button later */}
      <Navbar onLogout={handleLogout} />
      <LiveTicker />
      <Dashboard />
    </div>
  );
}

export default App;