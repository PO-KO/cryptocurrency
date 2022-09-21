import React from "react";
import { BsWifiOff } from "react-icons/bs";

const Error = () => {
  return (
    <div className="h-[calc(100vh-84px)] flex flex-col justify-center items-center">
      <div className="wrapper">
        <h1 className="text-4xl font-semibold text-secondary-dark mb-4">
          Hmm. Something went wrong!
        </h1>
        <div>
          <h4 className="mb-3">We can't connect to the server. you can:</h4>
          <ul className="list-disc pl-7">
            <li>Try again later</li>
            <li>Check your network connection</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Error;
