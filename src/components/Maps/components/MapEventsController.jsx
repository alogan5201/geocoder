import { useMapEvents } from "react-leaflet";

function MapEventsController({ onMoveEnd, onMoveStart }) {
  useMapEvents({
    moveend: () => {
      onMoveEnd();
    },
    movestart: () => {
      onMoveStart();
    },
    popupopen: () => {
      
    }
  });

  return null;
}

export default MapEventsController;
