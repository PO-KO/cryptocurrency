import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
const Cryptocurrencies = React.lazy(() => import("./pages/Cryptocurrencies"));
const CryptoDetails = React.lazy(() => import("./pages/CryptoDetails"));
const Home = React.lazy(() => import("./pages/Home"));
const Exchanges = React.lazy(() => import("./pages/Exchanges"));
const News = React.lazy(() => import("./pages/News"));

// import Cryptocurrencies from "./pages/Cryptocurrencies";
// import CryptoDetails from "./pages/CryptoDetails";
// import Home from "./pages/Home";
// import Exchanges from "./pages/Exchanges";
// import News from "./pages/News";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen dark">
        <Navbar />
        <div className="main bg-secondary-mostlylight w-full min-h-screen">
          <Routes>
            <Route
              path="/"
              element={
                <Suspense>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/cryptocurrencies"
              element={
                <Suspense>
                  <Cryptocurrencies />
                </Suspense>
              }
            />
            <Route
              path="/crypto/:cryptoId"
              element={
                <Suspense>
                  <CryptoDetails />
                </Suspense>
              }
            />
            <Route
              path="/exchanges"
              element={
                <Suspense>
                  <Exchanges />
                </Suspense>
              }
            />
            <Route
              path="/news"
              element={
                <Suspense>
                  <News />
                </Suspense>
              }
            />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
