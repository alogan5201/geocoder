//import  { useEffect, useState } from 'react';
import L from 'leaflet';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'react-tabs/style/react-tabs.css';
import LocationButton from './components/LocationButton';
import Markers from './components/Markers';

const center = [37.09024, -95.712891];
function MapPlaceholder() {
  return (
    <p>
      Map of London. <noscript>You need to enable JavaScript to see this map.</noscript>
    </p>
  );
}

const MapExternal = ({ setMapLoaded}) => {


  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
  });

  return (
    <>
      <MapContainer
        whenReady={setMapLoaded}
        center={center}
        zoom={3}
        scrollWheelZoom={false}
        zoomControl={false}
        id="map"
        attributionControl={false}
        placeholder={<MapPlaceholder />}
      >
        <TileLayer attribution="" url={`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`} />
        <Markers L={L} />
        <LocationButton L={L} />
      </MapContainer>
    </>
  );
};

export default MapExternal;
