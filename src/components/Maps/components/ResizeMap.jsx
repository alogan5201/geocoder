import { useMap } from 'react-leaflet';

const ResizeMap = () => {
  const map = useMap();
  map._onResize();
  return null;
};


export default ResizeMap;