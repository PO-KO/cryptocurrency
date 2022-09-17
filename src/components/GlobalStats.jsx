import React from "react";
import millify from "millify";

const GlobalStats = ({ stats }) => {
  return (
    <section className="w-full mb-7 lg:mb-0 lg:w-[33%] lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">
      <h1 className="sd:text-3xl sm:text-2xl text-xl font-bold mb-5 sd:mb-10 whitespace-nowrap transition-all">
        Global Crypto Stats
      </h1>
      <div className="stats grid grid-cols-2 lg:grid-cols-1 gap-6">
        <div className="statsBox">
          <h3 className="text-xs sm:text-sm mb-1 text-primary-light font-semibold whitespace-nowrap">
            Total Cryptocurrencies
          </h3>
          <span className="text-2xl sm:text-3xl transition-all">
            {stats?.total}
          </span>
        </div>
        <div className="statsBox">
          <h3 className="text-xs sm:text-sm mb-1 text-primary-light font-semibold whitespace-nowrap">
            Total Exchanges
          </h3>
          <span className="text-2xl sm:text-3xl transition-all">
            {millify(stats?.totalExchanges)}
          </span>
        </div>
        <div className="statsBox">
          <h3 className="text-xs sm:text-sm mb-1 text-primary-light font-semibold whitespace-nowrap">
            Total Markets
          </h3>
          <span className="text-2xl sm:text-3xl transition-all">
            {millify(stats?.totalMarkets)}
          </span>
        </div>
        <div className="statsBox">
          <h3 className="text-xs sm:text-sm mb-1 text-primary-light font-semibold whitespace-nowrap">
            Total Market Cap
          </h3>
          <span className="text-2xl sm:text-3xl transition-all">
            ${millify(stats?.totalMarketCap)}
          </span>
        </div>
        <div className="statsBox">
          <h3 className="text-xs sm:text-sm mb-1 text-primary-light font-semibold whitespace-nowrap">
            Total 24h Volume
          </h3>
          <span className="text-2xl sm:text-3xl transition-all">
            ${millify(stats?.total24hVolume)}
          </span>
        </div>
      </div>
    </section>
  );
};

export default GlobalStats;
