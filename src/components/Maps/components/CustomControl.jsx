import { useState } from "react";
import {
    FeatureGroup,
    LayersControl,
    useMapEvent,
    Polyline
} from "react-leaflet";
import useStore from "store/mapStore";

   function convertToBoundingBox(points) {
     if (!points || points.length === 0) {
       return null;
     }

     let minLat = points[0][1];
     let maxLat = points[0][1];
     let minLng = points[0][0];
     let maxLng = points[0][0];

     for (let i = 1; i < points.length; i++) {
       const [lng, lat] = points[i];
       minLat = Math.min(minLat, lat);
       maxLat = Math.max(maxLat, lat);
       minLng = Math.min(minLng, lng);
       maxLng = Math.max(maxLng, lng);
     }

     return {
       _southWest: {
         lat: minLat,
         lng: minLng,
       },
       _northEast: {
         lat: maxLat,
         lng: maxLng,
       },
     };
   }
const CustomControl = ({ L }) => {
    const [polyLine, setPolyline] = useState(null);
      const routeData = useStore((state) => state.routeData);
const map = useMapEvent({
  layeradd() {
    let bounds = new L.LatLngBounds();
    map.eachLayer(function (layer) {
      if (layer instanceof L.FeatureGroup) {
        bounds.extend(layer.getBounds());
      }
    });

    if (bounds.isValid()) {
      map.flyToBounds([bounds]);
    }
  },
});

if(routeData){
    <LayersControl position="topright" collapsed={false}>
      <LayersControl.Overlay name="River">
        <FeatureGroup>
          <Polyline
            positions={routeData.routes[0].geometry.coordinates.map((coord) => [
              coord[1],
              coord[0],
            ])}
            color={"#44afff"}
            opacity={0.7}
            weight={5}
          />
        </FeatureGroup>
      </LayersControl.Overlay>

   
    </LayersControl>
}
    else {
        return null
    }

};

export default CustomControl;
