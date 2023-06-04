import { useEffect } from "react";
import Wrapper from './Wrapper'
import UseObjectState from './UseObjectState'
import WhatChanged from "./WhatChanged";
import useStore from "store/mapStore"
function BearCounter() {
  const bears = useStore((state) => state.bears)
  return <h1>{bears} bears around here...</h1>
}

function Controls() {
  const increasePopulation = useStore((state) => state.increasePopulation)
  return <button onClick={increasePopulation}>one up</button>
}
function Sandbox() {
  return (
    <div>
        {/* <WhatChanged/>
   <Wrapper children={<UseObjectState/>} /> */}
<BearCounter />
<Controls />
    </div>
  )
}
export default Sandbox;