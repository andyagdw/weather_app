import WindTempContainer from "../windTempContainer/WindTempContainer"
import WindSunsetContainer from "../windSunsetContainer/WindSunsetContainer"

export default function WeatherFooter({ weatherData, isCelsius, setErrorMessage }) {
  return (
    <>
      <WindTempContainer weatherData={weatherData} isCelsius={isCelsius} setErrorMessage={setErrorMessage} />
      <WindSunsetContainer weatherData={weatherData} setErrorMessage={setErrorMessage} />
    </>
  );
}