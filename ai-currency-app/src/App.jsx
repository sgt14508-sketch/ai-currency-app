import { useState, useEffect } from "react";
import LandingNavbar from "./components/LandingNavbar";
import Hero from "./components/Hero";
import LoginPage from "./components/LoginPage";
import Navbar from "./components/Navbar";
import LiveTicker from "./components/LiveTicker";
import FloatingBackground from "./components/FloatingBackground";
import Dashboard from "./components/Dashboard";

function App() {
  // Start on the landing page by default
  const [view, setView] = useState("landing");

  // Check if user is already logged in when the app loads
  useEffect(() => {
    const currentUser = localStorage.getItem("current_user");
    if (currentUser) {
      setView("dashboard");
    }
  }, []);

  const handleEnterApp = () => {
    setView("login");
  };

  const handleLogin = () => {
    setView("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("current_user");
    setView("landing"); // Send them back to the landing page when they log out
  };

  // 1. LANDING PAGE VIEW
  if (view === "landing") {
    return (
      <div className="relative min-h-screen bg-[#050914]">
        <LandingNavbar onEnterApp={handleEnterApp} />
        <Hero onEnterApp={handleEnterApp} />
      </div>
    );
  }

  // 2. LOGIN PAGE VIEW
  if (view === "login") {
    return (
      <div className="relative min-h-screen bg-[#050914]">
        <LandingNavbar onEnterApp={handleEnterApp} />
        {/* Added padding-top so the login card doesn't overlap the navbar */}
        <div className="pt-24 pb-12">
          <LoginPage onLogin={handleLogin} />
        </div>
      </div>
    );
  }

  // 3. DASHBOARD VIEW
  return (
    <div className="gradient-bg min-h-screen relative">
      <FloatingBackground />
      <Navbar onLogout={handleLogout} />
      <LiveTicker />
      <Dashboard />
    </div>
  );
}

export default App;