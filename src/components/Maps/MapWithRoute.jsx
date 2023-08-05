import L from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'react-tabs/style/react-tabs.css';
import Fly from './components/Fly';
import LocationButton from './components/LocationButton';
import Markers from './components/Markers';
import PolyLineRoute from './components/PolyLineRoute';
import WeatherLegend from './components/WeatherLegend';
const center = [37.09024, -95.712891];
const MapWithRoute = ({ setMapLoaded }) => {
  return (
    <>
      <MapContainer
        whenReady={setMapLoaded}
        center={center}
        zoom={3}
        scrollWheelZoom={true}
        zoomControl={false}
        id="map"
        preferCanvas={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url={`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`}
        />
        {/* <PolyLineRoute L={L} /> <Markers L={L} /> <WeatherLegend L={L} />*/}
        {/* <PolyLineRoute L={L} /> */}
        <Fly />
        <WeatherLegend L={L} />
        <Markers L={L} />
        <PolyLineRoute L={L} />

        <LocationButton L={L} />
      </MapContainer>
    </>
  );
};

export default MapWithRoute;
