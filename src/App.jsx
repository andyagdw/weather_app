// React
import { useEffect, useState } from "react"
// Components
import SearchBar from "./components/searchbar/SearchBar"
import WeatherContainer from "./components/weatherContainer/WeatherContainer"
// Context
import { AppContext } from "./context/AppContext"
// Utils
import { options } from "./utils/weatherApiOptions"

export default function App() {
  const [cityName, setCityName] = useState("")
  const [weatherData, setWeatherData] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [isCelsius, setIsCelsius] = useState(true)

  const search = async city => {
    try {
      // 'days=3' means get a 3 day forecast including the current day
      const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=3`
      const response = await fetch(url, options)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()

      // Check if all data was sent from API
      if (
        data.location &&
        data.current &&
        data.current.condition &&
        data.forecast &&
        data.forecast.forecastday &&
        data.forecast.forecastday.length === 3 &&
        data.forecast.forecastday[0].hour.length === 24 &&
        data.forecast.forecastday[1].hour.length === 24
      ) {
        setWeatherData(data)
      } else {
        throw new Error("All data was not sent")
      }
    } catch (e) {
      console.error("There was an error", e)
      setErrorMessage(
        "There was an error fetching the data. Please try again later"
      )
    } finally {
      setCityName("")
    }
  }

  useEffect(() => {
    // Check if geolocation is supported
    if (navigator.geolocation) {
      // Request user location
      navigator.geolocation.getCurrentPosition(
        position => {
          // User allowed access
          const coords = `${position.coords.latitude},${position.coords.longitude}`
          setCityName(coords)
          search(coords)
        },
        e => {
          // User denied access or another error occured
          console.error("There was an error", e)
        }
      )
    } else {
      // Geolocation is not supported
      console.log("Geolocation is not supported in this browser")
    }
  }, [])

  const appContext = { weatherData, errorMessage, isCelsius, setIsCelsius }

  return (
    <AppContext value={appContext}>
      <SearchBar
        search={search}
        cityName={cityName}
        setCityName={setCityName}
      />
      {(weatherData && !errorMessage) && <WeatherContainer />}
    </AppContext>
  )
}
