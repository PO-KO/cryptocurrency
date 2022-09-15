import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCoins = createAsyncThunk("stats/getCoins", () => {
  return axios
    .get("https://coinranking1.p.rapidapi.com/coins?limit=10", {
      headers: {
        "X-RapidAPI-Key": "0f4f6068b9msh9bddbc864d82bc0p131a30jsn94a768c23ff1",
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
      },
    })
    .then((res) => res.data);
});

const statsSlice = createSlice({
  name: "stats",
  initialState: { loading: false, stats: [], error: "" },
  extraReducers: (builder) => {
    builder.addCase(getCoins.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCoins.fulfilled, (state, action) => {
      state.loading = false;
      state.stats = action.payload.data;
      state.error = "";
    });
    builder.addCase(getCoins.rejected, (state, action) => {
      state.loading = false;
      state.stats = [];
      state.error = action.error.message;
    });
  },
});

export default statsSlice.reducer;
