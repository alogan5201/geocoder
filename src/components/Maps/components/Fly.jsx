import { useEffect } from 'react';
import { useMap} from 'react-leaflet';
import 'react-tabs/style/react-tabs.css';
import useStore from 'store/mapStore';
import { getTimeStamp } from 'util/helpers';

const originCoords = [33.748992, -84.390264];
const destinationCoords = [30.271129, -97.7437];

const Fly = () => {
  const map = useMap();
  const currentMarkers = useStore((state) => state.currentMarkers);
  const markerData = useStore((state) => state.markerData);

  useEffect(() => {
    if (markerData) {
      console.log(markerData);
      const origin = markerData[0];
      const destination = markerData[1];
      console.log([origin.lat, origin.lng]);
      console.log([destination.lat, destination.lng]);
      const a = true;
      const oCoords = a ? [origin.lat, origin.lng] : originCoords;
      const dCoords = a ? [destination.lat, destination.lng] : destinationCoords;
      setTimeout(() => {
            console.log('map fly to', getTimeStamp());

   map.flyToBounds([oCoords, dCoords], {
     padding: [50, 50],
     maxZoom: 13,
   });
}, 1700);
  
    }
  }, [markerData,map]);
  return null;
};

export default Fly;
