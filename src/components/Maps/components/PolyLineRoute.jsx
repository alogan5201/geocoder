import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import useStore from "store/mapStore";

const PolyLineRoute = ({ L }) => {
  const [currentPolyline, setCurrentPolyline] = useState(null);
  const routeData = useStore((state) => state.routeData);
  const map = useMap();
  const mapStopped = useStore((state) => state.mapStopped);

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
          color: "#44afff",
          opacity: 0.7,
          weight: 5,
        }
      );
      setCurrentPolyline(polyline);
      setTimeout(() => {
        
        polyline.addTo(map);
      }, 700);
    }
  }, [routeData, map]);
};

export default PolyLineRoute;
