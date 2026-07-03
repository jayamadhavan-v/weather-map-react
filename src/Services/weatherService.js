import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const getCoordinatesByCity = async (city) => {
  const response = await axios.get(
    "https://api.openweathermap.org/geo/1.0/direct",
    {
      params: {
        q: city,
        limit: 1,
        appid: API_KEY,
      },
    },
  );
  // console.log(response.data);
  return response.data;
};

export const getCurrentWeather = async (lat, lon) => {
  const response = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: "metric", // Optional: "metric", "imperial", or omit for Kelvin
      },
    },
  );
  console.log("bhbhvshv")
  console.log(response.data);
  return response.data;
};

