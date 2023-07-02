import { useEffect } from "react";
import useStore from "store/mapStore";
import {

  Polygon,
  FeatureGroup,
  TileLayer,
  LayersControl,
  useMapEvent,
} from "react-leaflet";


const RouteLine = ({L}) => {
  const map = useMapEvent({
    layeradd() {
      let bounds = new L.LatLngBounds();
      map.eachLayer(function (layer) {
        /* if (layer instanceof L.FeatureGroup) {
          bounds.extend(layer.getBounds());
          console.log(layer)
        } */
        console.log("layer",layer)
    
      });

  /*     if (bounds.isValid()) {
        map.flyToBounds([bounds]);
      } */
    },
  });
};

export default RouteLine