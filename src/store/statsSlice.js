import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCoins = createAsyncThunk("stats/getCoins", () => {
  return axios
    .get(`${import.meta.env.VITE_CRYPTO_API_URL}/coins?limit=10`, {
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
        "X-RapidAPI-Host": import.meta.env.VITE_CRYPTO_RAPIDAPI_HOST,
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
