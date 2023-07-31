import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import { useLocation } from 'react-router-dom';
import 'react-tabs/style/react-tabs.css';
import useStore from 'store/mapStore';
import PointMarker from './PointMarker';
import { getTimeStamp } from 'util/helpers';

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

  const createMarkers = (dataArray, markerOptionsArray) => {
    
    return dataArray.map((data, index) => {
      const marker = markerOptionsArray[index]
        ? L.marker([data.lat, data.lng], markerOptionsArray[index])
        : L.marker([data.lat, data.lng]);
          console.log('one marker added', getTimeStamp());

      marker.addTo(map);
      return marker;
    });
  };

  const addMarkersToMap = (currentMarkerData) => {
    let newMarkers = [];
    let markerOptionsArray = [];
    for (let index = 0; index < currentMarkerData.length; index++) {
      const newMarker = currentMarkerData[index];
      if (index === 0) {
        const markerOptions = {
          icon: L.divIcon({
            html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="marker"><path fill-opacity="0.25" d="M16 32s1.427-9.585 3.761-12.025c4.595-4.805 8.685-.99 8.685-.99s4.044 3.964-.526 8.743C25.514 30.245 16 32 16 32z"/><path stroke="#fff" fill="#1A73E8" d="M15.938 32S6 17.938 6 11.938C6 .125 15.938 0 15.938 0S26 .125 26 11.875C26 18.062 15.938 32 15.938 32zM16 6a4 4 0 100 8 4 4 0 000-8z"/></svg>`,
            className: 'custom-icon',
            iconSize: [30, 30],
            popupAnchor: [0, -10],
          }),
        };
        markerOptionsArray.push(markerOptions);
      } else {
        const markerOptions = {
          icon: L.divIcon({
            html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="marker"><path fill-opacity="0.25" d="M16 32s1.427-9.585 3.761-12.025c4.595-4.805 8.685-.99 8.685-.99s4.044 3.964-.526 8.743C25.514 30.245 16 32 16 32z"/><path stroke="#fff" fill="#f44335" d="M15.938 32S6 17.938 6 11.938C6 .125 15.938 0 15.938 0S26 .125 26 11.875C26 18.062 15.938 32 15.938 32zM16 6a4 4 0 100 8 4 4 0 000-8z"/></svg>`,
            className: 'custom-icon',
            iconSize: [30, 30],
            popupAnchor: [0, -10],
          }),
        };
        markerOptionsArray.push(markerOptions);
      }
    }
 setTimeout(() => {
     newMarkers = createMarkers(currentMarkerData, markerOptionsArray);
     setMarkers(newMarkers);
 }, 4000);
  };

  useEffect(() => {
    removeMarkers();

    if (locationMarkerData) {
      addMarkersToMap(locationMarkerData);
    } else if (markerData) {
      addMarkersToMap(markerData);
    }
  }, [markerData, locationMarkerData,map]);

  return null; // No JSX is needed when you're manipulating the map directly
};

export default Markers;
