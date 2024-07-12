import styles from './WindSunsetContainer.module.css'

export default function WindSunsetContainer({ weatherData }) {

  let today = weatherData.forecast.forecastday[0];

  return (
    <div className="row mt-3">
      <div className={["col-lg-12", styles.colContainerSunset].join(" ")}>
        <div className="d-flex justify-content-evenly py-4">
          <div>Sunset: {today.astro.sunset} </div>
          <div>Sunrise: {today.astro.sunrise} </div>
        </div>
        <p className="text-center py-4">
          Powered by <a href="https://www.weatherapi.com/" title="Free Weather API">WeatherAPI.com</a>
        </p>
      </div>
    </div>
  );
}