import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCoins } from "../store/statsSlice";
import millify from "millify";
import Loading from "./Loading";

const Home = () => {
  const dispatch = useDispatch();
  const { stats, loading } = useSelector((state) => state.stats);

  useEffect(() => {
    dispatch(getCoins());
  }, []);

  return (
    <main className="bg-secondary-mostlylight w-full min-h-screen">
      {loading && !stats.stats ? (
        <Loading />
      ) : (
        <div className="wrapper px-7 py-6 flex justify-between">
          <section className="md:w-[30%]">
            <h1 className="text-3xl font-bold mb-10">Global crypto stats</h1>
            <div className="stats space-y-6">
              <div className="statsBox ">
                <h3 className="text-sm mb-1 text-primary-light font-semibold">
                  Total Cryptocurrencies
                </h3>
                <span className="text-3xl">
                  {millify(stats?.stats?.total, {
                    units: ["", "K", "M", "B", "T"],
                    decimalSeparator: ",",
                  })}
                </span>
              </div>
              <div className="statsBox ">
                <h3 className="text-sm mb-1 text-primary-light font-semibold">
                  Total Exchanges
                </h3>
                <span className="text-3xl">
                  {millify(stats?.stats?.totalExchanges, {
                    units: ["", "K", "M", "B", "T"],
                    decimalSeparator: ",",
                  })}
                </span>
              </div>
              <div className="statsBox ">
                <h3 className="text-sm mb-1 text-primary-light font-semibold">
                  Total Markets
                </h3>
                <span className="text-3xl">
                  {millify(stats.stats?.totalMarkets, {
                    units: ["", "K", "M", "B", "T"],
                    decimalSeparator: ",",
                  })}
                </span>
              </div>
              <div className="statsBox ">
                <h3 className="text-sm mb-1 text-primary-light font-semibold">
                  Total Market Cap
                </h3>
                <span className="text-3xl">
                  $
                  {millify(stats?.stats?.totalMarketCap, {
                    units: ["", "K", "M", "B", "T"],
                    decimalSeparator: ",",
                  })}
                </span>
              </div>
              <div className="statsBox ">
                <h3 className="text-sm mb-1 text-primary-light font-semibold">
                  Total 24h Volume
                </h3>
                <span className="text-3xl">
                  $
                  {millify(stats?.stats?.total24hVolume, {
                    units: ["", "K", "M", "B", "T"],
                    decimalSeparator: ",",
                  })}
                </span>
              </div>
            </div>
          </section>
          <section className="md:w-[65%]">
            <h1 className="text-3xl font-bold mb-6">
              Top 10 cryptos in the world
            </h1>
          </section>
        </div>
      )}
    </main>
  );
};

export default Home;
