import { useCallback, useEffect, useState } from 'react';

const center = [39.7072, -98.1736];
const zoom = 3

function DisplayPosition({ map,coords,geoData }) {
    const [position, setPosition] = useState(() => map.getCenter())
    useEffect(() => {
      if(coords && map && geoData){
        
        
        if(coords[0]){
              if(coords[0].lat){
                  let lat = coords[0].lat
                  let lng = coords[0].lng
                  map.setView([lat,lng],13)
              }
   }
      }
    }, [coords,map,geoData]);
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

  export default DisplayPosition