import { ICurrentWeather } from "./currentType";

export interface CurrentState {
  current: ICurrentWeather | any;
  isLoading: boolean;
  error: null | string;
}