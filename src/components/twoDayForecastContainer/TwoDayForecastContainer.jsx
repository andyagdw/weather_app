// Components
import TwoDayForecastItems from "../twoDayForecastItems/TwoDayForecastItems"
// Font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
// React
import { useContext } from "react";
// Context
import { AppContext } from "../../context/AppContext";

export default function TwoDayForecastContainer() {

  const { weatherData, isCelsius } = useContext(AppContext)

  const weatherDataForecastdayInfo = weatherData?.forecast?.forecastday;
  
  const tomorrow = weatherDataForecastdayInfo?.[1];
  const dayAfterTomorrow = weatherDataForecastdayInfo?.[2];
  const tomorrowDate = tomorrow?.date;
  const tomorrowWeatherIcon = tomorrow?.day?.condition?.icon;
  const dayAfterTomorrowDate = dayAfterTomorrow?.date;
  const dayAfterTomorrowWeatherIcon = dayAfterTomorrow?.day?.condition?.icon;
  const avgTempTomorrowC = weatherDataForecastdayInfo?.[1]?.day?.avgtemp_c;
  const avgTempTomorrowF = weatherDataForecastdayInfo?.[1]?.day?.avgtemp_f;
  const avgTempDayAfterTomorrowC = weatherDataForecastdayInfo?.[2]?.day?.avgtemp_c;
  const avgTempDayAfterTomorrowF = weatherDataForecastdayInfo[2]?.day?.avgtemp_f;

  return (
    <div className="row py-3">
      <div className="col-lg-12">
        <h3 className="weatherHeadings">
          Two-day forecast
          <span className="d-inline-block ms-1">
            <FontAwesomeIcon icon={faCalendar} />
          </span>
        </h3>
        <TwoDayForecastItems
          date={tomorrowDate}
          tempC={avgTempTomorrowC}
          tempF={avgTempTomorrowF}
          imgSrc={tomorrowWeatherIcon}
          isCelsius={isCelsius}
        />
        <TwoDayForecastItems
          date={dayAfterTomorrowDate}
          tempC={avgTempDayAfterTomorrowC}
          tempF={avgTempDayAfterTomorrowF}
          imgSrc={dayAfterTomorrowWeatherIcon}
          isCelsius={isCelsius}
        />
      </div>
    </div>
  );
}