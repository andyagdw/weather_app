import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTemperatureThreeQuarters } from '@fortawesome/free-solid-svg-icons'
import styles from './TempContainer.module.css'

export default function TempContainer({ weatherData, isCelsius }) {
    
    const today = weatherData.forecast.forecastday[0];
    const avgTemp = isCelsius ? today.day.avgtemp_c : today.day.avgtemp_f;

  return (
    <div className="col-xl-5 border p-3 colContainer">
        <h4 className="weatherHeadings mb-3">
          Temperature
          <span className='d-inline-block ms-1'><FontAwesomeIcon icon={faTemperatureThreeQuarters} /></span>
        </h4>
        <div className={["d-flex justify-content-between", styles.tempStyles].join(" ")}>
          <div>Feels like:</div>
          <div>{isCelsius ? (
            <span>{weatherData.current.feelslike_c}&#8451;</span>
          ) : (
            <span>{weatherData.current.feelslike_f}&#8457;</span>
          )}</div>
        </div>
        <div className={["d-flex justify-content-between", styles.tempStyles].join(" ")}>
          <div>Avg temp:</div>
          <div>{isCelsius ? (
            <span>{ avgTemp }&#8451;</span>
          ) : (
              <span>{ avgTemp }&#8457;</span>
          )}</div>
        </div>
        <div className={["d-flex justify-content-between", styles.tempStyles].join(" ")}>
          <div>H/L:</div>
          <div>
            {isCelsius ? (
              <span>{today.day.maxtemp_c} | {today.day.mintemp_c}&#8451;</span>
            ) : (
              <span>{today.day.maxtemp_f} | {today.day.mintemp_f}&#8457;</span>
            )}
          </div>
        </div>
      </div>
  )
}