import CryptoCard from "./CryptoCard";

const TopCurrencies = ({ coins }) => {
  return (
    <section className="w-full lg:w-[67%]">
      <h1 className="sd:text-3xl sm:text-2xl text-xl font-bold mb-5 sd:mb-10 whitespace-nowrap transition-all">
        Top 10 Cryptos in The World
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {coins?.map((coin) => (
          <CryptoCard coin={coin} key={coin.uuid} />
        ))}
      </div>
    </section>
  );
};

export default TopCurrencies;
