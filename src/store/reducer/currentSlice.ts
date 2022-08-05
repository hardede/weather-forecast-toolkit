import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CurrentState } from "../../types/weatherCurrent";

const coordinatesApi = "https://api.openweathermap.org/geo/1.0/direct";
const currentWeatherApi = "https://api.openweathermap.org/data/2.5/weather";

export const fetchCurrent = createAsyncThunk(
  "forecast/fetchCurrent",
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
      const currentWeather = await axios.get(currentWeatherApi, {
        params: {
          lat: lat,
          lon: lon,
          appid: "3e889d69c5d056ea6b1230f4db90404d",
          units: "metric",
        },
      });
      return currentWeather.data;
    } catch (e) {
      return rejectWithValue("not success load current weather");
    }
  }
);

const initialState: CurrentState = {
  current: {},
  isLoading: false,
  error: null,
};

export const currentSlice = createSlice({
  name: "current",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCurrent.fulfilled.type]: (state, actions) => {
      state.isLoading = false;
      state.error = "";
      state.current = actions.payload;
    },
    [fetchCurrent.pending.type]: state => {
      state.isLoading = true;
    },
    [fetchCurrent.rejected.type]: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },
  },
});

export default currentSlice.reducer;
