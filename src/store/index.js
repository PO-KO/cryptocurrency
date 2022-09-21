import { configureStore } from "@reduxjs/toolkit";
import cryptoStatsReducer from "./cryptoStatsSlice";
import cryptosReducer from "./cryptosSlice";
import cryptoNewsReducer from "./cryptoNewsSlice";

const store = configureStore({
  reducer: {
    cryptos: cryptosReducer,
    cryptoStats: cryptoStatsReducer,
    cryptoNews: cryptoNewsReducer,
  },
});

export default store;
