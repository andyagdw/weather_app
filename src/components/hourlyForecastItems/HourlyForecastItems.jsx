// Styles
import styles from './HourlyForecastItems.module.css'
// Font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
// Components
import HourlyForecastItem from '../hourlyForecastItem/HourlyForecastItem';
// React
import { useContext } from 'react';
// Context
import { AppContext } from "../../context/AppContext";

export default function HourlyForecastItems() {
  const { weatherData, isCelsius } = useContext(AppContext);

  const localTime = weatherData?.location?.localtime;
  const weatherDataForecastDayInfo = weatherData?.forecast?.forecastday;
  const todayData = weatherDataForecastDayInfo?.[0];
  // An array of the hourly forecast
  const hourlyForecastTodayData = todayData?.hour;
  const tomorrowData = weatherDataForecastDayInfo?.[1];
  // An array of tomorrow's hourly forecast
  const hourlyForecastTomorrowData = tomorrowData?.hour;

  const numOfItemsToShow = 20; // Number of hours to show in the carousel
  const weatherDataNext12Hours = [];
  const localTimeDateTimeParts = localTime.split(" ");
  const localTimeHoursMinutesParts = localTimeDateTimeParts[1].split(":");
  const currentHour = +localTimeHoursMinutesParts[0]; // Store local time

  let count = 1; // Show next hour first, instead of current hour in carousel
  let hoursAfterCurrentHourUpTo23 = 0; // Will be used to check when to move on to tomorrow's data
  let firstTime = true; // If it is the first time iterating through tomorrow's data

  for (let i = 0; i < numOfItemsToShow; i++) {
    if (hoursAfterCurrentHourUpTo23 > 22 || currentHour === 23) {
      // If hoursAfterCurrentHourUpTo23 is 23 (23:00pm) or time is 23:00pm, start from 00:00am
      if (!firstTime) {
        count++;
        let hourData = hourlyForecastTomorrowData.at(count);
        let hour = hourlyForecastTomorrowData.indexOf(hourData);
        let tempC = hourData?.temp_c;
        let tempF = hourData?.temp_f;
        let time = hourData?.time;
        let icon = hourData?.condition?.icon;

        weatherDataNext12Hours.push({
          hour: hour,
          temp: isCelsius ? Math.round(tempC) : Math.round(tempF),
          icon: icon,
          time: time,
        });
      } else {
        count = 0;
        let hourData = hourlyForecastTomorrowData?.at(count);
        let hour = hourlyForecastTomorrowData?.indexOf(hourData);
        let tempC = hourData?.temp_c;
        let tempF = hourData?.temp_f;
        let time = hourData?.time;
        let icon = hourData?.condition?.icon;
        weatherDataNext12Hours.push({
          hour: hour,
          temp: isCelsius ? Math.round(tempC) : Math.round(tempF),
          icon: icon,
          time: time,
        });
        firstTime = false;
      }
    } else {
      let updatedCurrentHour = currentHour + count;
      hoursAfterCurrentHourUpTo23 = updatedCurrentHour;
      let hourData =
        hourlyForecastTodayData?.at(hoursAfterCurrentHourUpTo23);
      let hour = hourlyForecastTodayData?.indexOf(hourData);
      let tempC = hourData?.temp_c;
      let tempF = hourData?.temp_f;
      let time = hourData?.time;
      let icon = hourData?.condition?.icon;

      weatherDataNext12Hours.push({
        hour: hour,
        temp: isCelsius ? Math.round(tempC) : Math.round(tempF),
        icon: icon,
        time: time,
      });
      count++;
    }
  }

  let subArrays = []; // Used to store 4 arrays, containing today (and tomorrow's data, if the hour is past 4 am)

  for (let i = 0; i < weatherDataNext12Hours.length; i += 5) {
    let subArray = weatherDataNext12Hours.slice(i, i + 5);
    subArrays.push(subArray);
  }

  return (
    <div className="row py-3">
      <div className="col-lg-12 colContainer">
        <div
          className="carousel slide"
          data-bs-interval="false"
          id="carouselExampleControls"
        >
          <div className="carousel-inner">
            {subArrays.map((outerVal, outerIdx) => (
              // Outerval contains an array of 5 values
              <div
                key={outerIdx}
                className={
                  outerIdx === 0 ? "carousel-item active" : "carousel-item"
                }
              >
                <div className="d-flex justify-content-evenly">
                  {outerVal.map(innerVal => {
                    return (
                      <HourlyForecastItem
                        {...innerVal}
                        isCelsius={isCelsius}
                        key={innerVal.time}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <a
            className={["carousel-control-prev", styles.arrowContainer].join(
              " "
            )}
            href="#carouselExampleControls"
            role="button"
            data-bs-slide="prev"
          >
            <span>
              <FontAwesomeIcon icon={faCircleArrowLeft} color="black" />
            </span>
          </a>
          <a
            className={["carousel-control-next", styles.arrowContainer].join(
              " "
            )}
            href="#carouselExampleControls"
            role="button"
            data-bs-slide="next"
          >
            <span>
              <FontAwesomeIcon icon={faCircleArrowRight} color="black" />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}