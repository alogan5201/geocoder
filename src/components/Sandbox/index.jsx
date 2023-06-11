import { useEffect } from "react";
import Wrapper from "./Wrapper";
import UseObjectState from "./UseObjectState";
import WhatChanged from "./WhatChanged";
import useStore from "store/mapStore";
import BasicList from "./BasicList";
import PassingFunction from "./PassingFunction";
import ConditionalCss from "./ConditionalCss";
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
  const testData = useStore((state) => state.testData);
  useEffect(() => {}, [allObjects]);
  return (
    <div>
      <Wrapper
        children={<ConditionalCss />}
        name="Conditional Css"
      />
      <Wrapper
        children={<WhatChanged data={testData ? testData : null} />}
        name="What Changed"
      />
      <Wrapper
        children={<BasicList data={allObjects ? allObjects : null} />}
        name="Zustand State"
      />
      <Controls />
    </div>
  );
}
export default Sandbox;
