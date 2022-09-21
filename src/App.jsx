import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Cryptocurrencies from "./pages/Cryptocurrencies";
import CryptoDetails from "./pages/CryptoDetails";
import Home from "./pages/Home";
import Exchanges from "./pages/Exchanges";
import News from "./pages/News";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen dark">
        <Navbar />
        <div className="main bg-secondary-mostlylight w-full min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
            <Route path="/crypto/:cryptoId" element={<CryptoDetails />} />
            <Route path="/exchanges" element={<Exchanges />} />
            <Route path="/news" element={<News />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
