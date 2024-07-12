import TwoDayForecastItems from "../twoDayForecastItems/TwoDayForecastItems"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

export default function TwoDayForecastContainer({ weatherData, isCelsius }) {

  const tomorrow = weatherData.forecast.forecastday[1];
  const dayAfterTomorrow = weatherData.forecast.forecastday[2];

  const date1 = tomorrow.date;
  const avgTemp1 = isCelsius ? Math.round(tomorrow.day.avgtemp_c) : Math.round(tomorrow.day.avgtemp_f);
  const imgScr1 = tomorrow.day.condition.icon;

  const date2 = dayAfterTomorrow.date;
  const avgTemp2 = isCelsius ? Math.round(dayAfterTomorrow.day.avgtemp_c) : Math.round(dayAfterTomorrow.day.avgtemp_f);
  const imgScr2 = dayAfterTomorrow.day.condition.icon;

  return (
    <div className="row py-3">
      <div className="col-lg-12">
        <h3 className="weatherHeadings">
          Two-day forecast
          <span className='d-inline-block ms-1'><FontAwesomeIcon icon={faCalendar} /></span>
        </h3>
        <TwoDayForecastItems date={date1} temp={avgTemp1} imgSrc={imgScr1} isCelsius={isCelsius} />
        <TwoDayForecastItems date={date2} temp={avgTemp2} imgSrc={imgScr2} isCelsius={isCelsius} />
      </div>
    </div>
  );
}