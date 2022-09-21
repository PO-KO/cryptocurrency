import millify from "millify";
import { HiTrendingUp, HiTrendingDown } from "react-icons/hi";
import { Link } from "react-router-dom";
const CryptoCard = ({ coin }) => {
  return (
    <Link
      to={`/crypto/${coin.uuid}`}
      className="group bg-secondary-light shadow-sm rounded relative overflow-hidden hover:shadow-md transition-all"
    >
      <div className="absolute w-0 rounded-full h-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-50 group-hover:w-full group-hover:h-full group-hover:rounded-none transition-all" />
      <div className="relative">
        <div className="top flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="first-letter:text-lg">
            {coin?.rank}. {coin?.name}
          </h2>
          <img className="w-7 max-w-full" src={coin.iconUrl} alt={coin?.name} />
        </div>
        <div className="bottom space-y-3 p-4">
          <span className="price text-3xl font-semibold">
            {millify(coin?.price, {
              units: ["", "K", "M", "B", "T"],
              decimalSeparator: ",",
            })}
          </span>
          <div className="space-x-4 flex">
            <div className="change w-1/2">
              <span className="text-[10px] font-semibold block text-primary-light">
                Daily Change
              </span>
              <div
                className={` ${
                  coin?.change > 0 ? "text-green-600" : "text-red-600"
                } flex items-center`}
              >
                {parseFloat(coin?.change) > 0 ? (
                  <HiTrendingUp className="text-green-600 text-xl mr-1" />
                ) : (
                  <HiTrendingDown className="text-red-600 text-xl mr-1" />
                )}
                {coin?.change}%
              </div>
            </div>
            <div className="marketCap w-1/2">
              <span className="text-[10px] font-semibold block text-primary-light">
                Market Cap
              </span>
              {millify(coin?.marketCap, {
                decimalSeparator: ",",
              })}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CryptoCard;
