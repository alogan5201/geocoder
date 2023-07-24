import L from "leaflet";
import { useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "react-tabs/style/react-tabs.css";
import useStore from 'store/mapStore';
import LocationButton from "./components/LocationButton";
import Markers from "./components/Markers";
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
const center = [37.09024, -95.712891];

const MapExternal = ({ setMapLoaded }) => {

  const setMapReady = useStore((state) => state.setMapReady);
  const setMap = () => {
    setMapReady(true);
    if (setMapLoaded) {
    setMapLoaded(true);  
    }
  //setMapLoaded(true); // pass the state up to the parent
  };
  // This is a fix that is needed for the marker to load properly in production
  // it's an issue that only applies to the react-leaftelet library
  delete L.Icon.Default.prototype._getIconUrl;


  L.Icon.Default.mergeOptions({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
  });
  return (
    <>
      <MapContainer whenReady={setMap} center={center} zoom={3} scrollWheelZoom={false} zoomControl={false} id="map">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url={`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`}
        />
        <Markers L={L} />
        <LocationButton L={L} />
        {/* <LocationButton L={L} /> */}
      </MapContainer>
    </>
  );
};

export default MapExternal;
