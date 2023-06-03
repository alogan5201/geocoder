import { useEffect } from "react";
import Wrapper from './Wrapper'
import UseObjectState from './UseObjectState'
import WhatChanged from "./WhatChanged";
function Sandbox() {
  return (
    <div>
        <WhatChanged/>
   <Wrapper children={<UseObjectState/>} />

    </div>
  )
}
export default Sandbox;