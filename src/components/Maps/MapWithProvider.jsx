import { useEffect } from 'react';
import { MapContainer, useMap } from 'react-leaflet';
import L from 'leaflet';

const MyTileLayer = () => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    var NewTileLayer =  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    map.addLayer(NewTileLayer);

  }, [map]);

  return null;
}

const MapWrapper = () => {
  return (
    <MapContainer
      center={[37.090240,-95.712891]}
      zoom={3}
      scrollWheelZoom={false}
    >

      <MyTileLayer />
    </MapContainer>
  )
}

export default MapWrapper;