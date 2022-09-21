import { configureStore } from "@reduxjs/toolkit";
import cryptoStatsReducer from "./cryptoStatsSlice";
import cryptosReducer from "./cryptosSlice";
import cryptoNewsReducer from "./cryptoNewsSlice";
import cryptoDetailsReducer from "./cryptoDetailsSlice";
const store = configureStore({
  reducer: {
    cryptos: cryptosReducer,
    cryptoStats: cryptoStatsReducer,
    cryptoNews: cryptoNewsReducer,
    cryptoDetails: cryptoDetailsReducer,
  },
});

export default store;
