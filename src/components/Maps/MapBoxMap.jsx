import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import { useMap } from "hooks/mapBoxHooks";

const { VITE_USERNAME, VITE_STYLE_ID, VITE_ACCESS_TOKEN } = import.meta.env;

const MapBoxMap = () => {
  const { position } = useMap();
  return (
    <MapContainer
      center={position}
      zoom={4.5}
      scrollWheelZoom={true}
      projection='globe'
    >
      <TileLayer
        attribution='Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        url={`https://api.mapbox.com/styles/v1/${VITE_USERNAME}/${VITE_STYLE_ID}/tiles/256/{z}/{x}/{y}@2x?access_token=${VITE_ACCESS_TOKEN}`}
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapBoxMap;
