import { useState } from "react";
import LoginPage from "./components/LoginPage";
import Navbar from "./components/Navbar";
import LiveTicker from "./components/LiveTicker";
import FloatingBackground from "./components/FloatingBackground";
import Dashboard from "./components/Dashboard";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    return <LoginPage onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div className="gradient-bg min-h-screen relative">
      <FloatingBackground />
      <Navbar />
      <LiveTicker />
      <Dashboard />
    </div>
  );
}

export default App;