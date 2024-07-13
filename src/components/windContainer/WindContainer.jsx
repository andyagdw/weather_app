import styles from './WindContainer.module.css'
import { faWind } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function WindContainer({ weatherData, setErrorMessage }) {

  const weatherDataCurrentInfo = weatherData.current;
  const windMph = weatherDataCurrentInfo.wind_mph ?? null;
  const windDirection = weatherDataCurrentInfo.wind_dir ?? null;

  if (
    !weatherDataCurrentInfo ||
    !windMph ||
    !windDirection
  ) {
    setErrorMessage(true)
  }

  return (
    <div className="col-xl-5 border p-3 colContainer">
      <h4 className="weatherHeadings mb-3">
        Wind
        <span className="d-inline-block ms-1">
          <FontAwesomeIcon icon={faWind} />
        </span>
      </h4>
      <p className="fs-4">
        {Math.round(windMph)}
        <sup>
          <span className={styles.spanSuperScript}>MPH</span>
        </sup>
      </p>
      <p className="fs-4">
        {windDirection}
        <sup>
          <span className={styles.spanSuperScript}>Direction</span>
        </sup>
      </p>
    </div>
  );
}