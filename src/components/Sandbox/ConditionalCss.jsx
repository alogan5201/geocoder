import React, { useState } from "react";

const ConditionalCss = () => {
  const [popupIsActive, setPopupIsActive] = useState(false);

  const activeStyles = {
    backgroundColor: "blue",
    color: "white",
  };

  const inactiveStyles = {
    backgroundColor: "white",
    color: "black",
  };

  return (
    <div>
      <button onClick={() => setPopupIsActive(!popupIsActive)}>Toggle Active State</button>
      <div style={popupIsActive ? activeStyles : inactiveStyles}>
        This text changes color based on state.
      </div>
    </div>
  );
};

export default ConditionalCss;
