import {
    FeatureGroup,
    LayersControl,
    useMapEvent,
    Polyline
} from "react-leaflet";
import useStore from "store/mapStore";


const CustomControl = ({ L }) => {
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
