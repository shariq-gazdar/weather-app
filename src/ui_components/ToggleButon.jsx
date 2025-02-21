import { useState, useEffect } from "react";
import { useBasicContext } from "../context/BasicContextProvider";

const ToggleSwitch = ({ timeBg }) => {
  const [isChecked, setIsChecked] = useState(false);
  const { setUnit } = useBasicContext(); // Get setUnit from context

  useEffect(() => {
    const savedState = localStorage.getItem("toggleState") === "true";
    setIsChecked(savedState);
  }, []);

  const handleToggle = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    localStorage.setItem("toggleState", newState);
    setUnit(newState); // Update unit in context
  };

  return (
    <div className="flex items-center gap-x-2">
      <span
        className={
          timeBg ? "text-3xl text-cards-color" : "text-3xl text-text-color"
        }
      >
        °C
      </span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleToggle}
          className="sr-only peer"
        />
        <div className="w-10 h-5 bg-cards-color rounded-full peer-checked:bg-text-color peer transition-all duration-200"></div>
        <div className="absolute w-2 h-3 bg-white rounded-full shadow-md left-1 top-1 peer-checked:translate-x-6 transition-all duration-200"></div>
      </label>
      <span
        className={
          timeBg ? "text-3xl text-cards-color" : "text-3xl text-text-color"
        }
      >
        °F
      </span>
    </div>
  );
};

export default ToggleSwitch;
