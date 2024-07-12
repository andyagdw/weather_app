import WindContainer from '../windContainer/WindContainer';
import TempContainer from '../tempContainer/TempContainer';

export default function WindTempContainer({ weatherData, isCelsius }) {

  return (
    <div className="row d-flex justify-content-around mt-3">
      <WindContainer weatherData={weatherData} />
      <TempContainer weatherData={weatherData} isCelsius={isCelsius} />
    </div>
  );
}