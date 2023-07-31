import { useEffect, useRef, useState } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import useStore from 'store/mapStore';
import PopupMarkerContent from './PopupMarkerContent';

const PointMarker = ({ center, content, openPopup, L, origin, destination }) => {
  const map = useMap();

  const [position] = useState(null);
  const [rendered, setRendered] = useState(false);
  const userLocationActive = useStore((state) => state.userLocationActive);
  const mapZoom = useStore((state) => state.mapZoom);
  const markerRef = useRef(null);
  let open = markerRef && markerRef.current ? markerRef.current.isPopupOpen() : null;

  const [animationFrameId, setAnimationFrameId] = useState(null);
  
  const originMarker = L.divIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="marker"><path fill-opacity="0.25" d="M16 32s1.427-9.585 3.761-12.025c4.595-4.805 8.685-.99 8.685-.99s4.044 3.964-.526 8.743C25.514 30.245 16 32 16 32z"/><path stroke="#fff" fill="#1A73E8" d="M15.938 32S6 17.938 6 11.938C6 .125 15.938 0 15.938 0S26 .125 26 11.875C26 18.062 15.938 32 15.938 32zM16 6a4 4 0 100 8 4 4 0 000-8z"/></svg>`,
    className: 'custom-icon',
    iconSize: [30, 30],
    popupAnchor: [0, -10],
  });

  const destinationMarker = L.divIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="marker"><path fill-opacity="0.25" d="M16 32s1.427-9.585 3.761-12.025c4.595-4.805 8.685-.99 8.685-.99s4.044 3.964-.526 8.743C25.514 30.245 16 32 16 32z"/><path stroke="#fff" fill="#f44335" d="M15.938 32S6 17.938 6 11.938C6 .125 15.938 0 15.938 0S26 .125 26 11.875C26 18.062 15.938 32 15.938 32zM16 6a4 4 0 100 8 4 4 0 000-8z"/></svg>`,
    className: 'custom-icon',
    iconSize: [30, 30],
    popupAnchor: [0, -10],
  });

  const togglePopup = (open, markerRef) => {
    if (open) {
      markerRef.current.closePopup();
      let panes = map.getPanes();
      let popupPane = panes['popupPane'].children[0];
      L.DomUtil.addClass(popupPane, 'map-popup-inactive');
      markerRef.current.openPopup();
    } else {
      markerRef.current.openPopup();
    }
  };

  const stopLocation = () => {
    if (userLocationActive) return;
    map.stopLocate();
  };

  const animateFlyTo = (targetCenter, zoomLevel, startTime, duration) => {
    const currentTime = performance.now();
    const elapsed = currentTime - startTime;
    const t = Math.min(1, elapsed / duration);

    const lat = map.getCenter().lat * (1 - t) + targetCenter.lat * t;
    const lng = map.getCenter().lng * (1 - t) + targetCenter.lng * t;

    map.flyTo([lat, lng], zoomLevel);

    if (t < 1) {
      setAnimationFrameId(requestAnimationFrame(() => animateFlyTo(targetCenter, zoomLevel, startTime, duration)));
    }
  };

  useEffect(() => {
    if (openPopup) {
      stopLocation();

      if (!mapZoom) {
        const startTime = performance.now();
        animateFlyTo(center, 13, startTime, 800);
      }

      togglePopup(open, markerRef);

      setAnimationFrameId(
        setTimeout(
          () => {
            if (open) {
              if (rendered) {
                var px = map.project(markerRef.current._popup._latlng);
                px.y -= markerRef.current._popup._container.clientHeight / 3;
                map.panTo(map.unproject(px), { animate: true, duration: 0.2, easeLinearity: 0.5 });
              }
            }
            cancelAnimationFrame(animationFrameId);
          },
          rendered ? 1000 : 0
        )
      );

      setAnimationFrameId(
        setTimeout(
          () => {
            if (!rendered) {
              var px = map.project(markerRef.current._popup._latlng);
              px.y -= markerRef.current._popup._container.clientHeight / 3;
              map.panTo(map.unproject(px), {
                animate: true,
                duration: 0.2,
                easeLinearity: 0.5,
              });
              let panes = map.getPanes();
              let popupPane = panes['popupPane'].children[0];
              L.DomUtil.removeClass(popupPane, 'map-popup-inactive');
            }
            let panes = map.getPanes();
            let popupPane = panes['popupPane'].children[0];
            L.DomUtil.removeClass(popupPane, 'map-popup-inactive');
            cancelAnimationFrame(animationFrameId);
          },
          rendered ? 1300 : 1000
        )
      );
    }

    setRendered(true);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [map, center, openPopup, rendered]);
useEffect(() => {
  if (content) {
  
   
    
  }
}, [content]);
  return origin || destination ? (
    <Marker ref={markerRef} position={center} icon={origin ? originMarker : destinationMarker} autoPan={false}>
      <Popup minWidth={300} position={position} keepInView={true} className="map-popup-with-icon">
        <PopupMarkerContent content={content} />
      </Popup>
    </Marker>
  ) : (
    <Marker ref={markerRef} position={center}>
      <Popup minWidth={300} position={position} keepInView={true} className="map-popup-inactive">
        <PopupMarkerContent content={content} />
      </Popup>
    </Marker>
  );
};

export default PointMarker;
