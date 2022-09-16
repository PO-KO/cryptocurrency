import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGeneralData } from "../store/homeSlice";
import Loading from "../components/Loading";
import GlobalStats from "../components/GlobalStats";
import TopCurrencies from "../components/TopCurrencies";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.generalData);

  useEffect(() => {
    dispatch(getGeneralData());
  }, []);

  return (
    <main className="bg-secondary-mostlylight w-full min-h-screen">
      {loading || data.length === 0 ? (
        <Loading />
      ) : (
        <div className="wrapper px-3 sd:px-7 py-6 flex flex-wrap justify-between transition-all">
          <GlobalStats stats={data.stats} />
          <TopCurrencies coins={data.coins} />
        </div>
      )}
    </main>
  );
};

export default Home;
