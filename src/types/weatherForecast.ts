import { IWeather } from "./forecastType";

export interface ForecastState {
  forecast: IWeather[];
  isLoading: boolean;
  error: null | string;
}

