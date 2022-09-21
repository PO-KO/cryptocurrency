import CryptoCard from "./CryptoCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { getCryptos } from "../store/cryptosSlice";
import Loading from "./Loading";
import { useCallback } from "react";

const Currencies = ({ simplified }) => {
  const dispatch = useDispatch();
  const { status, data, error } = useSelector((state) => state.cryptos);
  const [searchTerm, setSearchTerm] = useState("");
  const [count, setCount] = useState(simplified ? 10 : 100);

  useEffect(() => {
    dispatch(getCryptos(count));
  }, [count, dispatch]);

  const fliterdCrypto = useCallback(
    (data = [], searchTerm) => {
      return data?.filter((coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    },
    [searchTerm]
  );

  return status === "loading" ? (
    <Loading height={500} />
  ) : status === "success" ? (
    <div>
      {!simplified && (
        <div className="mb-3 border flex w-56 bg-secondary-light items-center">
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search cryptos..."
            value={searchTerm}
            type="text"
            className="flex-1 focus:border-b-primary-mostlydark focus:outline-none rounded-sm py-1 px-2 text-sm"
          />
          {searchTerm && (
            <IoIosClose
              className="text-2xl text-secondary-dark cursor-pointer"
              onClick={() => setSearchTerm("")}
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
        {fliterdCrypto(data, searchTerm)?.map((coin) => (
          <CryptoCard coin={coin} key={coin?.uuid} />
        ))}
      </div>
    </div>
  ) : status === "failed" ? (
    <div>Something went wrong!</div>
  ) : null;
};

export default Currencies;
