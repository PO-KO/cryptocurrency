import React from "react";
import { TailSpin } from "react-loader-spinner";

const Loading = ({ height }) => {
  return (
    <TailSpin
      height="60"
      width="60"
      color="#52796F"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{ height: height }}
      wrapperClass="justify-center items-center"
      visible={true}
    />
  );
};

export default Loading;
