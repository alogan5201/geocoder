import { useEffect, useState } from "react";
import {  useMap,  } from "react-leaflet";

import "react-tabs/style/react-tabs.css";
import useStore from "store/mapStore";
import PointMarker from "./PointMarker";
import { useLocation } from "react-router-dom";
import { marker } from "leaflet";

const center = [37.09024, -95.712891];
const Markers = ({ L }) => {
  const map = useMap();
  const markerData = useStore((state) => state.markerData);
  const [markerPoints, setMarkerPoints] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [currentCoords, setCurrentCoords] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (markerData) {
      localStorage.setItem("markerData", JSON.stringify(markerData));
      setMarkerPoints(markerData);
      if (pathname.includes("route-planner") && markerData.length > 1) {
        let latOrigin = markerData[0].lat;
        let lngOrigin = markerData[0].lng;
        let latDestination = markerData[1].lat;
        let lngDestination = markerData[1].lng;
        map.fitBounds(
          [
            [latOrigin, lngOrigin],
            [latDestination, lngDestination],
          ],
          { padding: [50, 50], maxZoom: 13 }
        );
        setPopupOpen(false);
      } else {
        setPopupOpen(true);
      }
    }
  }, [markerData, pathname]);
  return markerPoints && markerPoints.length > 0
    ? markerPoints.map((item, index) => (
        <PointMarker
          key={index}
          content={index}
          center={{ lat: item.lat, lng: item.lng }}
          openPopup={popupOpen}
          L={L}
      
        />
      ))
    : null;
};
  


export default Markers;
