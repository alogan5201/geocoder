import { useMap } from "react-leaflet";
import { useEffect } from "react";
import useStore from "store/mapStore";

const ExternalState = () => {
  const map = useMap();
  const flyToMarker = useStore((state) => state.flyToMarker);
  const markerData = useStore((state) => state.markerData);

  useEffect(() => {
    if (flyToMarker && map && markerData.length > 0) {
      /*       map.flyTo(flyToMarker, 12, {
        animate: true,
        duration: 1,
      }); */
    }
  }, [flyToMarker, markerData]);
};

export default ExternalState;
