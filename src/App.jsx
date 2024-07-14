import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import SearchBar from './components/searchbar/SearchBar'
import WeatherContainer from './components/weatherContainer/WeatherContainer'

export const AppContext = createContext(null);  // Store App state variables here

export default function App() {
  
  const [cityName, setCityName] = useState("")
  const [weatherData, setWeatherData] = useState(null)
  const [errorMessage, setErrorMessage] = useState(false)
  const [isCelsius, setIsCelsius] = useState(true);

  const options = {  // Options for WeatherAPI.com
    method: 'GET',
    headers: {
      'x-rapidapi-key': import.meta.env.VITE_WEATHER_API_KEY,  // Get API key from `.env`
      'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
    }
  };

  const search = useCallback(async (city) => {  // Fetch weather data
    try {
      // 'days=3' means get a 3 day forecast including the current day
      const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=3`;
      const response = await fetch(url, options);

      if (!response.ok) {  // Ensure that HTTP errors are caught and handled in the try block
        // Fetch function only throws an error if there is a network error. It ignores HTTP errors like 404 or 500
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (errorMessage) {  // Check if there was an error message from previous calls. If so, set it to false
        setErrorMessage(false);
      }

      if (  // Check if all data was sent from API
        data.location &&
        data.current &&
        data.current.condition &&
        data.forecast &&
        data.forecast.forecastday &&
        data.forecast.forecastday.length === 3 &&
        data.forecast.forecastday[0].hour.length === 24 &&
        data.forecast.forecastday[1].hour.length === 24
      ) {
        setWeatherData(data);
        setCityName("");
      } else {
        throw new Error("All data was not sent");
      }

    } catch (error) {
      setErrorMessage(true);
      setCityName("");
    }
  }, [cityName, isCelsius]);

  useEffect(() => {  // Get user location
    if (navigator.geolocation) {  // Check if geolocation is supported
      // Request user location
      navigator.geolocation.getCurrentPosition(position => {  // User allowed access
        // IMPORTANT: Store value in variable and pass it to search function, instead of cityName (state hasn't updated yet)
        const coords = `${position.coords.latitude},${position.coords.longitude}`;
        setCityName(coords);
        search(coords);
      },
        err => {
          // User denied access or another error occured
          console.log(err);
      }
      )
    } else {
      // Geolocation is not supported
      console.log("Geolocation is not supported in this browser");
    }
  }, [])

  const memoizedContextValue = useMemo(
    () => ({
      weatherData,
      errorMessage,
      setErrorMessage,
      isCelsius,
      setIsCelsius,
    }),
    [weatherData,
      errorMessage,
      setErrorMessage,
      isCelsius,
      setIsCelsius,
      ]
  );

  return (
    <AppContext.Provider value={memoizedContextValue}>
      <SearchBar search={search} cityName={cityName} setCityName={setCityName} />
      {weatherData && !errorMessage && <WeatherContainer />}
    </AppContext.Provider>
  )
}
