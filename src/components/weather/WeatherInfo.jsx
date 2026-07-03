import React from "react";
import { motion } from "framer-motion";
import useWeatherStore from "../../store/useWeatherStore";

const WeatherInfo = () => {
  const { currentWeather } = useWeatherStore();

  if (!currentWeather) return null;

  const weather = currentWeather.weather[0];
  const main = currentWeather.main;
  const wind = currentWeather.wind;
  const sys = currentWeather.sys;
  const coord = currentWeather.coord;

  const weatherIcon = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

  // Convert UNIX Timestamp to Local Time
  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Convert Wind Degree to Direction
  const getWindDirection = (deg) => {
    const directions = [
      "N",
      "NE",
      "E",
      "SE",
      "S",
      "SW",
      "W",
      "NW",
    ];

    return directions[Math.round(deg / 45) % 8];
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="absolute top-4 right-5 z-[1000]
      w-96 rounded-2xl
      bg-white/20 backdrop-blur-md
      border border-white/30
      shadow-2xl
      text-white
      p-4"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">
            📍 {currentWeather.name}, {sys.country}
          </h2>

          <p className="capitalize text-gray-200">
            {weather.description}
          </p>
        </div>

        <img
          src={weatherIcon}
          alt={weather.description}
          className="w-20 h-20"
        />
      </div>

      {/* Temperature */}
      <div className="text-center mt-5">
        <h1 className="text-6xl font-bold">
          {Math.round(main.temp)}°
        </h1>

        <p className="text-lg text-gray-200 mt-2">
          Feels Like {Math.round(main.feels_like)}°C
        </p>
      </div>

      <hr className="my-5 border-white/20" />

      {/* Weather Details */}
      <div className="grid grid-cols-2 gap-4 text-sm">

        <InfoCard
          title="💧 Humidity"
          value={`${main.humidity}%`}
        />

        <InfoCard
          title="🌬 Wind"
          value={`${wind.speed} m/s`}
        />

        <InfoCard
          title="🧭 Direction"
          value={getWindDirection(wind.deg)}
        />

        <InfoCard
          title="📈 Pressure"
          value={`${main.pressure} hPa`}
        />

        <InfoCard
          title="👀 Visibility"
          value={`${currentWeather.visibility / 1000} km`}
        />

        <InfoCard
          title="🔺 Max Temp"
          value={`${Math.round(main.temp_max)}°C`}
        />

        <InfoCard
          title="🔻 Min Temp"
          value={`${Math.round(main.temp_min)}°C`}
        />

        <InfoCard
          title="🌡 Feels Like"
          value={`${Math.round(main.feels_like)}°C`}
        />

        <InfoCard
          title="🌅 Sunrise"
          value={formatTime(sys.sunrise)}
        />

        <InfoCard
          title="🌇 Sunset"
          value={formatTime(sys.sunset)}
        />

        <InfoCard
          title="📍 Latitude"
          value={coord.lat.toFixed(2)}
        />

        <InfoCard
          title="📍 Longitude"
          value={coord.lon.toFixed(2)}
        />

        <InfoCard
          title="🕒 Updated"
          value={formatTime(currentWeather.dt)}
        />

      </div>
    </motion.div>
  );
};

const InfoCard = ({ title, value }) => (
  <div className="bg-white/10 rounded-xl p-3">
    <p className="text-gray-300 text-xs">{title}</p>

    <h3 className="font-semibold text-lg">
      {value}
    </h3>
  </div>
);

export default WeatherInfo;