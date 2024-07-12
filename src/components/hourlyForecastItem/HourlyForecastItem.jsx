// import React from 'react'

export default function HourlyForecastItem({ icon, temp, hour, isCelsius}) {
  return (
    <div className="d-inline-block">
      <div className="text-center">{hour}</div>
      <div>
        <img src={icon} alt="Weather Icon" />
      </div>
      <div className="text-center">
        {isCelsius ? (
          <span>{temp}&#8451;</span>
        ) : (
          <span>{temp}&#8457;</span>
        )}
      </div>
    </div>
  );
}
