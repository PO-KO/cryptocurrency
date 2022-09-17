import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getGeneralData = createAsyncThunk(
  "generalData/getGeneralData",
  (details) => {
    return axios
      .get(`${import.meta.env.VITE_CRYPTO_API_URL}/coins`, {
        headers: {
          "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
          "X-RapidAPI-Host": import.meta.env.VITE_CRYPTO_RAPIDAPI_HOST,
        },
      })
      .then((res) => res.data);
  }
);

const cryptoApi = createSlice({
  name: "generalData",
  initialState: { loading: false, data: [], error: "" },
  extraReducers: (builder) => {
    builder.addCase(getGeneralData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getGeneralData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.error = "";
    });
    builder.addCase(getGeneralData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
  },
});

export default cryptoApi.reducer;
