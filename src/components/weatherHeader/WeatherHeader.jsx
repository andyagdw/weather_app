// React
import { useContext } from 'react';
// Styles
import styles from './WeatherHeader.module.css'
// Context
import { AppContext } from '../../context/AppContext';

export default function WeatherHeader() {

  const { weatherData, isCelsius, setIsCelsius } = useContext(AppContext);
  
  const handleClick = () => {
    setIsCelsius(prev => !prev)
  }
  
  const weatherDataLocationInfo = weatherData?.location;
  const city = weatherDataLocationInfo?.name;
  const country = weatherDataLocationInfo?.country;
  const localTime = weatherDataLocationInfo?.localtime?.split(" ")[1];
  
  const weatherDataCurrentInfo = weatherData?.current;
  const lastUpdated = weatherDataCurrentInfo?.last_updated?.split(" ")[1];
  const tempC = weatherDataCurrentInfo?.temp_c;
  const tempF = weatherDataCurrentInfo?.temp_f;
  
  const weatherDataCurrentConditionInfo = weatherData?.current?.condition;
  const text = weatherDataCurrentConditionInfo?.text;

  return (
    <div className="row">
      <div className="col-lg-12 py-3 text-center colContainer">
          <h1 className="display-3">
            {isCelsius ? (
              <span>{Math.round(tempC)}&#8451;</span>
            ) : (
              <span>{Math.round(tempF)}&#8457;</span>
            )}
          </h1>
          <h2 className="h4">
            {city} | {country}
          </h2>
          <p className="fw-light mb-0">Last updated: {lastUpdated}</p>
          <p className="fw-light">Local time: {localTime}</p>
          <p>
            <small>{text}</small>
          </p>
          <button
            onClick={handleClick}
            className={["px-3", styles.tempScalesButton].join(" ")}
          >
            {isCelsius ? <span>&#8457;</span> : <span>&#8451;</span>}
          </button>
      </div>
    </div>
  );
}