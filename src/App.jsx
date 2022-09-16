import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
const Home = React.lazy(() => import("./pages/Home"));
const Cryptocurrencies = React.lazy(() => import("./pages/Cryptocurrencies"));
const News = React.lazy(() => import("./pages/News"));
const Exchanges = React.lazy(() => import("./pages/Exchanges"));

function App() {
  return (
    <Router>
      <div className="flex min-h-screen dark">
        <Navbar />
        <Suspense>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
            <Route path="/exchanges" element={<Exchanges />} />
            <Route path="/news" element={<News />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
