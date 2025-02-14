// Components
import WeatherHeader from '../weatherHeader/WeatherHeader'
import HourlyForecastContainer from '../hourlyForecastContainer/HourlyForecastContainer'
import TwoDayForecastContainer from '../twoDayForecastContainer/TwoDayForecastContainer'
import WindSunsetContainer from "../windSunsetContainer/WindSunsetContainer"
import WindContainer from "../windContainer/WindContainer"
import TempContainer from "../tempContainer/TempContainer"
// Json
import weatherDataJson from '../../weatherData.json'
// Assets
import { images } from '../../assets/images'
// React
import { useContext } from 'react'
// Context
import { AppContext } from '../../context/AppContext'

export default function WeatherContainer() {

  const { weatherData } = useContext(AppContext);
  
  const weatherDataCode = weatherData?.current?.condition?.code;

  const backgroundImgUrl = () => {
    for (let i = 0; i < weatherDataJson.length; i++) {
      if (weatherDataCode == weatherDataJson[i].code) {
        const imgKey = weatherDataJson[i].imageKey;
        return images[imgKey];
      }
    }
  }

  return (
    <main className="container-md mt-5">
      <div className="row">
        <div
          className="col-lg-6 mx-auto border rounded"
          style={{
            backgroundImage: `url("${backgroundImgUrl()}")`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <WeatherHeader />
          <HourlyForecastContainer />
          <TwoDayForecastContainer />
          <div className="row d-flex justify-content-around mt-3">
            <WindContainer />
            <TempContainer />
          </div>
          <WindSunsetContainer />
        </div>
      </div>
    </main>
  );
}
