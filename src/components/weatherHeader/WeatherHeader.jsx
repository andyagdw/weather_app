import styles from './WeatherHeader.module.css'

export default function WeatherHeader({ weatherData, isCelsius, onBtnClick, setErrorMessage }) {
  // const last_updated = weatherData.current.last_updated.split(" ")[1]; // Get time

  const weatherDataLocationInfo = weatherData.location ?? null;
  const city = weatherDataLocationInfo.name ?? null;
  const country = weatherDataLocationInfo.country ?? null;
  const localTime = weatherDataLocationInfo.localtime.split(" ")[1] ?? null;

  const weatherDataCurrentInfo = weatherData.current;
  const lastUpdated = weatherDataCurrentInfo.last_updated.split(" ")[1] ?? null;
  const tempC = weatherDataCurrentInfo.temp_c ?? null;
  const tempF = weatherDataCurrentInfo.temp_f ?? null;

  const weatherDataCurrentConditionInfo = weatherData.current.condition;
  const text = weatherDataCurrentConditionInfo.text ?? null;

  if (
    !weatherDataLocationInfo ||
    !city ||
    !country ||
    !localTime ||
    !lastUpdated ||
    !tempC ||
    !tempF ||
    !text
  ) {
    setErrorMessage(true)
  }

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
            onClick={onBtnClick}
            className={["px-3", styles.tempScalesButton].join(" ")}
          >
            {isCelsius ? <span>&#8457;</span> : <span>&#8451;</span>}
          </button>
      </div>
    </div>
  );
}