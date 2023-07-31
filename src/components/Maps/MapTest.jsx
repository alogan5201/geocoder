import { TileLayer, MapContainer, useMap } from 'react-leaflet';
import PixiOverlay from 'react-leaflet-pixi-overlay';
import { renderToString } from 'react-dom/server';
import {useEffect} from 'react'
     const originCoords = [33.748992, -84.390264];
     const destinationCoords = [30.271129, -97.7437];
const Fly = () => {
    const map = useMap();
useEffect(() => {
  setTimeout(() => {
    // 33.748992 -84.390264 30.271129 -97.7437
    let centerLat = (originCoords[0] + destinationCoords[0]) / 2;
    let centerLng = (originCoords[1] + destinationCoords[1]) / 2;
    map.flyToBounds(
      [
        [originCoords[0], originCoords[1]],
        [destinationCoords[0], destinationCoords[1]],
      ],
      { padding: [50, 50], maxZoom: 13, easeLinearity: 1 }
    );
  }, 2000);
}, []);
}
const MapTest = () => {


  const markers = [
    {
      id: 'randomStringOrNumber',
      iconColor: 'red',
      position: [originCoords[0], originCoords[1]],
      popup: renderToString(<div>All good!</div>),
      onClick: () => alert('marker clicked'),
      tooltip: 'Hey!',
    },
    {
      id: '2',
      iconColor: 'blue',
      position: [destinationCoords[0], destinationCoords[1]],
      popup: 'Quack!',
      popupOpen: true, // if popup has to be open by default
      onClick: () => alert('marker clicked'),
      tooltip: 'Nice!',
    },
  ];

    return (
      <MapContainer
        id="mapTest"
        zoom={18} // initial zoom required
        preferCanvas
        maxZoom={20} // required
        minZoom={3} // required
        center={[-37.814, 144.96332]}
        // Other map props...
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <PixiOverlay markers={markers} />
        <Fly />
      </MapContainer>
    );
};

export default MapTest