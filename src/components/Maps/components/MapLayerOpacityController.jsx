import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import useStore from 'store/mapStore';

const MapLayerOpacityController = ({ L }) => {
  const hideAllLayers = useStore((state) => state.hideAllLayers);
  const map = useMap();

  useEffect(() => {
  console.log('🚀 ~ MapLayerOpacityController ~ hideAllLayers:', hideAllLayers);

    map.eachLayer((layer) => {
      if (layer instanceof L.Polyline) {
        console.log(`polyLine; hideAllLayers= ${hideAllLayers}`);
        layer.setStyle({ opacity: hideAllLayers ? 0 : 1 });
      }
      if (layer instanceof L.Path) {
        console.log(`polyLine; hideAllLayers= ${hideAllLayers}`);
        console.log("path")
        layer.setStyle({ opacity: hideAllLayers ? 0 : 1 });
      }
      if (layer instanceof L.Marker) {
        if (hideAllLayers) {
          console.log("marker hide")
          layer.setOpacity(0)
          } else {
       layer.setOpacity(1)
        }
      }
    });
  }, [hideAllLayers, map]);

  return null;
};

export default MapLayerOpacityController;
