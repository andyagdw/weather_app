import { memo, useContext, useEffect } from 'react';
import styles from './WeatherHeader.module.css'
import { AppContext } from '../../App';

const WeatherHeader = memo(function WeatherHeader() {

  const {
    weatherData,
    isCelsius,
    setIsCelsius,
    setErrorMessage,
    errorMessage,
  } = useContext(AppContext);
  
  const handleClick = () => {
    setIsCelsius(prev => !prev)
  }
  
  const weatherDataLocationInfo = weatherData?.location ?? null;
  const city = weatherDataLocationInfo?.name ?? null;
  const country = weatherDataLocationInfo?.country ?? null;
  const localTime = weatherDataLocationInfo?.localtime?.split(" ")[1] ?? null;
  
  const weatherDataCurrentInfo = weatherData?.current ?? null;
  const lastUpdated = weatherDataCurrentInfo?.last_updated?.split(" ")[1] ?? null;
  const tempC = weatherDataCurrentInfo?.temp_c ?? null;
  const tempF = weatherDataCurrentInfo?.temp_f ?? null;
  
  const weatherDataCurrentConditionInfo = weatherData?.current?.condition ?? null;
  const text = weatherDataCurrentConditionInfo?.text ?? null;

  useEffect(() => {
    if (
      [
        weatherDataLocationInfo,
        city,
        country,
        localTime,
        weatherDataCurrentInfo,
        lastUpdated,
        tempC,
        tempF,
        weatherDataCurrentConditionInfo,
        text
      ].some(item => item === null)
    ) {
      setErrorMessage(true)
    }
  }, [weatherData, setErrorMessage, errorMessage, isCelsius])
  
  return (
    <div className="row">
      <div className="col-lg-12 py-3 text-center colContainer">
          {tempC !== null && tempF !== null && <h1 className="display-3">
            {isCelsius ? (
              <span>{Math.round(tempC)}&#8451;</span>
            ) : (
              <span>{Math.round(tempF)}&#8457;</span>
            )}
          </h1>}
          {city !== null && country !== null && <h2 className="h4">
            {city} | {country}
          </h2>}
          {lastUpdated !== null && <p className="fw-light mb-0">Last updated: {lastUpdated}</p>}
          {localTime !== null && <p className="fw-light">Local time: {localTime}</p>}
          {text !== null && <p>
            <small>{text}</small>
          </p>}
          <button
            onClick={handleClick}
            className={["px-3", styles.tempScalesButton].join(" ")}
          >
            {isCelsius ? <span>&#8457;</span> : <span>&#8451;</span>}
          </button>
      </div>
    </div>
  );
})
  
export default WeatherHeader