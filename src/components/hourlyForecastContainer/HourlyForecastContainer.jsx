import HourlyForecastItems from '../hourlyForecastItems/HourlyForecastItems'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock'

export default function HourlyForecastContainer({ weatherData, isCelsius }) {
  return (
    <>
        <div className="row border-top mt-3 pt-3">
            <div className="col-lg-12">
                <h3 className="weatherHeadings">
                  Hourly Forecast
                  <span className='d-inline-block ms-1'><FontAwesomeIcon icon={faClock } /></span>
                </h3>
            </div>
        </div>
        <HourlyForecastItems weatherData={weatherData} isCelsius={isCelsius} />
    </>
  )
}