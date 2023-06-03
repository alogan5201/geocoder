// ES6
//import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
//import 'mapbox-gl/dist/mapbox-gl.css';
const { VITE_USERNAME, VITE_STYLE_ID, VITE_ACCESS_TOKEN } = import.meta.env;



// in render()
function GlobeMapBoxMap(){
    <Map
    mapboxAccessToken="pk.eyJ1IjoibG9nYW41MjAxIiwiYSI6ImNrcTQybTFoZzE0aDQyeXM1aGNmYnR1MnoifQ.4kRWNfEH_Yao_mmdgrgjPA"
    mapLib={import('mapbox-gl')}
    initialViewState={{
      longitude: -100,
      latitude: 40,
      zoom: 3.5
    }}
    style={{width: 600, height: 400}}
    mapStyle="mapbox://styles/mapbox/streets-v9"
  />;
}
export default GlobeMapBoxMap