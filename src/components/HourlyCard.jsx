import React, { useEffect } from "react";
import { useBasicContext } from "../context/BasicContextProvider";

function HourlyCard() {
  const { forecastResult } = useBasicContext();

  useEffect(() => {
    if (forecastResult) {
      console.log(forecastResult.list);
    }
  }, [forecastResult]);

  if (!forecastResult || !forecastResult.list) {
    return <div className="text-center text-white">Loading...</div>;
  }

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Filter forecasts for today only
  const todayForecast = forecastResult.list.filter((forecast) => {
    const forecastDate = new Date(forecast.dt * 1000)
      .toISOString()
      .split("T")[0];
    return forecastDate === today;
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-4 h-full w-full p-4">
      {todayForecast.map((forecast) => (
        <div
          key={forecast.dt}
          className="rounded-2xl bg-cards-color flex justify-between items-center p-4 shadow-lg flex-1"
        >
          {/* Time */}
          <p className="text-lg font-semibold text-black">
            {new Date(forecast.dt * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>

          {/* Weather Icon */}
          <img
            src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@4x.png`}
            alt="Weather Icon"
            className="w-14"
          />

          {/* Description & Temperature */}
          <div className="text-right">
            <p className="text-sm capitalize text-gray-700">
              {forecast.weather[0].description}
            </p>
            <p className="text-xl font-bold text-black">
              {forecast.main.temp.toFixed(0)}°C
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HourlyCard;
