import WeatherHeader from '../weatherHeader/WeatherHeader'
import weatherDataJson from '../../weatherData.json'
import HourlyForecastContainer from '../hourlyForecastContainer/HourlyForecastContainer'
import TwoDayForecastContainer from '../twoDayForecastContainer/TwoDayForecastContainer'
import WeatherFooter from '../weatherFooter/WeatherFooter'
import { images } from '../../assets/images'
import { useEffect, useContext, useMemo } from 'react'
import { AppContext } from '../../App'

export default function WeatherContainer() {

  const { weatherData, setErrorMessage, errorMessage } = useContext(AppContext);
  
  const weatherDataCode = useMemo(() => {
    return weatherData?.current?.condition?.code ?? null;
  }, [weatherData])

  useEffect(() => {
      if (weatherDataCode === null) {
        setErrorMessage(true);
      }
  }, [weatherData, errorMessage]);

  const backgroundImgUrl = useMemo(() => {
    for (let i = 0; i < weatherDataJson.length; i++) {
      if (weatherDataCode == weatherDataJson[i].code) {
        let imgKey = weatherDataJson[i].imageKey;
        return images[imgKey];
      }
    }
  }, [weatherDataCode])

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
          <WeatherHeader />
          <HourlyForecastContainer />
          <TwoDayForecastContainer />
          <WeatherFooter />
        </div>
      </div>
    </div>
  );
}
