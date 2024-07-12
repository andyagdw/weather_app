import styles from './HourlyForecastItems.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import HourlyForecastItem from '../hourlyForecastItem/HourlyForecastItem';

export default function HourlyForecastItems({ weatherData, isCelsius }) {

    const date = new Date();
    const numOfItemsToShow = 20;  // Number of hours to show in the carousel
    const weatherDataNext12Hours = [];
    const currentHour = date.getHours();  // Get the current hour
    let count = 1; 
    let recent = 0;  // Will be used to check when to move on to tomorrows data
    let firstTime = true;  // If it is the first time iterating through tomorrows data

    const todayData = weatherData.forecast.forecastday[0]
    const hourlyForecastTodayData = todayData.hour  // An array of the hourly forecast
    const tomorrowData = weatherData.forecast.forecastday[1]
    const hourlyForecastTomorrowData = tomorrowData.hour  // An array of tomorrows hourly forecast

    for (let i = 0; i < numOfItemsToShow; i++) {
      if (recent > 22) {
        // If recent is 23 (23:00pm), start again from 0 (00:00am)
        if (!firstTime) {
          count++;
          let hourData = hourlyForecastTomorrowData.at(count);
          let hour = hourlyForecastTomorrowData.indexOf(hourData);
          weatherDataNext12Hours.push({
            hour: hour,
            temp: isCelsius
              ? Math.round(hourData.temp_c)
              : Math.round(hourData.temp_f),
            icon: hourData.condition.icon,
            time: hourData.time,
          });
        } else {
          count = 0;
          let hourData = hourlyForecastTomorrowData.at(count);
          let hour = hourlyForecastTomorrowData.indexOf(hourData);
          weatherDataNext12Hours.push({
            hour: hour,
            temp: isCelsius
              ? Math.round(hourData.temp_c)
              : Math.round(hourData.temp_f),
            icon: hourData.condition.icon,
            time: hourData.time,
          });
          firstTime = false;
        }
      } else {
        let updatedCurrentHour = currentHour + count;
        recent = updatedCurrentHour;
        let hourData = hourlyForecastTodayData.at(recent);
        let hour = hourlyForecastTodayData.indexOf(hourData);
        weatherDataNext12Hours.push({
          hour: hour,
          temp: isCelsius
            ? Math.round(hourData.temp_c)
            : Math.round(hourData.temp_f),
          icon: hourData.condition.icon,
          time: hourData.time,
        });
        count++;
      }
    }

    let subArrays = []  // Used to store 4 arrays, containing today (and tomorrows data, if hour is past 4am)

    for (let i = 0; i < weatherDataNext12Hours.length; i += 5) {
        let subArray = weatherDataNext12Hours.slice(i, i + 5);
        subArrays.push(subArray);
    }

    return (
      <div className="row py-3">
          <div className="col-lg-12 colContainer">
            <div className="carousel slide" data-bs-interval="false" id="carouselExampleControls">
                <div className="carousel-inner">
                    {subArrays.map((outerVal, outerIdx) => (  // Outerval contains an array of 5 values
                        <div
                            key={outerIdx}
                            className={outerIdx === 0 ?
                                "carousel-item active" :
                                "carousel-item"}>
                            <div className='d-flex justify-content-evenly'>
                                {outerVal.map(innerVal => {  // Loop through each hour in innerval
                                    return (
                                        <HourlyForecastItem {...innerVal} isCelsius={isCelsius} key={innerVal.time} />
                                    )
                                })}
                        </div>
                        </div>
                    ))}
                </div>
                <a
                    className={["carousel-control-prev", styles.arrowContainer].join(" ")}
                    href="#carouselExampleControls"
                    role="button"
                    data-bs-slide="prev">
                        <span><FontAwesomeIcon icon={faCircleArrowLeft} color='black' /></span>
                </a>
                <a 
                    className={["carousel-control-next", styles.arrowContainer].join(" ")}
                    href="#carouselExampleControls"
                    role="button"
                        data-bs-slide="next">
                        <span><FontAwesomeIcon icon={faCircleArrowRight} color='black' /></span>
                </a>
            </div>
        </div>
      </div>
  )
}
