import { useCallback, useEffect, useState } from "react";

const center = [39.7072, -98.1736];
const zoom = 3;

function DisplayPosition({ map }) {
  const [position, setPosition] = useState(() => map.getCenter());

  const onMove = useCallback(() => {
    setPosition(map.getCenter());
  }, [map]);

  useEffect(() => {
    map.on("move", onMove);
    return () => {
      map.off("move", onMove);
    };
  }, [map, onMove]);

  return null;
}

export default DisplayPosition;
