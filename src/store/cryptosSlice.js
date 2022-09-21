import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCryptos = createAsyncThunk(
  "crytpos/getCryptos",
  async (count) => {
    const res = await axios.get(
      `${import.meta.env.VITE_CRYPTO_API_URL}/coins?limit=${count}`,
      {
        headers: {
          "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
          "X-RapidAPI-Host": import.meta.env.VITE_CRYPTO_RAPIDAPI_HOST,
        },
      }
    );
    return res.data;
  }
);

const cryptosSlice = createSlice({
  name: "cryptos",
  initialState: { status: "", data: [], error: "" },
  extraReducers: (builder) => {
    builder.addCase(getCryptos.pending, (state) => {
      state.status = "loading";
      state.data = [];
      state.error = "";
    });
    builder.addCase(getCryptos.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload.data.coins;
      state.error = "";
    });
    builder.addCase(getCryptos.rejected, (state, action) => {
      state.status = "failed";
      state.data = [];
      state.error = action.error.message;
    });
  },
});
export default cryptosSlice.reducer;
