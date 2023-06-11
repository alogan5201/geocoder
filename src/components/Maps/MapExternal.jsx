import PopupMarker from "components/PopupMarker";
import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer,useMap, useMapEvents } from "react-leaflet";
import "react-tabs/style/react-tabs.css";
import { useCss } from "react-use";
import useStore from "store/mapStore";
import LocationButton from "./LocationButton";
import styles from "./custom-marker-and-popup.module.css";

const center = [37.09024, -95.712891];

const MyMarkers = () => {
  const markerData = useStore((state) => state.markerData);
  const [markerPoints, setMarkerPoints] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [currentCoords, setCurrentCoords] = useState(null);
  useEffect(() => {
    if (markerData) {
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
        />
      ))
    : null;
};

const PointMarker = ({ center, content, openPopup }) => {
  const [position, setPosition] = useState(null);
  const [popupOpened, setPopupOpened] = useState(false);
  const [popupVisible, setPopupVisible] = useState("hidden");
  const [rendered,setRendered] = useState(false)
  const [containerHeight,setContainerHeight] = useState(null)
    const [popupIsActive, setPopupIsActive] = useState(false);
useEffect(() => {
  console.log(popupIsActive)
}, [popupIsActive]);

    const map = useMap();

const togglePopup = (open,markerRef) => {
if(open){
  markerRef.current.closePopup()
markerRef.current.openPopup()
}
else {
  markerRef.current.openPopup()

}
}
  const markerRef = useRef(null);
  useEffect(() => {
    if (openPopup) {
      let open = markerRef.current.isPopupOpen();
        setPopupIsActive(false)
        map.flyTo(center, 13, {
          animate: true,
          duration: 0.8,
          easeLinearity: 0.5
        });
        togglePopup(open,markerRef)
        setTimeout(() => {
        

              const popupHeight = markerRef.current._popup._container.clientHeight;
              console.log(popupHeight / 2)
      var px = map.project(markerRef.current._popup._latlng); // find the pixel location on the map where the popup anchor is
      px.y -= markerRef.current._popup._container.clientHeight / 2; // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
      map.panTo(map.unproject(px), { animate: true });
   
  
          }, 1000); 
    }
  }, [map, center, openPopup,rendered]);


  return (
    <Marker ref={markerRef} position={center}>
      <Popup
        minWidth={300}
        position={position}
        keepInView={true}
        autoPan={true}
      >
        <PopupMarker content={content} />
      </Popup>
    </Marker>
  );
};

const MapExternal = () => {
  const [selected, setSelected] = useState();
  const [map, setMap] = useState(null);

  return (
    <>
      <MapContainer
        whenCreated={setMap}
        center={center}
        zoom={3}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url={`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`}
        />
        <MyMarkers />
        {/* <LocationButton map={map} /> */}
      </MapContainer>
    </>
  );
};
export default MapExternal;
