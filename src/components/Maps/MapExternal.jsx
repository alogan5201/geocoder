import { useEffect,  useRef, useState } from 'react';
import { MapContainer, useMap, TileLayer, Marker, Popup } from "react-leaflet";
import "react-tabs/style/react-tabs.css";
import { useGlobalGeoData } from "util/mapState";
import DisplayPosition from './DisplayPosition';
import tileLayer from 'util/tileLayer'
import styles from "./controlling-the-map-from-outside-the-map.module.css";
import LocationButton from './LocationButton';
import useStore from "store/mapStore";
import { extractWords, test,tron} from "util/helpers";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import PopupMarker from 'components/PopupMarker';
const center = [37.090240, -95.712891];

const points = [
  {
    id: "1",
    lat: 0,
    lng: 0,
    title: "Marker 1",
  }
];


const MyMarkers = () => {
  const markerData = useStore((state) => state.markerData);
  const [markerPoints, setMarkerPoints] = useState(null)
  const [popupOpen, setPopupOpen] = useState(false);
  useEffect(() => {
    if(markerData){
   
    // tron.log(markerData)
/*     [
      {
        "id": "1",
        "lat": 33.748992,
        "lng": -84.390264,
        "title": "Atlanta, Georgia, United States",
        "dms": {
          "lat": {
            "degrees": 33,
            "minutes": 44,
            "seconds": 56.3712,
            "lat": 33.748992,
            "display": "33° 44' 56.3712''"
          },
          "lng": {
            "degrees": 84,
            "minutes": 23,
            "seconds": 24.9504,
            "lng": 84.390264,
            "display": "84° 23' 24.9504'' 84.390264"
          }
        }
      }
    ] */
 setMarkerPoints(markerData)
 setPopupOpen(true)
    }
  }, [markerData]);

  return markerPoints && markerPoints.length > 0 ?  markerPoints.map((item, index) => (
    <PointMarker
      key={index}
      content={index}
      center={{ lat: item.lat, lng: item.lng }}
      openPopup={popupOpen}
    />
  )) : null
};

const PointMarker = ({ center, content, openPopup }) => {
  const map = useMap();
  const markerRef = useRef(null);

  useEffect(() => {
    if (openPopup) {

  
     map.fitBounds([center])
     //map.flyToBounds([center],{ maxZoom: 13});
      setTimeout(() => {
        markerRef.current.openPopup();
        
      }, 500);
  
    }
    
  }, [map, center, openPopup]);

  return (
    <Marker ref={markerRef} position={center}>
      <Popup>
<PopupMarker content={content}/>
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
        <LocationButton map={map} />
      </MapContainer>

    </>
  );
};

export default MapExternal;