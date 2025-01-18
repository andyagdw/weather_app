// React
import { useContext } from 'react';
// Styles
import styles from './TwoDayForecastItems.module.css';
// Context
import { AppContext } from '../../context/AppContext';

export default function TwoDayForecastItems({ date, tempC, tempF, imgSrc }) {

  const { isCelsius } = useContext(AppContext)

  const avgTemp = isCelsius ? Math.round(tempC) : Math.round(tempF);
  
  // Parse the date string into a Date object
  const dateObj = new Date(date);
  
  // Extract day and month
  const currentDay = dateObj.getDate();
  const currentMonth = dateObj.getMonth() + 1;  // Months are zero-indexed
  
  // Format into 'dd / mm'
  const formattedDate = `${currentDay} / ${currentMonth}`;
  
  return (
    <div className="col-lg-12 mt-2">
      <div className="border rounded px-3 d-flex justify-content-between align-items-center colContainer">
        <div className="fs-3">{formattedDate}</div>
        <div className="fs-3">{
          isCelsius ? (
            <span>{avgTemp}&#8451;</span>
          ) : (
              <span>{avgTemp}&#8457;</span>
        )}</div>
        <div>
          <img src={imgSrc} alt="Weather icon" className={styles.weatherImg} />
        </div>
      </div>
    </div>
  );
}