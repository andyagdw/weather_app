// Components
import WindTempContainer from "../windTempContainer/WindTempContainer"
import WindSunsetContainer from "../windSunsetContainer/WindSunsetContainer"

export default function WeatherFooter() {

  return (
    <>
      <WindTempContainer />
      <WindSunsetContainer />
    </>
  );
}