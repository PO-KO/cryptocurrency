import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cryptocurrencies from "./components/Cryptocurrencies";
import Exchanges from "./components/Exchanges";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import News from "./components/News";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen dark">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
          <Route path="/exchanges" element={<Exchanges />} />
          <Route path="/news" element={<News />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
