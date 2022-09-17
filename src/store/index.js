import { configureStore } from "@reduxjs/toolkit";
import generalDataReducer from "./cryptoApi";

const store = configureStore({
  reducer: {
    generalData: generalDataReducer,
  },
});

export default store;
