import { memo, useContext, useEffect } from 'react';
import styles from './WindSunsetContainer.module.css'
import { AppContext } from '../../App';

const WindSunsetContainer = memo(function WindSunsetContainer() {
  const { weatherData, setErrorMessage, errorMessage } = useContext(AppContext);
  
  const today = weatherData?.forecast?.forecastday?.[0] ?? null;
  
  useEffect(() => {
    if (today === null) {
      setErrorMessage(true);
    }
  }, [weatherData, errorMessage]);

  return (
    <div className="row mt-3">
      <div className={["col-lg-12", styles.colContainerSunset].join(" ")}>
        <div className="d-flex justify-content-evenly py-4">
          {today !== null && <div>Sunset: {today.astro.sunset} </div>}
          {today !== null && <div>Sunrise: {today.astro.sunrise} </div>}
        </div>
        <p className="text-center py-4">
          Powered by <a href="https://www.weatherapi.com/" title="Free Weather API">WeatherAPI.com</a>
        </p>
      </div>
    </div>
  );
})

export default WindSunsetContainer;