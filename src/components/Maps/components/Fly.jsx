import { useEffect } from 'react';
import { useMap, useMapEvent } from 'react-leaflet';
import 'react-tabs/style/react-tabs.css';
import useStore from 'store/mapStore';
import { getTimeStamp } from 'util/helpers';

const originCoords = [33.748992, -84.390264];
const destinationCoords = [30.271129, -97.7437];

const Fly = () => {
  const currentMarkers = useStore((state) => state.currentMarkers);
  const markerData = useStore((state) => state.markerData);
  const locationMarkerData = useStore((state) => state.locationMarkerData);
  const map = useMapEvent({
    layeradd() {
      let bounds = new L.LatLngBounds();
      map.eachLayer(function (layer) {
        if (layer instanceof L.Polyline) {
          bounds.extend(layer.getBounds());
        }
      });

      if (bounds.isValid()) {
        map.fitBounds(bounds, {
          padding: [25, 25],
        });
      }
    },
  });
  useEffect(() => {
    if (locationMarkerData) {
      const origin = locationMarkerData[0];

      const oCoords = [origin.lat, origin.lng];

      setTimeout(() => {
        map.flyTo([locationMarkerData[0].lat, locationMarkerData[0].lng], 13, {
          animate: true,
          duration: 0.8,
          easeLinearity: 0.5,
        });
      }, 2700);
    }
  }, [locationMarkerData, map]);
  return null;
};

export default Fly;
