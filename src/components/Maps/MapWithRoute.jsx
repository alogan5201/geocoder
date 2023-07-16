import L from "leaflet";
import { useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "react-tabs/style/react-tabs.css";
import useStore from "store/mapStore";
import ExternalState from "./components/ExternalState";
import LocationButton from "./components/LocationButton";
import Markers from "./components/Markers";
import PolyLineRoute from "./components/PolyLineRoute";
import WeatherLegend from "./components/WeatherLegend";

const center = [37.09024, -95.712891];



const MapWithRoute = () => {
const setMapReady = useStore(state => state.setMapReady);
useEffect(() => {
  import('leaflet/dist/leaflet.css');

}, []);
  const setMap = () => {
    setMapReady(true);
}

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
   <ExternalState/>
        <WeatherLegend L={L}/>
        <PolyLineRoute L={L} />
        <Markers L={L} />
        <LocationButton L={L} />
        {/* <LocationButton L={L} /> */}
      </MapContainer>
    </>
  );
};

export default MapWithRoute;
