import WeatherHeader from '../weatherHeader/WeatherHeader'
import weatherDataJson from '../../weatherData.json'
import HourlyForecastContainer from '../hourlyForecastContainer/HourlyForecastContainer'
import TwoDayForecastContainer from '../twoDayForecastContainer/TwoDayForecastContainer'
import WeatherFooter from '../weatherFooter/WeatherFooter'
import { useState } from 'react'
import { images } from '../../assets/images'

export default function WeatherContainer({ weatherData, setErrorMessage }) {

  const [isCelsius, setIsCelsius] = useState(true)

  const handleClick = () => {
    setIsCelsius(!isCelsius);
  };

  const weatherDataCode = weatherData.current.condition.code;

  let backgroundImgUrl = '';

  for (let i = 0; i < weatherDataJson.length; i++) {
    if (weatherDataCode == weatherDataJson[i].code) {
      let imgKey = weatherDataJson[i].imageKey;
      backgroundImgUrl = images[imgKey];
      break;
    }
  }

  return (
    <div className="container-md mt-5" role="main">
      <div className="row">
        <div
          className="col-lg-4 mx-auto border rounded"
          style={{
            backgroundImage: `url("${backgroundImgUrl}")`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <WeatherHeader
            weatherData={weatherData}
            isCelsius={isCelsius}
            setIsCelsius={setIsCelsius}
            onBtnClick={handleClick}
            setErrorMessage={setErrorMessage}
          />
          <HourlyForecastContainer
            weatherData={weatherData}
            isCelsius={isCelsius}
            setErrorMessage={setErrorMessage}
          />
          <TwoDayForecastContainer
            weatherData={weatherData}
            isCelsius={isCelsius}
            setErrorMessage={setErrorMessage}
          />
          <WeatherFooter weatherData={weatherData}
            isCelsius={isCelsius}
            setErrorMessage={setErrorMessage} />
        </div>
      </div>
    </div>
  );
}
