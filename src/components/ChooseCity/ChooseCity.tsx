import { FC } from "react";
import { useAppDispatch } from "../../hooks/redux";
import Validation from "../../hooks/useValidation";
import { fetchCity } from "../../store/reducer/citySlice";
import { fetchCurrent } from "../../store/reducer/currentSlice";
import { fetchForecast } from "../../store/reducer/forecastSlice";
import Input from "../UI/Input";
import "./button.css";

const ChooseCity: FC = () => {
  const {
    taskDirty,
    formValid,
    taskError,
    blurHandler,
    cityHandler,
    city,
    setCity,
  } = Validation();
  const dispatch = useAppDispatch();

  const handleClickBtn = () => {
    dispatch(fetchForecast(city));
    dispatch(fetchCity(city));
    dispatch(fetchCurrent(city));
    setCity(city);
  };

  return (
    <div className="flex justify-center mb-4 sm:block sm:mx-auto">
      <div>
        <Input
          name="city"
          type="text"
          value={city}
          className="px-4 py-2 mr-2 rounded-2xl outline-none sm:mr-0"
          placeholder="Enter your city"
          onChange={e => cityHandler(e)}
          onKeyPress={e => e.key === "Enter" && handleClickBtn()}
          onBlur={e => blurHandler(e)}
        />
        {taskDirty && taskError && (
          <div className="text-red-500 text-left pl-3">{taskError}</div>
        )}
      </div>
      <button onClick={handleClickBtn} type="submit" disabled={!formValid}>
        <span>Find</span>
        <div className="liquid"></div>
      </button>
    </div>
  );
};

export default ChooseCity;
