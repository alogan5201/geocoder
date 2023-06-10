import { useEffect, useRef, useState } from "react";
import { MapContainer, useMap, TileLayer, Marker, Popup,useMapEvents } from "react-leaflet";
import "react-tabs/style/react-tabs.css";
import { useGlobalGeoData } from "util/mapState";
import DisplayPosition from "./DisplayPosition";
import tileLayer from "util/tileLayer";
import styles from "./custom-marker-and-popup.module.css";
import LocationButton from "./LocationButton";
import useStore from "store/mapStore";
import { extractWords, test, tron } from "util/helpers";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import PopupMarker from "components/PopupMarker";
const center = [37.09024, -95.712891];

const points = [
  {
    id: "1",
    lat: 0,
    lng: 0,
    title: "Marker 1",
  },
];

const MyMarkers = () => {
  const markerData = useStore((state) => state.markerData);
  const [markerPoints, setMarkerPoints] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  useEffect(() => {
    if (markerData) {
      setMarkerPoints(markerData);
      setPopupOpen(true);
    }
  }, [markerData]);

  return markerPoints && markerPoints.length > 0
    ? markerPoints.map((item, index) => (
        <PointMarker
          key={index}
          content={index}
          center={{ lat: item.lat, lng: item.lng }}
          openPopup={popupOpen}
        />
      ))
    : null;
};

const PointMarker = ({ center, content, openPopup }) => {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      popupopen(e) {
       // setPosition(e.target._popup._latlng);
          var px = map.project(e.target._popup._latlng);
          // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
          px.y -= e.target._popup._container.clientHeight / 2;
          map.panTo(map.unproject(px), { animate: true });
        },
    });
  const markerRef = useRef(null);

  useEffect(() => {
    if (openPopup) {
      let open = markerRef.current.isPopupOpen();

      if (open) {
        markerRef.current.closePopup();
      }
      // {"lat": 33.748992, "lng": -84.390264}
      //  map.fitBounds([[lat, lon]], { padding: [50, 50], maxZoom: 13 });
      //  map.fitBounds([[center.lat, center.lng]], { padding: [50, 50], maxZoom: 13 });
      console.log(center);
      map.fitBounds([[center.lat, center.lng]], { padding: [50, 50], maxZoom: 13 });
      markerRef.current.openPopup();
    }
  }, [map, center, openPopup]);

  return (
    <Marker ref={markerRef} position={center}>
      <Popup className={styles.newPopup} minWidth={300} position={position}>
        <PopupMarker content={content} />
      </Popup>
    </Marker>
  );
};

const MapExternal = () => {
  const [selected, setSelected] = useState();
  const [map, setMap] = useState(null);

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

        <MyMarkers />
        <LocationButton map={map} />
      </MapContainer>
    </>
  );
};

export default MapExternal;
