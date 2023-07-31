import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import useStore from 'store/mapStore';
import { getTimeStamp } from 'util/helpers';
const PolyLineRoute = ({ L }) => {
  const [currentPolyline, setCurrentPolyline] = useState(null);
  const routeData = useStore((state) => state.routeData);
  const map = useMap();
  useEffect(() => {
    if (routeData) {
      const route = routeData.routes[0].geometry.coordinates;
   
       map.eachLayer((layer) => {
         if (layer instanceof L.Polyline) {
           map.removeLayer(layer);
         }
       });
       if (currentPolyline) {
         map.removeLayer(currentPolyline);
       }
    

      const polyline = new L.Polyline(
        route.map((coord) => [coord[1], coord[0]]),
        {
          smoothFactor: 1,
          color: '#44afff',
          opacity: 0.7,
          weight: 5,
        }
      );
      setCurrentPolyline(polyline);
      setTimeout(() => {
        polyline.addTo(map);
      }, 3500);
    }
  }, [routeData, map]);
};

export default PolyLineRoute;
