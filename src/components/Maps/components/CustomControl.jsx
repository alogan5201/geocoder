import React, { useEffect, useState } from "react";
import { Polyline, useMapEvent } from "react-leaflet";
import useStore from "store/mapStore";

const CustomControl = ({ L }) => {
  const [polylineCoordinates, setPolylineCoordinates] = useState([]);
    const routeData = useStore((state) => state.routeData);
useEffect(() => {
    if(routeData){
        const newPolyCoords = routeData.routes[0].geometry.coordinates;
        setPolylineCoordinates(newPolyCoords);
    }
}, [routeData]);
  /* 
    {route && (
          <Polyline
            positions={route.map((coord) => [coord[1], coord[0]])}
            color={"#44afff"}
            opacity={0.7}
            weight={5}
          />
        )}
*/
  const map = useMapEvent({
    moveend() {
      let bounds = new L.LatLngBounds();
      let newCoordinates = []; // Dummy new coordinates, replace with real values

      map.eachLayer(function (layer) {
        console.log(layer);
        // You can add conditions here to update newCoordinates based on the layer or other logic
      });

      setPolylineCoordinates(newCoordinates); // Update the state with new coordinates

      if (bounds.isValid()) {
        map.flyToBounds([bounds]);
      }
    },
  });

  useEffect(() => {
    if (polylineCoordinates.length > 0) {
      console.log("Polyline component has been rendered with new coordinates");
    }
  }, [polylineCoordinates]);

  return <Polyline positions={polylineCoordinates} />;
};

export default CustomControl;
