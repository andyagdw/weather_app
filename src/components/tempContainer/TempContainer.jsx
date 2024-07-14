import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTemperatureThreeQuarters } from '@fortawesome/free-solid-svg-icons'
import styles from './TempContainer.module.css'
import { useEffect, memo, useContext } from 'react';
import { AppContext } from '../../App';

const TempContainer = memo(function TempContainer() {

  const { weatherData, setErrorMessage, isCelsius, errorMessage } = useContext(AppContext)

  const weatherDataForecastdayTodayDayInfo = weatherData?.forecast?.forecastday?.[0]?.day ?? null;
  const maxTempC = weatherDataForecastdayTodayDayInfo?.maxtemp_c ?? null;
  const minTempC = weatherDataForecastdayTodayDayInfo?.mintemp_c ?? null;
  const maxTempF = weatherDataForecastdayTodayDayInfo?.maxtemp_f ?? null;
  const minTempF = weatherDataForecastdayTodayDayInfo?.mintemp_f ?? null;
  const avgTempC = weatherDataForecastdayTodayDayInfo?.avgtemp_c ?? null;
  const avgTempF = weatherDataForecastdayTodayDayInfo?.avgtemp_f ?? null;
  
  const weatherDataCurrentInfo = weatherData?.current ?? null;
  const feelslikeC = weatherDataCurrentInfo?.feelslike_c ?? null;
  const feelslikeF = weatherDataCurrentInfo?.feelslike_f ?? null;

  useEffect(() => {
    if (
      [
        weatherDataForecastdayTodayDayInfo,
        maxTempC,
        minTempC,
        maxTempF,
        minTempF,
        avgTempC,
        avgTempF,
        weatherDataCurrentInfo,
        feelslikeC,
        feelslikeF
      ].some(item => item === null)
    ) {
      setErrorMessage(true);
    }
  }, [weatherData, isCelsius, setErrorMessage, errorMessage]);
  
  return (
  <div className="col-xl-5 border p-3 colContainer">
      <h4 className="weatherHeadings mb-3">
        Temperature
        <span className='d-inline-block ms-1'><FontAwesomeIcon icon={faTemperatureThreeQuarters} /></span>
      </h4>
      <div className={["d-flex justify-content-between", styles.tempStyles].join(" ")}>
        <div>Feels like:</div>
        <div>{isCelsius ? (
          <span>{Math.round(feelslikeC)}&#8451;</span>
        ) : (
          <span>{Math.round(feelslikeF)}&#8457;</span>
        )}</div>
      </div>
      <div className={["d-flex justify-content-between", styles.tempStyles].join(" ")}>
        <div>Avg temp:</div>
        <div>{isCelsius ? (
          <span>{Math.round(avgTempC)}&#8451;</span>
        ) : (
            <span>{Math.round(avgTempF)}&#8457;</span>
        )}</div>
      </div>
      <div className={["d-flex justify-content-between", styles.tempStyles].join(" ")}>
        <div>H/L:</div>
        <div>
          {isCelsius ? (
            <span>{Math.round(maxTempC)} | {Math.round(minTempC)}&#8451;</span>
          ) : (
            <span>{Math.round(maxTempF)} | {Math.round(minTempF)}&#8457;</span>
          )}
        </div>
      </div>
    </div>
  )
})

export default TempContainer;