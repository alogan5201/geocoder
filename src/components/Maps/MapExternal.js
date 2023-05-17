import { useState, useCallback, useEffect, useMemo} from 'react';
import { useMapEvents } from 'react-leaflet/hooks'

import { MapContainer, TileLayer,Marker,Popup } from 'react-leaflet';
const center = [51.505, -0.09]
const zoom = 3

function DisplayPosition({ map,coords }) {
  const [position, setPosition] = useState(() => map.getCenter())
  useEffect(() => {
    if(coords && map){
        if(coords[0]){
            console.log(coords[0])
            if(coords[0].lat){
                let lat = coords[0].lat
                let lng = coords[0].lng
                map.setView([lat,lng],zoom)
            }
 }
// map.setView([lat,lng], zoom)
    }
  }, [coords,map]);
  const onClick = useCallback(() => {
    map.setView(center, zoom)
  }, [map])

  const onMove = useCallback(() => {
    setPosition(map.getCenter())
  }, [map])

  useEffect(() => {
    map.on('move', onMove)
    return () => {
      map.off('move', onMove)
    }
  }, [map, onMove])

  return (
    <p>
      latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)}{' '}
      <button onClick={onClick}>reset</button>
    </p>
  )
}

function MapExternal({coords}) {
  const [map, setMap] = useState(null)

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        ref={setMap}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
        />
      </MapContainer>
    ),
    [],
  )

  return (
    <div>
      {map ? <DisplayPosition map={map} coords={coords} /> : null}
      {displayMap}
    </div>
  )
}

export default MapExternal