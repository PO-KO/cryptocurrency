import { configureStore } from "@reduxjs/toolkit";
import generalDataReducer from "./homeSlice";

const store = configureStore({
  reducer: {
    generalData: generalDataReducer,
  },
});

export default store;
