import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { DateTime } from "luxon";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart({ history, name, price, time, timePeriod, setTimePeriod }) {
  const cryptoPrice = [];
  const cryptoTimestamp = [];

  const getRightFormt = (timestamp, timePeriod) => {
    switch (timePeriod) {
      case "3h":
        return DateTime.fromSeconds(+timestamp).toLocaleString(
          DateTime.TIME_WITH_SECONDS
        );
      case "24h":
        return DateTime.fromSeconds(+timestamp).toLocaleString(
          DateTime.TIME_SIMPLE
        );
      case "7d":
        return DateTime.fromSeconds(+timestamp).weekdayLong;
      case "30d":
      case "3m":
        return DateTime.fromSeconds(+timestamp).toLocaleString({
          month: "short",
          day: "numeric",
        });
      case "1y":
        return DateTime.fromSeconds(+timestamp).toLocaleString(
          DateTime.DATE_MED
        );
      case "3y":
      case "5y":
        return DateTime.fromSeconds(+timestamp).toLocaleString({
          year: "numeric",
          month: "short",
        });
      default:
        return null;
    }
  };

  if (history.history) {
    history.history.forEach((item) => {
      cryptoPrice.push(+item.price);
      cryptoTimestamp.push(getRightFormt(item.timestamp, timePeriod));
    });
  }

  const data = {
    labels: cryptoTimestamp.reverse(),
    datasets: [
      {
        label: "Price in USD",
        data: cryptoPrice.reverse(),
        fill: false,
        backgroundColor: "#5B867C",
        borderColor: "#52796F",
        pointRadius: 0,
      },
    ],
  };

  const options = {
    scales: {},
  };

  return (
    <div>
      <div className="chart-heading flex flex-col sm:flex-row items-center justify-between my-5">
        <h3 className="font-bold ml-1 mb-3 sm:mb-0">{name} Chart</h3>
        <div className="flex rounded overflow-hidden w-full sm:w-auto">
          {time.map((period, i) => (
            <span
              key={i}
              className={`py-1 px-2 text-xs bg-primary-light flex-1 text-center ${
                timePeriod === period
                  ? "text-primary-mostlydark"
                  : "text-secondary-light"
              } font-semibold cursor-pointer`}
              onClick={() => setTimePeriod(period)}
            >
              {period}
            </span>
          ))}
        </div>
      </div>
      <Line data={data} options={options} />
    </div>
  );
}

export default LineChart;
