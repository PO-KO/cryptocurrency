import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCryptoNews = createAsyncThunk(
  "cryptoNews/getCryptoNews",
  ({ category, count }) => {
    return axios
      .get(`${import.meta.env.VITE_NEWS_API_URL}/news/search`, {
        headers: {
          "X-BingApis-SDK": "true",
          "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
          "X-RapidAPI-Host": import.meta.env.VITE_NEWS_RAPIDAPI_HOST,
        },
        params: {
          q: category,
          safeSearch: "Off",
          textFormat: "Raw",
          freshness: "Day",
          count: count,
        },
      })
      .then((res) => res.data);
  }
);

const cryptoNewsSlice = createSlice({
  name: "cryptoNews",
  initialState: { status: "", data: [], error: "" },
  extraReducers: (builder) => {
    builder.addCase(getCryptoNews.pending, (state) => {
      state.status = "loading";
      state.data = [];
      state.error = "";
    });
    builder.addCase(getCryptoNews.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload.value;
      state.error = "";
    });
    builder.addCase(getCryptoNews.rejected, (state, action) => {
      state.status = "failed";
      state.data = [];
      state.error = action.error.message;
    });
  },
});

export default cryptoNewsSlice.reducer;
