import { useEffect } from "react";
import Wrapper from "./Wrapper";
import UseObjectState from "./UseObjectState";
import WhatChanged from "./WhatChanged";
import useStore from "store/mapStore";
import BasicList from "./BasicList";
import PassingFunction from "./PassingFunction";
function BearCounter() {
  const bears = useStore((state) => state.bears);

  return <h1>{bears} bears around here...</h1>;
}

function Controls() {
  const increasePopulation = useStore((state) => state.increasePopulation);
  return <button onClick={increasePopulation}>one up</button>;
}
function Sandbox() {
  const allObjects = useStore((state) => state);
  useEffect(() => {}, [allObjects]);
  return (
    <div>
      <Wrapper
        children={<BasicList data={allObjects ? allObjects : null} />}
        name="Zustand State"
      />
      <Controls />
    </div>
  );
}
export default Sandbox;
