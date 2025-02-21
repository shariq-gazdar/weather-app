import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Test from "./Test";
import { BasicContextProvider } from "./context/BasicContextProvider";
import CardContainer from "./components/CardContainer";
// import {} from "./context/BasicContextProvider";
import Search from "./components/Search";
import ToggleSwitch from "./ui_components/ToggleButon";
function App() {
  const [timeBg, setTimeBg] = useState(null);
  let time = new Date().getHours();
  useEffect(() => {
    if (time <= 18) {
      setTimeBg(false);
    } else {
      setTimeBg(true);
    }
  }, [time]);

  return (
    <BasicContextProvider>
      <div
        className={
          timeBg
            ? "bg-bg-night h-auto  min-h-screen font-[staatliches] text-text-color"
            : "bg-bg-day h-auto min-h-screen font-[staatliches] text-text-color"
        }
      >
        <Search time={timeBg} />

        <CardContainer />
      </div>
    </BasicContextProvider>
  );
}

export default App;
