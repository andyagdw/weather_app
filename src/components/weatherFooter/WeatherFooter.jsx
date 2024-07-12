import WindTempContainer from "../windTempContainer/WindTempContainer"
import WindSunsetContainer from "../windSunsetContainer/WindSunsetContainer"

export default function WeatherFooter({ weatherData, isCelsius }) {
  return (
    <>
      <WindTempContainer weatherData={weatherData} isCelsius={isCelsius} />
      <WindSunsetContainer weatherData={weatherData} />
    </>
  );
}