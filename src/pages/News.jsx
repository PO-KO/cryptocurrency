import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCryptoNews } from "../store/cryptoNewsSlice";
import Loading from "../components/Loading";
import NewsCard from "../components/NewsCard";
import { useState } from "react";
import uuid from "react-uuid";
import { getCryptos } from "../store/cryptosSlice";

const News = ({ simplified }) => {
  const dispatch = useDispatch();
  const { cryptoNews, cryptos } = useSelector((state) => state);
  const [category, setCategory] = useState("crytpos");
  useEffect(() => {
    dispatch(getCryptoNews({ count: simplified ? 6 : 50, category }));
  }, [simplified, category, dispatch]);

  useEffect(() => {
    if (simplified) return;
    dispatch(getCryptos(100));
  }, [dispatch, simplified]);
  return (
    <div className="bg-secondary-mostlylight w-full min-h-[calc(100vh-84px)] px-3 sd:px-7 py-6">
      {cryptoNews?.status === "loading" ? (
        <Loading height={700} />
      ) : cryptoNews?.status === "success" ? (
        <div className="wrapper">
          {!simplified && (
            <select
              name="cryptos"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="px-1 py-1 bg-secondary-light border rounded mb-3 text-sm w-36"
              placeholder="Pick a category"
            >
              <option value="cryptos">All cryptos</option>
              {cryptos?.data?.map((coin) => (
                <option
                  value={`${coin?.name.toLowerCase()} crypto`}
                  key={coin?.uuid}
                >
                  {coin.name}
                </option>
              ))}
            </select>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  transition-all gap-2">
            {cryptoNews?.data?.map((item) => (
              <NewsCard item={item} key={uuid()} />
            ))}
          </div>
        </div>
      ) : cryptoNews?.status === "failed" ? (
        <div>Something went wrong!</div>
      ) : null}
    </div>
  );
};

export default News;
