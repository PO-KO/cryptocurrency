import React from "react";
import { useSelector } from "react-redux";
import Currencies from "../components/Currencies";
import Loading from "../components/Loading";

const Cryptocurrencies = () => {
  return (
    <div className="bg-secondary-mostlylight w-full px-3 sd:px-7 py-6 min-h-[calc(100vh-84px)]">
      <h1 className="sd:text-3xl sm:text-2xl text-xl font-bold mb-5 sd:mb-10 whitespace-nowrap transition-all">
        Cryptos in The World
      </h1>
      <Currencies />
    </div>
  );
};

export default Cryptocurrencies;
