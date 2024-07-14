import WindContainer from '../windContainer/WindContainer';
import TempContainer from '../tempContainer/TempContainer';

export default function WindTempContainer() {

  return (
    <div className="row d-flex justify-content-around mt-3">
      <WindContainer />
      <TempContainer />
    </div>
  );
}