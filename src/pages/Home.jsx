import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import GlobalStats from "../components/GlobalStats";
import Currencies from "../components/Currencies";
import News from "./News";
import Error from "../components/Error";

const Home = () => {
  return (
    <div className={`min-h-[calc(100vh-84px)]`}>
      <div className="wrapper">
        <div className=" flex px-3 sd:px-7 py-6 flex-wrap justify-between transition-all">
          <GlobalStats />
          <div className="w-full lg:w-[67%]">
            <h1 className="sd:text-3xl sm:text-2xl text-xl font-bold mb-5 sd:mb-10 whitespace-nowrap transition-all">
              Top 10 Cryptos in The World
            </h1>
            <Currencies simplified />
          </div>
        </div>
        <div className="mt-3">
          <h1 className="sd:text-3xl px-3 sd:px-7 sm:text-2xl text-xl font-bold mb-3 sd:mb-6 whitespace-nowrap transition-all">
            Latest News
          </h1>
          <News simplified />
        </div>
      </div>
    </div>
  );
};

export default Home;
