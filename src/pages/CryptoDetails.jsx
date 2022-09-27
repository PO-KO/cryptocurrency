import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCryptoDetails,
  getCryptoHistory,
} from "../store/cryptoDetailsSlice";
import Loading from "../components/Loading";
import uuid from "react-uuid";
import parse from "html-react-parser";
import { AiOutlineNumber } from "react-icons/ai";
import { BiLink } from "react-icons/bi";
import millify from "millify";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import { RiArrowDropLeftLine, RiArrowDropRightLine } from "react-icons/ri";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import LineChart from "../components/LineChart";

const CryptoDetails = () => {
  const dispatch = useDispatch();
  const { status, data, history, error } = useSelector(
    (state) => state.cryptoDetails
  );
  const [scrollVal, setScrollVal] = useState(0);
  const [isHidden, setIsHidden] = useState(true);
  const [timePeriod, setTimePeriod] = useState("24h");

  const { cryptoId } = useParams();
  const linksRef = useRef(null);
  useEffect(() => {
    dispatch(getCryptoDetails(cryptoId));
  }, [cryptoId, dispatch]);

  useEffect(() => {
    dispatch(getCryptoHistory({ cryptoId, timePeriod }));
  }, [dispatch, cryptoId, timePeriod]);

  const time = ["3h", "24h", "7d", "30d", "3m", "1y", "3y", "5y"];

  const getPercentage = (value, total) =>
    parseInt((parseFloat(value) / parseFloat(total)) * 100);

  let totalWidth = useMemo(() => {
    let result = 0;
    if (!linksRef.current) return;
    [...linksRef.current.children].forEach((link) => {
      result += link.getBoundingClientRect().width;
    });
    return result + (linksRef.current.children.length - 1) * 8;
  }, [linksRef.current]);

  const handleScrollRight = () => {
    if (
      scrollVal <
      totalWidth - linksRef.current.getBoundingClientRect().width
    ) {
      setScrollVal(
        (prev) =>
          prev +
          (totalWidth / linksRef.current.getBoundingClientRect().width) * 8
      );
    }
  };

  const handleScrollLeft = () => {
    if (scrollVal > 0) {
      setScrollVal(
        (prev) =>
          prev -
          (totalWidth / linksRef.current.getBoundingClientRect().width) * 8
      );
    }
  };

  const getChangePrice = (price, changeParcent) => {
    return ((parseFloat(price) * parseFloat(changeParcent)) / 100).toFixed(2);
  };

  return (
    <div className="min-h-[calc(100vh-84px)]">
      {status === "loading" ? (
        <Loading height={700} />
      ) : status === "success" ? (
        <div className="wrapper px-3 sd:px-7 py-6 flex flex-wrap gap-y-10 test">
          <div className="w-full lg:w-1/3 pt-8">
            <div className="flex items-center space-x-4 mb-3.5">
              <img className="w-9" src={data?.iconUrl} alt={data?.name} />
              <h1 className="text-4xl font-bold ">{data?.name}</h1>
              <span className="px-2 py-[2px] text-xs rounded-[4px] font-bold text-slate-500 bg-gray-200">
                {data?.symbol}
              </span>
            </div>
            <span className="flex items-center text-[10px] bg-primary-light rounded-[4px] font-bold w-fit px-1 py-[3px] text-secondary-light">
              <AiOutlineNumber className="mr-1" />
              Rank {data?.rank}
            </span>
            <div className="links w-full md:w-64 mt-3.5 relative">
              {scrollVal > 0 && (
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-light rounded-full bg-primary-light cursor-pointer z-10"
                  onMouseDown={handleScrollLeft}
                >
                  <RiArrowDropLeftLine />
                </span>
              )}
              <div className="w-[calc(100%-1rem)] mx-auto overflow-hidden">
                <ul
                  className="flex space-x-2 items-center transition-transform relative duration-500"
                  style={{ transform: `translateX(-${scrollVal}px)` }}
                  ref={linksRef}
                >
                  {data?.links?.map((link) => (
                    <li key={uuid()}>
                      <a
                        href={link.url}
                        target="_blank"
                        className="text-xs bg-gray-100 hover:bg-gray-200 transition rounded-full py-1 px-2 border flex items-center whitespace-nowrap"
                      >
                        <BiLink className="mr-1" />
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <span
                className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-light rounded-full bg-primary-light cursor-pointer z-10"
                onMouseDown={handleScrollRight}
              >
                <RiArrowDropRightLine />
              </span>
            </div>
          </div>
          <div className="w-full lg:w-4/6">
            <div>
              <h4 className="text-sm text-primary-light font-semibold mb-2 flex items-center">
                {data?.name} Price
              </h4>
              <div className="flex space-x-3 items-center pb-6 border-b border-gray-100 mb-6">
                <h1 className="text-4xl font-bold">
                  {parseFloat(data?.price).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </h1>
                <span
                  className={` text-lg ${
                    data?.change > 0 ? "text-green-600" : "text-red-600"
                  } flex items-center `}
                >
                  {parseFloat(data?.change) > 0 ? (
                    <HiTrendingUp className="text-green-600 text-xl mr-1" />
                  ) : (
                    <HiTrendingDown className="text-red-600 text-xl mr-1" />
                  )}
                  {data?.change}%
                </span>
              </div>
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/3 md:border-r mb-7 md:mb-0">
                  <div className="mb-7 ">
                    <h4 className="text-xs text-primary-light font-semibold flex items-centers">
                      Market Cap
                    </h4>
                    <span className="text-sm font-bold">
                      $
                      {millify(data?.marketCap, {
                        precision: 3,
                      })}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs text-primary-light font-semibold flex items-centers ">
                      Fully Diluted Market Cap
                    </h4>
                    <span className="text-sm font-bold">
                      $
                      {millify(data?.fullyDilutedMarketCap, {
                        precision: 3,
                      })}
                    </span>
                  </div>
                </div>
                <div className="w-full md:w-1/3 md:border-r md:pl-5">
                  <div className="mb-7 ">
                    <h4 className="text-xs text-primary-light font-semibold flex items-centers">
                      Volume{" "}
                      <span className="flex ml-1 px-1 rounded-[4px] font-bold text-secondary-light bg-primary-light">
                        24h
                      </span>
                    </h4>
                    <span className="text-sm font-bold">
                      $
                      {millify(data["24hVolume"], {
                        precision: 3,
                      })}
                    </span>
                  </div>
                </div>
                <div className="w-full md:w-1/3 md:pl-5">
                  <div className="mb-7 ">
                    <h4 className="text-xs text-primary-light font-semibold flex items-centers">
                      Circulating Supply
                    </h4>
                    <div className="text-sm font-bold flex items-center mb-3">
                      {`${parseFloat(data?.supply?.circulating).toLocaleString(
                        "en-US"
                      )}`}
                      <span className="text-xs ml-1">{data?.symbol}</span>
                      {data?.supply?.max && (
                        <span className="ml-auto text-primary-light">
                          {getPercentage(
                            data?.supply?.circulating,
                            data?.supply?.max
                          )}
                          %
                        </span>
                      )}
                    </div>
                    {data?.supply?.max && (
                      <div className="w-full bg-gray-200 h-[6px] rounded-full overflow-hidden">
                        <span
                          style={{
                            width: `${getPercentage(
                              data.supply.circulating,
                              data.supply.max
                            )}%`,
                          }}
                          className="transition h-full bg-primary-dark block"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex items justify-between mb-[2px]">
                    <h4 className="text-xs text-primary-light font-semibold flex items-centers">
                      Max Supply
                    </h4>
                    <span className="text-sm font-bold">
                      {!data?.supply?.max
                        ? "--"
                        : parseFloat(data?.supply?.max).toLocaleString("en-US")}
                    </span>
                  </div>
                  <div className="flex items justify-between">
                    <h4 className="text-xs text-primary-light font-semibold flex items-centers">
                      Total Supply
                    </h4>
                    <span className="text-sm font-bold">
                      {`${parseFloat(data?.supply?.total).toLocaleString(
                        "en-US"
                      )}`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-4/6 lg:w-3/4 w-full">
            <div
              className="decription overflow-hidden shadow-hide relative"
              style={{ height: isHidden ? "112px" : "auto" }}
            >
              <h1 className="text-[26px] font-bold">What is {data?.name}</h1>
              {parse(data?.description || "")}
              {isHidden && (
                <div className="shadow-hide absolute bottom-0 left-0 right-0 h-[68px]" />
              )}
            </div>
            <span
              className="ml-auto w-fit text-sm text-primary-dark cursor-pointer flex items-center"
              onClick={() => setIsHidden(!isHidden)}
            >
              {isHidden ? (
                <>
                  Read more <IoIosArrowDown className="ml-2" />
                </>
              ) : (
                <>
                  Read less <IoIosArrowUp className="ml-2" />
                </>
              )}
            </span>
            <LineChart
              history={history}
              name={data?.name}
              price={data?.price}
              time={time}
              setTimePeriod={setTimePeriod}
              timePeriod={timePeriod}
            />
          </div>
          <div className="lg:w-1/4 md:w-1/3 md:pl-10 w-full">
            <div className="p-3 bg-secondary-light shadow-main rounded-lg">
              <h3 className="text-lg font-bold pb-8 border-b border-gray-100">
                {data?.symbol} Stats
              </h3>
              <div>
                <div className="flex items-center py-4 border-b border-gray-100">
                  <h4 className="flex-1 text-sm text-primary-light font-semibold">
                    {data?.name} Price
                  </h4>
                  <span className="text-sm font-bold">
                    {parseFloat(data?.price).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex items-center py-4 border-b border-gray-100">
                  <h4 className="flex flex-1 text-sm text-primary-light font-semibold items-center">
                    BTC Price
                  </h4>
                  <span className="text-sm font-bold">
                    {parseFloat(data?.btcPrice).toFixed(3)}
                  </span>
                </div>
                <div className="flex items-center py-4 border-b border-gray-100">
                  <h4 className="flex flex-1 text-sm text-primary-light font-semibold items-center">
                    Price Change{" "}
                    <span className="ml-1 px-1 rounded-[4px] font-bold text-secondary-light bg-primary-light text-xs">
                      24h
                    </span>
                  </h4>
                  <div className="text-sm font-bold text-center space-y-1">
                    <span>${getChangePrice(data?.price, data?.change)}</span>
                    <span
                      className={`${
                        data?.change > 0 ? "text-green-600" : "text-red-600"
                      } flex items-center `}
                    >
                      {parseFloat(data?.change) > 0 ? (
                        <HiTrendingUp className="text-green-600 text-xl mr-1" />
                      ) : (
                        <HiTrendingDown className="text-red-600 text-xl mr-1" />
                      )}
                      {data?.change}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center py-4 border-b border-gray-100">
                  <h4 className="flex flex-1 text-sm text-primary-light font-semibold items-center">
                    Market Cap
                  </h4>
                  <span className="text-sm font-bold ">
                    $
                    {millify(data?.marketCap, {
                      precision: 3,
                    })}
                  </span>
                </div>
                <div className="flex items-center py-4 border-b border-gray-100">
                  <h4 className="flex flex-1 text-sm text-primary-light font-semibold items-center">
                    Fully Diluted Market Cap
                  </h4>
                  <span className="text-sm font-bold">
                    $
                    {millify(data?.fullyDilutedMarketCap, {
                      precision: 3,
                    })}
                  </span>{" "}
                </div>
                <div className="flex items-center py-4 border-b border-gray-100">
                  <h4 className="flex flex-1 text-sm text-primary-light font-semibold items-center">
                    Trading Volume
                    <span className="ml-1 px-1 rounded-[4px] font-bold text-secondary-light bg-primary-light text-xs">
                      24h
                    </span>
                  </h4>
                  <span className="text-sm font-bold ">
                    $
                    {millify(data["24hVolume"], {
                      precision: 3,
                    })}
                  </span>
                </div>
                <div className="flex items-center py-4 border-b border-gray-100">
                  <h4 className="flex flex-1 text-sm text-primary-light font-semibold items-center">
                    Number Of Markets
                  </h4>
                  <span className="text-sm font-bold ">
                    {data?.numberOfMarkets}
                  </span>
                </div>
                <div className="flex items-center py-4 border-b border-gray-100">
                  <h4 className="flex flex-1 text-sm text-primary-light font-semibold items-center">
                    Number Of Exchanges
                  </h4>
                  <span className="text-sm font-bold ">
                    {data?.numberOfExchanges}
                  </span>
                </div>
                <div className="flex items-center py-4">
                  <h4 className="flex flex-1 text-sm text-primary-light font-semibold items-center">
                    Market Rank
                  </h4>
                  <span className="text-sm font-bold">#{data?.rank}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : status === "failed" ? (
        <div>Something went wrong</div>
      ) : null}
    </div>
  );
};

export default CryptoDetails;
