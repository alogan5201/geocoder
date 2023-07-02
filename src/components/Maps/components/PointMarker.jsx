import PopupMarker from "components/PopupMarker";
import { useEffect, useRef, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import useStore from "store/mapStore";
import PopupMarkerContent from "./PopupMarkerContent";
const center = [37.09024, -95.712891];

const PointMarker = ({ center, content, openPopup, L, icon }) => {
  const [position, setPosition] = useState(null);
  const [popupOpened, setPopupOpened] = useState(false);
  const [popupVisible, setPopupVisible] = useState("hidden");
  const [rendered, setRendered] = useState(false);
  const [containerHeight, setContainerHeight] = useState(null);
  const userLocationActive = useStore((state) => state.userLocationActive);

  const map = useMap();
  const markerRef = useRef(null);
  let open = markerRef && markerRef.current ? markerRef.current.isPopupOpen() : null;
  const mapZoom = useStore((state) => state.mapZoom);
  useEffect(() => {
    if (icon) {
    }
  }, [icon]);
  useEffect(() => {
    if (mapZoom) {
      map.setZoom(mapZoom);
    }
  }, [mapZoom]);
  const togglePopup = (open, markerRef) => {
    if (open) {
      markerRef.current.closePopup();
      let panes = map.getPanes();
      let popupPane = panes["popupPane"].children[0];

      L.DomUtil.addClass(popupPane, "map-popup-inactive");
      markerRef.current.openPopup();
    } else {
      markerRef.current.openPopup();
    }
  };
  const stopLocation = () => {
    if (userLocationActive) return;
    map.stopLocate();
  };

  useEffect(() => {
    if (openPopup) {
      stopLocation();
const zoom = mapZoom ? mapZoom : 13;
if(!mapZoom){

  map.flyTo(center, 13, {
    animate: true,
    duration: 0.8,
    easeLinearity: 0.5,
  });
}

      togglePopup(open, markerRef);

      setTimeout(
        () => {
          if (open) {
            if (rendered) {
              const popupHeight = markerRef.current._popup._container.clientHeight;

              var px = map.project(markerRef.current._popup._latlng); // find the pixel location on the map where the popup anchor is

              px.y -= markerRef.current._popup._container.clientHeight / 3; // find the height of the popup container, divide by 2, subtract from the Y axis of marker location

              map.panTo(map.unproject(px), { animate: true, duration: 0.2, easeLinearity: 0.5 });
            }
          }
        },
        rendered ? 1000 : 0
      );
      setTimeout(
        () => {
          if (!rendered) {
            const popupHeight = markerRef.current._popup._container.clientHeight;

            var px = map.project(markerRef.current._popup._latlng); // find the pixel location on the map where the popup anchor is

            px.y -= markerRef.current._popup._container.clientHeight / 3; // find the height of the popup container, divide by 2, subtract from the Y axis of marker location

            map.panTo(map.unproject(px), {
              animate: true,
              duration: 0.2,
              easeLinearity: 0.5,
            });
            let panes = map.getPanes();
            let popupPane = panes["popupPane"].children[0];

            L.DomUtil.removeClass(popupPane, "map-popup-inactive");
          }
          let panes = map.getPanes();
          let popupPane = panes["popupPane"].children[0];

          L.DomUtil.removeClass(popupPane, "map-popup-inactive");
        },
        rendered ? 1300 : 1000
      );
    }
    setRendered(true);
  }, [map, center, openPopup, rendered]);

  return icon ? (
    <Marker ref={markerRef} position={center} icon={icon}>
      <Popup
        minWidth={300}
        position={position}
        keepInView={true}
        autoPan={true}
        className="map-popup-with-icon"
      >
        <PopupMarkerContent content={content} />
      </Popup>
    </Marker>
  ) : (
    <Marker ref={markerRef} position={center}>
      <Popup
        minWidth={300}
        position={position}
        keepInView={true}
        autoPan={true}
        className="map-popup-inactive"
      >
        <PopupMarkerContent content={content} />
      </Popup>
    </Marker>
  );
};

export default PointMarker;
