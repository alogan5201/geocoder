import { useEffect, useState } from "react";
import { useMap, } from "react-leaflet";

import { useLocation } from "react-router-dom";
import "react-tabs/style/react-tabs.css";
import useStore from "store/mapStore";
import PointMarker from "./PointMarker";

const center = [37.09024, -95.712891];
const Markers = ({ L }) => {
  const map = useMap();
  const markerData = useStore((state) => state.markerData);
  const locationMarkerData = useStore((state) => state.locationMarkerData);
  const [markerPoints, setMarkerPoints] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [currentCoords, setCurrentCoords] = useState(null);
  const { pathname } = useLocation();
  const [customMarker, setCustomMarker] = useState(null);
  const mapZoom = useStore((state) => state.mapZoom);
    const resetMapData = useStore((state) => state.resetMapData);
    const originnMarker = L.divIcon({
      html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="marker"><path fill-opacity="0.25" d="M16 32s1.427-9.585 3.761-12.025c4.595-4.805 8.685-.99 8.685-.99s4.044 3.964-.526 8.743C25.514 30.245 16 32 16 32z"/><path stroke="#fff" fill="#1A73E8" d="M15.938 32S6 17.938 6 11.938C6 .125 15.938 0 15.938 0S26 .125 26 11.875C26 18.062 15.938 32 15.938 32zM16 6a4 4 0 100 8 4 4 0 000-8z"/></svg>`,
      className: "custom-icon",
      iconSize: [30, 30],
      popupAnchor: [0, -10], // changed popup position
    });
    const destinationMarker = L.divIcon({
      html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="marker"><path fill-opacity="0.25" d="M16 32s1.427-9.585 3.761-12.025c4.595-4.805 8.685-.99 8.685-.99s4.044 3.964-.526 8.743C25.514 30.245 16 32 16 32z"/><path stroke="#fff" fill="#f44335" d="M15.938 32S6 17.938 6 11.938C6 .125 15.938 0 15.938 0S26 .125 26 11.875C26 18.062 15.938 32 15.938 32zM16 6a4 4 0 100 8 4 4 0 000-8z"/></svg>`,
      className: "custom-icon",
      iconSize: [30, 30],
      popupAnchor: [0, -10],
    });

  useEffect(() => {
    const markerPointData = markerData ? markerData : locationMarkerData ? locationMarkerData : null;
    if (markerPointData) {
      
      localStorage.setItem("markerData", JSON.stringify(markerPointData));
      setMarkerPoints(markerPointData);
      if (pathname.includes("route-planner") && markerPointData.length > 1) {
        let latOrigin = markerPointData[0].lat;
        let lngOrigin = markerPointData[0].lng;
        let latDestination = markerPointData[1].lat;
        let lngDestination = markerPointData[1].lng;
        map.fitBounds(
          [
            [latOrigin, lngOrigin],
            [latDestination, lngDestination],
          ],
          { padding: [50, 50], maxZoom: 13 }
        );
        setCustomMarker(true)
        setPopupOpen(false);
      } else {
        setPopupOpen(true);
      }
    }
    else if (popupOpen) {
      setPopupOpen(false)
    }
  }, [markerData, pathname,locationMarkerData]);

  

  return markerPoints && markerPoints.length > 1
    ? markerPoints.map((item, index) => (
        <PointMarker
          opacity={0}
          key={index}
          content={index}
          center={{ lat: item.lat, lng: item.lng }}
          openPopup={popupOpen}
          L={L}
          origin= {index === 0 ? true : false}
          destination = {index === 1 ? true : false}
        
        />
      ))
    : markerPoints && markerPoints.length > 0
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
