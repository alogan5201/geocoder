import { useEffect, useRef, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import useStore from "store/mapStore";
import PopupMarkerContent from "./PopupMarkerContent";

const PointMarker = ({ center, content, openPopup, L,origin,destination }) => {
  const [position, setPosition] = useState(null);
  const [rendered, setRendered] = useState(false);
  const userLocationActive = useStore((state) => state.userLocationActive);
  const map = useMap();
  const markerRef = useRef(null);
  let open = markerRef && markerRef.current ? markerRef.current.isPopupOpen() : null;
  const mapZoom = useStore((state) => state.mapZoom);
    

      const originnMarker = L.divIcon({
        html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="marker"><path fill-opacity="0.25" d="M16 32s1.427-9.585 3.761-12.025c4.595-4.805 8.685-.99 8.685-.99s4.044 3.964-.526 8.743C25.514 30.245 16 32 16 32z"/><path stroke="#fff" fill="#1A73E8" d="M15.938 32S6 17.938 6 11.938C6 .125 15.938 0 15.938 0S26 .125 26 11.875C26 18.062 15.938 32 15.938 32zM16 6a4 4 0 100 8 4 4 0 000-8z"/></svg>`,
        className: "custom-icon",
        iconSize: [30, 30],
        popupAnchor: [0, -10], // changed popup position
      });
      const destinationMarker = L.divIcon({
        html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="marker"><path fill-opacity="0.25" d="M16 32s1.427-9.585 3.761-12.025c4.595-4.805 8.685-.99 8.685-.99s4.044 3.964-.526 8.743C25.514 30.245 16 32 16 32z"/><path stroke="#fff" fill="#f44335" d="M15.938 32S6 17.938 6 11.938C6 .125 15.938 0 15.938 0S26 .125 26 11.875C26 18.062 15.938 32 15.938 32zM16 6a4 4 0 100 8 4 4 0 000-8z"/></svg>`,
        className: "custom-icon",
        iconSize: [30, 30],
        popupAnchor: [0, -10],
      });
      const hiddenMarker = L.divIcon({
        html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="marker"><path fill-opacity="0.25" d="M16 32s1.427-9.585 3.761-12.025c4.595-4.805 8.685-.99 8.685-.99s4.044 3.964-.526 8.743C25.514 30.245 16 32 16 32z"/><path stroke="#fff" fill="#f44335" d="M15.938 32S6 17.938 6 11.938C6 .125 15.938 0 15.938 0S26 .125 26 11.875C26 18.062 15.938 32 15.938 32zM16 6a4 4 0 100 8 4 4 0 000-8z"/></svg>`,
        className: "hidden-marker",
        iconSize: [30, 30],
        popupAnchor: [0, -10],
      });

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

  return origin || destination ? (
    <Marker ref={markerRef} position={center} icon={origin ? originnMarker : destinationMarker}>
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
