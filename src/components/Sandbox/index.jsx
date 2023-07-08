import { useEffect } from "react";
import Wrapper from "./Wrapper";
import UseObjectState from "./UseObjectState";
import WhatChanged from "./WhatChanged";
import useStore from "store/mapStore";
import BasicList from "./BasicList";
import PassingFunction from "./PassingFunction";
import ConditionalCss from "./ConditionalCss";
import LocalStorage from "./LocalStorage";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import BasicTransition from "./BasicTransition";
import PopupMarker from './PopupMarker'
import TestBookmarkTable from "./TestBookmarkTable";
import ReactJson from "react-json-view";
import WeatherCard from "./WeatherCard";
import Stack from "@mui/material/Stack";
import { motion } from "framer-motion";

function Sandbox() {
  const allObjects = useStore((state) => state);
  const testData = useStore((state) => state.testData);
  const weather = {
    origin: {
      address: "Atlanta",
      icon: "assets/images/weather/01.png",
      temp: 71.89,
    },
    destination: {
      address: "Austin",
      icon: "assets/images/weather/03.png",
      temp: 76.84,
    },
  };
  useEffect(() => {}, [allObjects]);
  return (
    <div>
{/*       <Stack direction="row" spacing={15}>
        <div style={{ maxWidth: 120 }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ rotate: 180, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >

          <WeatherCard content={weather} />
          </motion.div>
        </div>
        <div style={{ maxWidth: 120 }}>
          <WeatherCard loading={true} />
        </div>
      </Stack> */}
      <div style={{ fontSize: "14px" }}>
        <ReactJson src={allObjects} />
      </div>

      {/*      <Wrapper
        children={<WhatChanged data={testData ? testData : null} />}
        name="What Changed"
      />
   
      <Controls /> */}
    </div>
  );
}
export default Sandbox;
