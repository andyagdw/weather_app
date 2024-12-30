// Components
import WeatherHeader from '../weatherHeader/WeatherHeader'
// Json
import weatherDataJson from '../../weatherData.json'
// Components
import HourlyForecastContainer from '../hourlyForecastContainer/HourlyForecastContainer'
import TwoDayForecastContainer from '../twoDayForecastContainer/TwoDayForecastContainer'
import WeatherFooter from '../weatherFooter/WeatherFooter'
// Assets
import { images } from '../../assets/images'
// React
import { useContext } from 'react'
// Context
import { AppContext } from '../../context/AppContext'

export default function WeatherContainer() {

  const [ weatherData ] = useContext(AppContext);
  
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
          className="col-lg-4 mx-auto border rounded"
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
          <WeatherFooter />
        </div>
      </div>
    </main>
  );
}
