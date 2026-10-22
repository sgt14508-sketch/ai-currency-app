import Navbar from "./components/Navbar";
import LiveTicker from "./components/LiveTicker";
import FloatingBackground from "./components/FloatingBackground";
import Dashboard from "./components/Dashboard";

function App() {
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
