import  { useEffect } from 'react';
import { useMap, useMapEvents } from 'react-leaflet';

const LeafletPopupMap = () => {
  const map = useMap();
  const mapEvents = useMapEvents();

  useEffect(() => {
    mapEvents.on('popupopen', (e) => {
      // find the pixel location on the map where the popup anchor is
      var px = map.project(e.target._popup._latlng)
      // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
      px.y -= e.target._popup._container.clientHeight / 2
      map.panTo(map.unproject(px), { animate: true })

      // This line may need to be refactored to work with your specific React application
      // It hides some Leaflet controls when the popup is opened
      // You might want to handle this differently, for instance by adding some state to hide the controls in your React application
    });

    return () => {
      mapEvents.off('popupopen');
    };
  }, [map, mapEvents]);

  return null;
}

export default LeafletPopupMap;
