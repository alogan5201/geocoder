import L from "leaflet";
import { useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "react-tabs/style/react-tabs.css";
import useStore from 'store/mapStore';
import LocationButton from "./components/LocationButton";
import Markers from "./components/Markers";

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
  useEffect(() => {
    import('leaflet/dist/leaflet.css');
  }, []);
  return (
    <>
      <MapContainer whenReady={setMap} center={center} zoom={3} scrollWheelZoom={true} zoomControl={false}>
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
