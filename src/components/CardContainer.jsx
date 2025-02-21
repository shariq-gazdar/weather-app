import React from "react";
import DailyCards from "./DailyCards";
import HourlyCards from "./HourlyCard";
import { useBasicContext } from "../context/BasicContextProvider";

function CardContainer() {
  const { apiResult, forecastResult } = useBasicContext();
  return (
    <div className="flex px-10 gap-x-10 flex-wrap lg:flex-nowrap items-center justify-center ">
      {apiResult && <DailyCards />}
      {forecastResult && <HourlyCards />}
    </div>
  );
}

export default CardContainer;
