import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGeneralData } from "../store/cryptoApi";
import Loading from "../components/Loading";
import GlobalStats from "../components/GlobalStats";
import Currencies from "../components/Currencies";

const Home = () => {
  const {
    loading,
    data: { stats },
    error,
  } = useSelector((state) => state.generalData);

  return (
    <div className={`min-h-[calc(100vh-84px)]`}>
      {loading || stats === null ? (
        <Loading height={700} />
      ) : (
        <div className="wrapper px-3 sd:px-7 py-6 flex flex-wrap justify-between transition-all">
          <GlobalStats stats={stats} />
          <div className="w-full lg:w-[67%]">
            <h1 className="sd:text-3xl sm:text-2xl text-xl font-bold mb-5 sd:mb-10 whitespace-nowrap transition-all">
              Top 10 Cryptos in The World
            </h1>
            <Currencies simplified />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
