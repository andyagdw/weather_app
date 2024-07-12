import styles from './WeatherHeader.module.css'

export default function WeatherHeader({ weatherData, isCelsius, onBtnClick, weatherDataTxt }) {
  const last_updated = weatherData.current.last_updated.split(" ")[1]; // Get time

  return (
    <div className="row">
      <div className="col-lg-12 py-3 text-center colContainer">
          <h1 className="display-3">
            {isCelsius ? (
              <span>{Math.round(weatherData.current.temp_c)}&#8451;</span>
            ) : (
              <span>{Math.round(weatherData.current.temp_f)}&#8457;</span>
            )}
          </h1>
          <h2 className="h4">
            {weatherData.location.name} | {weatherData.location.country}
          </h2>
          <p className="fw-light">Last updated: {last_updated}</p>
          <p>
            <small>{weatherDataTxt}</small>
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