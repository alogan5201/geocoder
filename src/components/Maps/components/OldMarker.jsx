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
  const [markerPoints, setMarkerPoints] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const { pathname } = useLocation();
  const [, setCustomMarker] = useState(null);

  useEffect(() => {
    if (locationMarkerData) {
      localStorage.setItem('markerData', JSON.stringify(locationMarkerData));
      setMarkerPoints(locationMarkerData);
      if (pathname.includes('route-planner') && locationMarkerData.length > 1) {
        let latOrigin = locationMarkerData[0].lat;
        let lngOrigin = locationMarkerData[0].lng;
        let latDestination = locationMarkerData[1].lat;
        let lngDestination = locationMarkerData[1].lng;
        map.fitBounds(
          [
            [latOrigin, lngOrigin],
            [latDestination, lngDestination],
          ],
          { padding: [50, 50], maxZoom: 13 }
        );
        setCustomMarker(true);
        setPopupOpen(false);
      } else {
        setPopupOpen(true);
      }
    } else if (markerData) {
      localStorage.setItem('markerData', JSON.stringify(markerData));
      setMarkerPoints(markerData);
      if (pathname.includes('route-planner') && markerData.length > 1) {
        let latOrigin = markerData[0].lat;
        let lngOrigin = markerData[0].lng;
        let latDestination = markerData[1].lat;
        let lngDestination = markerData[1].lng;
        map.fitBounds(
          [
            [latOrigin, lngOrigin],
            [latDestination, lngDestination],
          ],
          { padding: [50, 50], maxZoom: 13 }
        );
        setCustomMarker(true);
        setPopupOpen(false);
      } else {
        setPopupOpen(true);
      }
    } else if (popupOpen) {
      setPopupOpen(false);
    }
  }, [markerData, pathname, locationMarkerData]);

  return markerPoints && markerPoints.length > 1
    ? markerPoints.map((item, index) => (
        <PointMarker
          opacity={0}
          key={index}
          content={index}
          center={{ lat: item.lat, lng: item.lng }}
          openPopup={popupOpen}
          L={L}
          origin={index === 0 ? true : false}
          destination={index === 1 ? true : false}
        />
      ))
    : markerPoints && markerPoints.length > 0
    ? markerPoints.map((item, index) => (
        <PointMarker
          key={index}
          content={index}
          center={{ lat: item.lat, lng: item.lng }}
          openPopup={popupOpen}
          L={L}
        />
      ))
    : null;
};

export default Markers;
