import L from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import "react-tabs/style/react-tabs.css";
import useStore from "store/mapStore";
import Fly from "./components/Fly";
import LocationButton from "./components/LocationButton";
import Markers from "./components/Markers";
import PolyLineRoute from "./components/PolyLineRoute";
import WeatherLegend from "./components/WeatherLegend";
const center = [37.09024, -95.712891];
const MapWithRoute = ({ setMapLoaded }) => {
  const markers = [
    {
      id: 'randomStringOrNumber',
      iconColor: 'red',
      position: [33.748992, -84.390264],
 
      onClick: () => console.log('marker clicked'),
      tooltip: 'Hey!',
    },
    {
      id: '2',
      iconColor: 'blue',
      position: [30.271129, -97.7437],
      popupOpen: false, // if popup has to be open by default
      onClick: () => console.log('marker clicked'),
      tooltip: 'Nice!',
    },
  ];

  const setMapReady = useStore((state) => state.setMapReady);
  const setMap = () => {
    setMapReady(true);
    if (setMapLoaded) {
      setMapLoaded(true);
    }
    //setMapLoaded(true); // pass the state up to the parent
  };


  return (
    <>
      <MapContainer
        whenReady={setMap}
        center={center}
        zoom={3}
        scrollWheelZoom={false}
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
