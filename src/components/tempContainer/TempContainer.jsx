// Font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTemperatureThreeQuarters } from '@fortawesome/free-solid-svg-icons'
// Styles
import styles from './TempContainer.module.css'
// React
import { useContext } from 'react';
// Context
import { AppContext } from "../../context/AppContext"

export default function TempContainer() {

  const { weatherData, isCelsius } = useContext(AppContext)

  const weatherDataForecastdayTodayDayInfo = weatherData?.forecast?.forecastday?.[0]?.day
  const maxTempC = weatherDataForecastdayTodayDayInfo?.maxtemp_c
  const minTempC = weatherDataForecastdayTodayDayInfo?.mintemp_c
  const maxTempF = weatherDataForecastdayTodayDayInfo?.maxtemp_f
  const minTempF = weatherDataForecastdayTodayDayInfo?.mintemp_f
  const avgTempC = weatherDataForecastdayTodayDayInfo?.avgtemp_c
  const avgTempF = weatherDataForecastdayTodayDayInfo?.avgtemp_f
  
  const weatherDataCurrentInfo = weatherData?.current
  const feelslikeC = weatherDataCurrentInfo?.feelslike_c
  const feelslikeF = weatherDataCurrentInfo?.feelslike_f

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
}