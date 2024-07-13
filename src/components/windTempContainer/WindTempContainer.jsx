import WindContainer from '../windContainer/WindContainer';
import TempContainer from '../tempContainer/TempContainer';

export default function WindTempContainer({ weatherData, isCelsius, setErrorMessage }) {

  return (
    <div className="row d-flex justify-content-around mt-3">
      <WindContainer weatherData={weatherData} setErrorMessage={setErrorMessage} />
      <TempContainer weatherData={weatherData} isCelsius={isCelsius} setErrorMessage={setErrorMessage} />
    </div>
  );
}