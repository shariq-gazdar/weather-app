import React, { useContext, useEffect, useState } from "react";
import { useBasicContext } from "../context/BasicContextProvider";
import { motion } from "framer-motion";
import searchIcon from "../assets/search.png";

import ToggleButton from "../ui_components/ToggleButon";
function Search({ timeBg }) {
  //   const { setLocation } = useBasicContext();
  const { apiResult, setLocation } = useBasicContext();
  const [search, setSearch] = useState("Karachi");
  useEffect(() => {
    // console.log(apiResult);
  });
  return (
    <div className="flex justify-between py-10 px-5 flex-wrap">
      <div
        className={
          timeBg ? "text-text-color text-3xl" : "text-cards-color text-3xl"
        }
      >
        Shariq's App
      </div>
      <div className="relative">
        <motion.input
          type="text"
          name="Location"
          id=""
          className="bg-cards-color px-5 py-1 w-96 rounded-[40px] outline-0 focus:ring-text-color focus:ring-1 "
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
          whileHover={{
            scale: 1.05,
          }}
        />
        <motion.img
          src={searchIcon}
          alt="search"
          className="w-6 ml-3 absolute right-2 top-1"
          onClick={() => {
            if (search && search.length > 0) {
              setLocation(search);
              setSearch("");
            }
          }}
          whileHover={{
            scale: 1.1,
          }}
        />
      </div>
      <ToggleButton timeBg={timeBg} />
    </div>
  );
}

export default Search;
