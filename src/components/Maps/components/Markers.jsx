import { useEffect, useState } from "react";
import "react-tabs/style/react-tabs.css";
import useStore from "store/mapStore";
import PointMarker from "./PointMarker";
const center = [37.09024, -95.712891];
const Markers = ({ L }) => {
  const markerData = useStore((state) => state.markerData);
  const [markerPoints, setMarkerPoints] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [currentCoords, setCurrentCoords] = useState(null);
  
  useEffect(() => {
    if (markerData) {
      localStorage.setItem("markerData", JSON.stringify(markerData))
      setMarkerPoints(markerData);
      setPopupOpen(true);
    }
    
  }, [markerData]);
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
