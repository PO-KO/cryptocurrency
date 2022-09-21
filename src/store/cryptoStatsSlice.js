import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getStats = createAsyncThunk("stats/getStats", async () => {
  const res = await axios.get(`${import.meta.env.VITE_CRYPTO_API_URL}/stats`, {
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
      "X-RapidAPI-Host": import.meta.env.VITE_CRYPTO_RAPIDAPI_HOST,
    },
  });
  return res.data;
});

const cryptoStatsSlice = createSlice({
  name: "stats",
  initialState: { status: "", data: [], error: "" },
  extraReducers: (builder) => {
    builder.addCase(getStats.pending, (state) => {
      state.status = "loading";
      state.data = [];
      state.error = "";
    });
    builder.addCase(getStats.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload.data;
      state.error = "";
    });
    builder.addCase(getStats.rejected, (state, action) => {
      state.status = "failed";
      state.data = [];
      state.error = action.error.message;
    });
  },
});
export default cryptoStatsSlice.reducer;
