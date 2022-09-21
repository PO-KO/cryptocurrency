import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCryptoDetails } from "../store/cryptoDetailsSlice";
import Loading from "../components/Loading";
import parse from "html-react-parser";
import {
  AiOutlineDollarCircle,
  AiOutlineNumber,
  AiOutlineThunderbolt,
  AiOutlineTrophy,
  AiOutlineFund,
  AiOutlineMoneyCollect,
  AiOutlineCheck,
  AiOutlineStop,
  AiOutlineExclamationCircle,
} from "react-icons/ai";
import millify from "millify";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";

const CryptoDetails = () => {
  const dispatch = useDispatch();
  const { status, data, error } = useSelector((state) => state.cryptoDetails);

  const { cryptoId } = useParams();

  const percentage = (value, total) =>
    parseInt((parseFloat(value) / parseFloat(total)) * 100);

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  useEffect(() => {
    dispatch(getCryptoDetails(cryptoId));
  }, [cryptoId, dispatch]);

  return (
    <div className="min-h-[calc(100vh-84px)]">
      {status === "loading" ? (
        <Loading height={700} />
      ) : status === "success" ? (
        <div className="wrapper px-3 sd:px-7 py-6 flex">
          <div className="w-1/2 pt-8">
            <div className="flex items-center space-x-4 mb-5">
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
            <div className="links"></div>
          </div>
          <div className="w-full">
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
              <div className="flex">
                <div className="w-1/3 border-r">
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
                <div className="w-1/3 border-r pl-5">
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
                <div className="w-1/3 px-5">
                  <div className="mb-7 ">
                    <h4 className="text-xs text-primary-light font-semibold flex items-centers">
                      Circulating Supply
                    </h4>
                    <div className="text-sm font-bold flex items-center mb-3">
                      {`${parseFloat(data?.supply?.circulating).toLocaleString(
                        "en-US"
                      )}`}
                      <span className="text-xs ml-1">{data?.symbol}</span>
                      {data.supply.max && (
                        <span className="ml-auto text-primary-light">
                          {percentage(data.supply.circulating, data.supply.max)}
                          %
                        </span>
                      )}
                    </div>
                    {data.supply.max && (
                      <div className="w-full bg-gray-200 h-[6px] rounded-full overflow-hidden">
                        <span
                          style={{
                            width: `${percentage(
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
        </div>
      ) : status === "failed" ? (
        <div>Something went wrong</div>
      ) : null}
    </div>
  );
};

export default CryptoDetails;
