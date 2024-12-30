// Options for WeatherAPI.com
export const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": import.meta.env.VITE_WEATHER_API_KEY,
    "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
  },
};
