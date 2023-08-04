import  { useEffect, useState } from 'react';
import L from 'leaflet';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'react-tabs/style/react-tabs.css';
import useStore from 'store/mapStore';
import LocationButton from './components/LocationButton';
import Markers from './components/Markers';

const center = [37.09024, -95.712891];

const MapExternal = ({ setMapLoaded }) => {
  const [documentReady, setDocumentReady] = useState(false);
  const setMapReady = useStore((state) => state.setMapReady);

  useEffect(() => {
    if (document.readyState === 'complete') {
      setDocumentReady(true);
    } else {
      const handleLoad = () => setDocumentReady(true);
      window.addEventListener('load', handleLoad);

      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  const setMap = () => {
    setMapReady(true);
    if (setMapLoaded) {
      setTimeout(() => {
        setMapLoaded(true);
      }, 5000);
    }
  };

  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
  });

  return (
    <>
      {documentReady && (
        <MapContainer whenReady={setMap} center={center} zoom={3} scrollWheelZoom={false} zoomControl={false} id="map">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url={`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`}
          />
          <Markers L={L} />
          <LocationButton L={L} />
        </MapContainer>
      )}
    </>
  );
};

export default MapExternal;
