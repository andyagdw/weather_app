import TwoDayForecastItems from "../twoDayForecastItems/TwoDayForecastItems"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { memo, useContext, useEffect } from "react";
import { AppContext } from "../../App";

const TwoDayForecastContainer = memo(function TwoDayForecastContainer() {

  const { weatherData, isCelsius, setErrorMessage, errorMessage } = useContext(AppContext)

  const weatherDataForecastdayInfo = weatherData?.forecast?.forecastday ?? null;
  
  const tomorrow = weatherDataForecastdayInfo?.[1] ?? null;
  const dayAfterTomorrow = weatherDataForecastdayInfo?.[2] ?? null;
  const tomorrowDate = tomorrow?.date ?? null;
  const tomorrowWeatherIcon = tomorrow?.day?.condition?.icon ?? null;
  const dayAfterTomorrowDate = dayAfterTomorrow?.date ?? null;
  const dayAfterTomorrowWeatherIcon = dayAfterTomorrow?.day?.condition?.icon ?? null;
  const avgTempTomorrowC = weatherDataForecastdayInfo?.[1]?.day?.avgtemp_c ?? null;
  const avgTempTomorrowF = weatherDataForecastdayInfo?.[1]?.day?.avgtemp_f ?? null;
  const avgTempDayAfterTomorrowC = weatherDataForecastdayInfo?.[2]?.day?.avgtemp_c ?? null;
  const avgTempDayAfterTomorrowF = weatherDataForecastdayInfo[2]?.day?.avgtemp_f ?? null;
  
  useEffect(() => {
    if (
      [
        tomorrow,
        dayAfterTomorrow,
        tomorrowDate,
        tomorrowWeatherIcon,
        dayAfterTomorrowDate,
        dayAfterTomorrowWeatherIcon,
        avgTempTomorrowC,
        avgTempTomorrowF,
        avgTempDayAfterTomorrowC,
        avgTempDayAfterTomorrowF
      ].some(item => item === null)
    ) {
      setErrorMessage(true)
    }
  }, [weatherData, isCelsius, errorMessage])

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
})
  
export default TwoDayForecastContainer;