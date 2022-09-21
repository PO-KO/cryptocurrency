import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import getStats from "../store/cryptoStatsSlice";
import { useDispatch, useSelector } from "react-redux";

const CryptoDetails = () => {
  const dispatch = useDispatch();
  const cryptoData = useSelector((state) => state.getGeneralData);
  const { cryptoId } = useParams();

  useEffect(() => {
    dispatch(getGeneralData(`coin/${cryptoId}`));
  }, [cryptoId]);
  console.log(cryptoData);

  return <div>CryptoDetails</div>;
};

export default CryptoDetails;
