import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { CityState } from "../../types/cityType";

const coordinatesApi = "https://api.openweathermap.org/geo/1.0/direct";

export const fetchCity = createAsyncThunk(
  "forecast/fetchCity",
  async (city: string, { rejectWithValue }) => {
    try {
      const coordinates = await axios.get<any[]>(coordinatesApi, {
        params: {
          q: city,
          limit: 1,
          appid: "3e889d69c5d056ea6b1230f4db90404d",
        },
      });

      const coordinatesData = await coordinates.data;

      return coordinatesData.map((city: any) => city.name);
    } catch (e) {
      return rejectWithValue("not success load city");
    }
  }
);

const initialState: CityState = {
  city: "",
  isLoading: false,
  error: "",
};

export const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCity.fulfilled.type]: (state, actions: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = "";
      state.city = actions.payload;
    },
    [fetchCity.pending.type]: state => {
      state.isLoading = true;
    },
    [fetchCity.rejected.type]: (state, actions: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = actions.payload;
    },
  },
});

export default citySlice.reducer;
