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

function Sandbox() {
  const allObjects = useStore((state) => state);
  const testData = useStore((state) => state.testData);
  useEffect(() => {}, [allObjects]);
  return (
    <div>
      <GpsFixedIcon/>

 {/*      <Wrapper
        children={<WhatChanged data={testData ? testData : null} />}
        name="What Changed"
      />
      <Wrapper
        children={<BasicList data={allObjects ? allObjects : null} />}
        name="Zustand State"
      />
      <Controls /> */}
    </div>
  );
}
export default Sandbox;
