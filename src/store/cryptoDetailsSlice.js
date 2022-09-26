import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCryptoDetails = createAsyncThunk(
  "cryptoDetails/getCryptoDetails",
  async (cryptoId) => {
    const res = await axios.get(
      `${import.meta.env.VITE_CRYPTO_API_URL}/coin/${cryptoId}`,
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

export const getCryptoHistory = createAsyncThunk(
  "cryptoDetails/getCryptoHistory",
  async ({ cryptoId, timePeriod }) => {
    const res = await axios.get(
      `${
        import.meta.env.VITE_CRYPTO_API_URL
      }/coin/${cryptoId}/history?timePeriod=${timePeriod}`,
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

export const cryptoDetailsSlice = createSlice({
  name: "cryptoDetails",
  initialState: { status: "", data: [], history: [], error: "" },

  // getCryptoDetails

  extraReducers: (builder) => {
    builder.addCase(getCryptoDetails.pending, (state) => {
      state.status = "loading";
      state.data = [];
      state.error = "";
    });
    builder.addCase(getCryptoDetails.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload.data.coin;
      state.error = "";
    });
    builder.addCase(getCryptoDetails.rejected, (state, action) => {
      state.status = "failed";
      state.data = [];
      state.error = action.error.message;
    });

    // getCryptoHistory

    builder.addCase(getCryptoHistory.pending, (state) => {
      state.status = "loading";
      state.history = [];
      state.error = "";
    });
    builder.addCase(getCryptoHistory.fulfilled, (state, action) => {
      state.status = "success";
      state.history = action.payload.data;
      state.error = "";
    });
    builder.addCase(getCryptoHistory.rejected, (state, action) => {
      state.status = "failed";
      state.history = [];
      state.error = action.error.message;
    });
  },
});
export default cryptoDetailsSlice.reducer;
