import L from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "react-tabs/style/react-tabs.css";
import useStore from "store/mapStore";
import LocationButton from "./components/LocationButton";
import Markers from "./components/Markers";
import PolyLineRoute from "./components/PolyLineRoute";
import MapEventsController from "./components/MapEventsController";
import WeatherLegend from "./components/WeatherLegend";
import ExternalState from "./components/ExternalState";
import { shallow } from "zustand/shallow";

const center = [37.09024, -95.712891];

function convertToBoundingBox(points) {
  if (!points || points.length === 0) {
    return null;
  }

  let minLat = points[0][1];
  let maxLat = points[0][1];
  let minLng = points[0][0];
  let maxLng = points[0][0];

  for (let i = 1; i < points.length; i++) {
    const [lng, lat] = points[i];
    minLat = Math.min(minLat, lat);
    maxLat = Math.max(maxLat, lat);
    minLng = Math.min(minLng, lng);
    maxLng = Math.max(maxLng, lng);
  }

  return {
    _southWest: {
      lat: minLat,
      lng: minLng,
    },
    _northEast: {
      lat: maxLat,
      lng: maxLng,
    },
  };
}

const MapWithRoute = () => {
  const [route, setRoute] = useState(null);
  const [editableFG, setEditableFG] = useState(null);
  const [selected, setSelected] = useState();
  const [map, setMap] = useState(null);
  const markerData = useStore((state) => state.markerData);
  const setMapStopped = useStore((state) => state.setMapStopped);
  const mapStopped = useState(false);
  const setRouteData = useStore((state) => state.setRouteData);
  const routeData = useStore((state) => state.routeData);

  const handleMoveEnd = () => {
    setMapStopped(true);
  };

  const handleMoveStart = () => {
    setMapStopped(false);
  };

  const onFeatureGroupReady = (reactFGref) => {
    // store the ref for future access to content
    setEditableFG(reactFGref);
  };

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
