// React
import { useContext } from 'react';
// Styles
import styles from './WindSunsetContainer.module.css'
// Context
import { AppContext } from '../../context/AppContext';

export default function WindSunsetContainer() {
  const [ weatherData ] = useContext(AppContext);
  
  const today = weatherData?.forecast?.forecastday?.[0];
  
  return (
    <div className="row mt-3">
      <div className={["col-lg-12", styles.colContainerSunset].join(" ")}>
        <div className="d-flex justify-content-evenly py-4">
          {today && <div>Sunset: {today.astro.sunset} </div>}
          {today && <div>Sunrise: {today.astro.sunrise} </div>}
        </div>
        <p className="text-center py-4">
          Powered by <a href="https://www.weatherapi.com/" title="Free Weather API">WeatherAPI.com</a>
        </p>
      </div>
    </div>
  );
}