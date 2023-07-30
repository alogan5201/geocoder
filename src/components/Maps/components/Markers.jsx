import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';

import { useLocation } from 'react-router-dom';
import 'react-tabs/style/react-tabs.css';
import useStore from 'store/mapStore';
import PointMarker from './PointMarker';

const Markers = ({ L }) => {
  const map = useMap();
  const markerData = useStore((state) => state.markerData);
  const locationMarkerData = useStore((state) => state.locationMarkerData);
  const [markers, setMarkers] = useState([]);

  const removeMarkers = () => {
    markers.forEach((marker) => {
      map.removeLayer(marker);
    });
    setMarkers([]);
  };

  const createMarker = (data, markerOptions) => {
    const marker = L.marker([data.lat, data.lng]);
    marker.addTo(map);
    return marker;
  };
  const addMarkersToMap = (currentMarkerData) => {
    let newMarkers = [];
    for (let index = 0; index < currentMarkerData.length; index++) {
      const newMarker = currentMarkerData[index];
      if (index === 0) {
        newMarkers.push(createMarker(newMarker));
      } else {
        newMarkers.push(createMarker(newMarker));
      }
    }
    setMarkers(newMarkers);
  };
  useEffect(() => {
    removeMarkers();

    if (locationMarkerData) {
      addMarkersToMap(locationMarkerData);
    } else if (markerData) {
      addMarkersToMap(markerData);
    }
  }, [markerData, locationMarkerData]);

  return null; // No JSX is needed when you're manipulating the map directly
};

export default Markers;
