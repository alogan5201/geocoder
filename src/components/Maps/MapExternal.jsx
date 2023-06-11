import PopupMarker from "components/PopupMarker";
import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer,useMap, useMapEvents } from "react-leaflet";
import "react-tabs/style/react-tabs.css";
import { useCss } from "react-use";
import useStore from "store/mapStore";
import LocationButton from "./LocationButton";
import styles from "./custom-marker-and-popup.module.css";
import L from "leaflet";
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
    const markerRef = useRef(null);
    let open = markerRef && markerRef.current ? markerRef.current.isPopupOpen() : null;

const togglePopup = (open,markerRef) => {
if(open){
  markerRef.current.closePopup()
     let panes = map.getPanes();
     let popupPane = panes["popupPane"].children[0];
 
     L.DomUtil.addClass(popupPane, "map-popup-inactive");
markerRef.current.openPopup()
}
else {
  markerRef.current.openPopup()

}
}

  useEffect(() => {
    if (openPopup) {
        setPopupIsActive(false)
        map.flyTo(center, 13, {
          animate: true,
          duration: 0.8,
          easeLinearity: 0.5
        });
        togglePopup(open, markerRef);
        setPopupIsActive(true);

        setTimeout(() => {
        
if(open){
  if(rendered){
    const popupHeight = markerRef.current._popup._container.clientHeight;
    console.log(popupHeight / 2);
    var px = map.project(markerRef.current._popup._latlng); // find the pixel location on the map where the popup anchor is
    console.log(px.y);
    px.y -= markerRef.current._popup._container.clientHeight / 3; // find the height of the popup container, divide by 2, subtract from the Y axis of marker location

    map.panTo(map.unproject(px), { animate: true, duration: 0.2, easeLinearity: 0.5 });
  }
        
}
  
   
  
          }, rendered ? 1000 : 0); 
          setTimeout(() => {
            if(!rendered){
                
                          const popupHeight = markerRef.current._popup._container.clientHeight;
                          console.log(popupHeight / 2);
                          var px = map.project(markerRef.current._popup._latlng); // find the pixel location on the map where the popup anchor is
                          console.log(px.y);
                          px.y -= markerRef.current._popup._container.clientHeight / 3; // find the height of the popup container, divide by 2, subtract from the Y axis of marker location

                          map.panTo(map.unproject(px), {
                            animate: true,
                            duration: 0.2,
                            easeLinearity: 0.5,
                          });
                             let panes = map.getPanes();
                             let popupPane = panes["popupPane"].children[0];
                             console.log(popupPane);
                             L.DomUtil.removeClass(popupPane, "map-popup-inactive");
            }
               let panes = map.getPanes();
               let popupPane = panes["popupPane"].children[0];
               console.log(popupPane);
               L.DomUtil.removeClass(popupPane, "map-popup-inactive");
             
          }, rendered ? 1300 : 1000);
    }
  setRendered(true);
  }, [map, center, openPopup,rendered]);


  return (
    <Marker ref={markerRef} position={center}>
      <Popup
        minWidth={300}
        position={position}
        keepInView={true}
        autoPan={true}
        className="map-popup-inactive"
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
