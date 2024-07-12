import styles from './TwoDayForecastItems.module.css';

export default function TwoDayForecastItems({ date, temp, imgSrc, isCelsius }) {

  // Parse the date string into a Date object
  let dateObj = new Date(date);

  // Extract day and month
  let currentDay = dateObj.getDate();
  let currentMonth = dateObj.getMonth() + 1;  // Months are zero-indexed

  // Format into 'dd / mm'
  let formattedDate = `${currentDay} / ${currentMonth}`;

  return (
    <div className="col-lg-12 mt-2">
      <div className="border rounded px-3 d-flex justify-content-between align-items-center colContainer">
        <div className="fs-3">{formattedDate}</div>
        <div className="fs-3">{
          isCelsius ? (
            <span>{temp}&#8451;</span>
          ) : (
              <span>{temp}&#8457;</span>
        )}</div>
        <div>
          <img src={imgSrc} alt="Weather icon" className={styles.weatherImg} />
        </div>
      </div>
    </div>
  );
}