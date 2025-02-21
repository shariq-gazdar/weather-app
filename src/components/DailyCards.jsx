import React, { useEffect } from "react";
import { useBasicContext } from "../context/BasicContextProvider";
import wind from "../assets/wind.png";
import eye from "../assets/visibility.png";
import sunrise from "../assets/sunRise.png";
import sunset from "../assets/sunset.png";

function DailyCards() {
  const { apiResult, unit } = useBasicContext();

  let visibility = apiResult?.visibility;
  if (visibility && visibility > 1000) {
    visibility = `${visibility / 1000} Km`;
  }

  if (!apiResult || !apiResult.weather || !apiResult.sys) {
    return <div className="text-center text-white">Loading...</div>;
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="bg-cards-color rounded-[30px] w-72 h-auto p-4 flex flex-col justify-between relative shadow-lg mt-4">
      {/* Location & Date */}
      <div className="flex justify-between items-center px-2">
        <div className="text-black text-lg font-bold leading-tight">
          {apiResult.name}, {apiResult.sys.country}
          <span className="text-text-color text-xs block">
            {new Date(apiResult.dt * 1000).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <img
            src={`https://openweathermap.org/img/wn/${apiResult.weather[0].icon}@2x.png`}
            alt="Weather Icon"
            className="w-16 "
          />
          <div className="text-text-color text-xs">
            {apiResult.weather[0].description}
          </div>
        </div>
      </div>

      {/* Temperature */}
      <div className="flex justify-center items-center gap-2 -mt-2">
        <h1 className="text-5xl font-bold">{apiResult.main.temp.toFixed(0)}</h1>
        <span className="text-2xl">{unit ? "°F" : "°C"}</span>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-2 gap-y-3 mt-2 px-2">
        <div className="flex items-center gap-1">
          <img src={wind} alt="Wind Speed" className="w-5 h-5" />
          <span className="text-black text-base">
            {apiResult.wind.speed} {unit ? "m/s" : "mile/hour"}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <img src={eye} alt="Visibility" className="w-5 h-5" />
          <span className="text-black text-base">{visibility}</span>
        </div>
        <div className="flex items-center gap-1">
          <img src={sunrise} alt="Sunrise" className="w-5 h-5" />
          <span className="text-black text-base">
            {formatTime(apiResult.sys.sunrise)}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <img src={sunset} alt="Sunset" className="w-5 h-5" />
          <span className="text-black text-base">
            {formatTime(apiResult.sys.sunset)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default DailyCards;
