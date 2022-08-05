import { FC } from "react";
import { useAppSelector } from "../../hooks/redux";

const CurrentWeather: FC = () => {
  const { current, isLoading, error } = useAppSelector(
    state => state.currentReducer
  );
  const { city } = useAppSelector(state => state.cityReducer);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1 className="text-red-500 text-xl">{error}</h1>;
  }

  return (
    <>
      {Object.keys(current).length === 0 ? (
        <div>Enter your city</div>
      ) : (
        <div key={current.id} className="weather">
          <div className="menu">
            <div>
              <p className="text-left font-semibold text-[18px] leading-none">
                {city}
              </p>
              <p className="text-left leading-none">
                {current.weather[0].description}
              </p>
            </div>
            <img
              alt="weather"
              className="w-[100px]"
              src={`icons/${current.weather[0].icon}.png`}
            />
          </div>
          <div className="menu">
            <p className="temperature">{Math.round(current.main.temp)}°C</p>
            <div className="w-full pl-5">
              <div className="parameter-row">
                <span className="parameter-label">Details</span>
              </div>
              <div className="parameter-row">
                <span className="parameter-label">Feels like</span>
                <span className="parameter-value">
                  {Math.round(current.main.feels_like)}°C
                </span>
              </div>
              <div className="parameter-row">
                <span className="parameter-label">Wind</span>
                <span className="parameter-value">
                  {current.wind.speed} m/s
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-left text-xs">Humidity</span>
                <span className="text-right font-semibold text-xs">
                  {current.main.humidity}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-left text-xs">Pressure</span>
                <span className="text-right font-semibold text-xs">
                  {current.main.pressure} hPa
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CurrentWeather;
