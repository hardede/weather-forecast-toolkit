import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ForecastState } from "../../types/weatherForecast";

const coordinatesApi = "https://api.openweathermap.org/geo/1.0/direct";
const forecastApi = "https://api.openweathermap.org/data/2.5/forecast";

export const fetchForecast = createAsyncThunk(
  "forecast/fetchForecast",
  async (city: string, { rejectWithValue }) => {
    try {
      const coordinates = await axios.get(coordinatesApi, {
        params: {
          q: city,
          limit: 1,
          appid: "3e889d69c5d056ea6b1230f4db90404d",
        },
      });

      const coordinatesData = await coordinates.data;
      const arr: any = [];

      coordinatesData.map((item: any) =>
        arr.push(item.lat.toFixed(0), item.lon.toFixed(0))
      );

      const [lat, lon] = arr;
      const weatherForecast = await axios.get(forecastApi, {
        params: {
          lat: lat,
          lon: lon,
          appid: "3e889d69c5d056ea6b1230f4db90404d",
          units: "metric",
        },
      });
      const weatherForecastData = await weatherForecast.data;
      return weatherForecastData.list;
    } catch (e) {
      return rejectWithValue("not success load forecast");
    }
  }
);

const initialState: ForecastState = {
  forecast: [],
  isLoading: false,
  error: null,
};

export const forecastSlice = createSlice({
  name: "forecast",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchForecast.fulfilled.type]: (state, actions) => {
      state.isLoading = false;
      state.error = "";
      state.forecast = actions.payload;
    },
    [fetchForecast.pending.type]: state => {
      state.isLoading = true;
    },
    [fetchForecast.rejected.type]: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },
  },
});

export default forecastSlice.reducer;
