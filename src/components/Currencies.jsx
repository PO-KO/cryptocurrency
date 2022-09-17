import CryptoCard from "./CryptoCard";
import { useDispatch, useSelector } from "react-redux";
import { getGeneralData } from "../store/cryptoApi";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { IoIosClose } from "react-icons/io";

const Currencies = ({ simplified }) => {
  const {
    data: { coins },
  } = useSelector((state) => state.generalData);

  const [cryptos, setCryptos] = useState([]);
  const [value, setValue] = useState("");
  const [searchTerm] = useDebounce(value, 500);

  useEffect(() => {
    if (simplified && coins) {
      setCryptos(coins.slice(0, 10));
    } else if (!simplified && coins) {
      setCryptos(
        coins?.filter((coin) =>
          coin.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [simplified, searchTerm]);

  return (
    <div>
      {!simplified && (
        <div className="mb-3 border flex w-56 bg-secondary-light items-center">
          <input
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search cryptos..."
            type="text"
            value={value}
            className="flex-1 focus:border-b-primary-mostlydark focus:outline-none rounded-sm py-1 px-2 text-sm"
          />
          {value && (
            <IoIosClose
              className="text-2xl text-secondary-dark cursor-pointer"
              onClick={() => setValue("")}
            />
          )}
        </div>
      )}

      <div
        className={`grid grid-cols-1 ${
          !simplified
            ? "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            : "sm:grid-cols-2 lg:grid-cols-3"
        } gap-2 w-full`}
      >
        {cryptos?.map((coin) => (
          <CryptoCard coin={coin} key={coin.uuid} />
        ))}
      </div>
    </div>
  );
};

export default Currencies;
