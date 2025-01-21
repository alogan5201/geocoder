import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import { useLocation } from 'react-router-dom';
import 'react-tabs/style/react-tabs.css';
import useStore from 'store/mapStore';
import PointMarker from './PointMarker';
import { getTimeStamp } from 'util/helpers';
import { marker } from 'leaflet';

const Markers = ({ L }) => {
  const map = useMap();
  const { pathname } = useLocation();

  const [markerPoints, setMarkerPoints] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
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

      if (data.title) {
        const popupContent = `
          <div>
                <div style="padding: 8px; opacity: 1; background: transparent; color: rgb(35, 38, 45); box-shadow: none; width: 100%; max-width: 300px;">
        <ul style="list-style: none; margin: 0; padding: 0; position: relative; padding-top: 0; padding-bottom: 0;">
          <li>
            <span style="font-size: 16px"
              >${data.title}</span
            >
          </li>
        </ul>
        <hr
          style="margin: 0; -webkit-flex-shrink: 0; -ms-flex-negative: 0; flex-shrink: 0; border-width: 0; border-style: solid; border-color: rgba(0, 0, 0, 0.12); border-bottom-width: thin; background: rgba(35, 38, 45, 0.2); height: 0.0625rem; margin: 1rem 0; border-bottom: none; opacity: 0.25;"
        />
        <ul style="list-style: none; margin: 0; padding: 0; position: relative; padding-top: 0;">
          <li style="margin-bottom: 8px;">
            <span style="font-size: 16px">Latitude: ${data.lat}</span>
          </li>
          <li style="margin-bottom: 8px;">
            <span style="font-size: 16px">Longitude: ${data.lng}</span>
          </li>
          <li style="margin-bottom: 8px;">
            <span style="font-size: 16px">DMS: ${data.dms.lat.display} ${data.dms.lng.display}</span>
          </li>
        </ul>
      </div>
          </div>
        `;
        
        marker.bindPopup(popupContent, {
          closeButton: true,
          autoClose: false,
          maxWidth: 300,
          className: 'custom-popup-class',
          keepInView: true
        });
      }

      marker.addTo(map);
      return marker;
    });
  };

  const addMarkersToMap = (currentMarkerData) => {
    let markerOptionsArray = [];
    for (let index = 0; index < currentMarkerData.length; index++) {
      const markerOptions = {
        icon: L.divIcon({
          html: index === 0 
            ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="marker"><path fill-opacity="0.25" d="M16 32s1.427-9.585 3.761-12.025c4.595-4.805 8.685-.99 8.685-.99s4.044 3.964-.526 8.743C25.514 30.245 16 32 16 32z"/><path stroke="#fff" fill="#1A73E8" d="M15.938 32S6 17.938 6 11.938C6 .125 15.938 0 15.938 0S26 .125 26 11.875C26 18.062 15.938 32 15.938 32zM16 6a4 4 0 100 8 4 4 0 000-8z"/></svg>`
            : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="marker"><path fill-opacity="0.25" d="M16 32s1.427-9.585 3.761-12.025c4.595-4.805 8.685-.99 8.685-.99s4.044 3.964-.526 8.743C25.514 30.245 16 32 16 32z"/><path stroke="#fff" fill="#f44335" d="M15.938 32S6 17.938 6 11.938C6 .125 15.938 0 15.938 0S26 .125 26 11.875C26 18.062 15.938 32 15.938 32zM16 6a4 4 0 100 8 4 4 0 000-8z"/></svg>`,
          className: 'custom-icon',
          iconSize: [30, 30],
          popupAnchor: [0, -10],
        }),
      };
      markerOptionsArray.push(markerOptions);
    }
    
    const newMarkers = createMarkers(currentMarkerData, markerOptionsArray);
    setMarkers(newMarkers);
  };

  useEffect(() => {
    removeMarkers();
if (locationMarkerData) {
  if (pathname.includes('journey-insights')) {
    addMarkersToMap(locationMarkerData);
    console.log(markerData);
  } else {
    localStorage.setItem('markerData', JSON.stringify(locationMarkerData));
    setMarkerPoints(locationMarkerData);
    setPopupOpen(true);
  }
} else if (markerData) {
  if (pathname.includes('journey-insights')) {
    addMarkersToMap(markerData);
    console.log(markerData);
  } else {
    localStorage.setItem('markerData', JSON.stringify(markerData));
    setMarkerPoints(markerData);
    setPopupOpen(true);
  }
} else if (popupOpen) {
  setPopupOpen(false);
}
    return () => {
      setMarkers([]);
      removeMarkers();
      setMarkerPoints(null);
    };
  }, [markerData, locationMarkerData, map]);
  if (pathname.includes('journey-insights')){
    return null;
  }
  else if(markerPoints && markerPoints.length > 0) {
    return (
      console.log(
        "%c markerPoints: %o\n%c timestamp: %c%s",
        "color: #44afff; font-weight: bold",
        markerPoints,
        "color: #f44335; font-weight: bold",
        "color: #4caf50",
        new Date().toLocaleString()
      ),
      <PointMarker key={0} content={0} center={{ lat: markerPoints[0].lat, lng: markerPoints[0].lng }} openPopup={popupOpen} L={L} />
    );
  }
};

export default Markers;
