import { useMapEvents, useMap } from "react-leaflet";

function MapEventsController({ onMoveEnd, onMoveStart }) {
  const map = useMap()
  useMapEvents({
    moveend: () => {
      onMoveEnd();
    },
    movestart: () => {
      onMoveStart();
    },
    popupopen: (e) => {
      // popup._container
      // const popupHeight = e.popup._container.clientHeight;

      // var px = map.project(popupLatLng); // find the pixel location on the map where the popup anchor is

      // px.y -= e.popup._container.clientHeight / 3; // find the height of the popup container, divide by 2, subtract from the Y axis of marker location

      // map.panTo(map.unproject(px), { animate: true, duration: 0.2, easeLinearity: 0.5 });
    //   const popupLatLng = e.popup._latlng;
    //  var px = map.project(popupLatLng);
    //  px.y -= e.popup._container.clientHeight / 3;
    //  map.panTo(map.unproject(px), { animate: true, duration: 0.2, easeLinearity: 0.5 });
    }
  });

  return null;
}

export default MapEventsController;
