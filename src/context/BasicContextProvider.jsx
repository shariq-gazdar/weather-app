import { createContext, useContext, useEffect, useState } from "react";

const BasicContext = createContext();

export const BasicContextProvider = ({ children }) => {
  const [location, setLocation] = useState("Karachi");
  const [apiResult, setApiResult] = useState([]);
  const [forecastResult, setForecastResult] = useState([]);
  const [unit, setUnit] = useState(
    JSON.parse(localStorage.getItem("toggleState") || "false")
  );

  // Sync unit state with localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setUnit(JSON.parse(localStorage.getItem("toggleState") || "false"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const getTodayApi = async () => {
    console.log(unit);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=c8e77e1e6edfb7759c591aaa808dc0ed&units=${
          unit ? "imperial " : "metric"
        }`
      );
      const json = await response.json();
      setApiResult(json);
    } catch (err) {
      alert(err.message);
    }
  };
  const getForecastApi = async () => {
    console.log(unit);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=c8e77e1e6edfb7759c591aaa808dc0ed&units=${
          unit ? "imperial " : "metric"
        }`
      );
      const json = await response.json();
      setForecastResult(json);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    getTodayApi();
    getForecastApi();
  }, [location, unit]); // Depend on unit (not toggleState)

  return (
    <BasicContext.Provider
      value={{
        location,
        setLocation,
        apiResult,
        getTodayApi,
        setUnit,
        unit,
        forecastResult,
      }}
    >
      {children}
    </BasicContext.Provider>
  );
};

export const useBasicContext = () => useContext(BasicContext);
