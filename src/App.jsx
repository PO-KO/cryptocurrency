import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
const Home = React.lazy(() => import("./components/Home"));
const Cryptocurrencies = React.lazy(() =>
  import("./components/Cryptocurrencies")
);
const News = React.lazy(() => import("./components/News"));
const Exchanges = React.lazy(() => import("./components/Exchanges"));

function App() {
  return (
    <Router>
      <div className="flex min-h-screen dark">
        <Navbar />
        <Suspense fallback="">
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
