import Grid from '@mui/material/Grid';
//import mapPlaceHolderImg from 'assets/images/map_placeholder.png';
import Box from 'components/Box';
import NoLocationFound from 'components/Maps/components/NoLocationFound';
import { useState, lazy, useEffect} from 'react';
import useStore from 'store/mapStore';
//import Button from 'components/Button';
import Button from 'components/Button';
import LocationButtonIcon from 'components/LocationButtonIcon';
const MapExternal = lazy(() => import('components/Maps/MapExternal'));

function FormWrapper({ form }) {
  const errorMessage = useStore((state) => state.errorMessage);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [documentReady, setDocumentReady] = useState(false);

    useEffect(() => {
      if (document.readyState === 'complete') {
        setDocumentReady(true);
      } else {
        const handleLoad = () => setDocumentReady(true);
        window.addEventListener('load', handleLoad);

        return () => window.removeEventListener('load', handleLoad);
      }
    }, []);
  
  useEffect(() => {
    if(mapLoaded) {
      console.log("🚀 ~ useEffect ~ mapLoaded:", mapLoaded)
      console.log('map loaded')
    }
  }, [mapLoaded]);
/*   const handleTest = (e) => {
    e.preventDefault();
    console.log('test');
    setDocumentReady(documentReady => !documentReady)
  }; */
  const toggleMapVisibility = (e) => {
    e.preventDefault()
    setMapLoaded(mapLoaded => !mapLoaded)
  }

  const handleMapLoad = () => {
    console.log("handling map load")
    setTimeout(() => {
      setMapLoaded(true)
    }, 500);
  }
  return (
    <>
      <Box component="section" py={{ xs: 2, sm: 6 }} sx={{ maxWidth: '100%' }}>
        <NoLocationFound toggle={errorMessage} />

        <Grid container item px={0}>
          <Box width="100%" bgColor="white" borderRadius="xl" shadow="xl" mb={6} sx={{ overflow: 'hidden' }}>
            <Grid container spacing={0}>
              {/*================= LEFT COLUMN - FormWrapper / FormChildren =================*/}
              <Grid item xs={12} lg={5}>
                {form}
                {/* {children} */}
              </Grid>
              {/*================= RIGHT COLUMN - MAP ================= */}
              <Grid item xs={12} lg={7}>
                <Box p={2}>
                  <Box px={{ xs: 0, sm: 0 }} py={{ xs: 2, sm: 3 }}>
                    {/*    <div className="map-container">
                      <MapExternal setMapLoaded={setMapLoaded} loaded={loaded} />
                      <div id="static"></div>
                      {documentReady && <MapExternal setMapLoaded={setMapLoaded} loaded={loaded} />}
                 
                    </div> */}
                    <div className="map-container">
                     <div id="static" style={mapLoaded ? { zIndex: 1 } : { zIndex: 3 }}>
                        <LocationButtonIcon />
                    
                      </div>
                      {documentReady && <MapExternal setMapLoaded={handleMapLoad} />}
                    </div>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} pr={1} mb={2}>
                <Button type="button" variant="gradient" color="info" onClick={toggleMapVisibility}>
                  Toggle Map Visibility
                </Button>
              </Grid>
              <Grid item xs={12} pr={1} mb={2}>
                <div className='leaflet-control-container"'>
                  {' '}
                  <div className="leaflet-bottom leaflet-right">
                    <div className="leaflet-control-attribution leaflet-control">
                      <a href="https://leafletjs.com" title="A JavaScript library for interactive maps">
                        <svg
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width={12}
                          height={8}
                          viewBox="0 0 12 8"
                          className="leaflet-attribution-flag"
                        >
                          <path fill="#4C7BE1" d="M0 0h12v4H0z" />
                          <path fill="#FFD500" d="M0 4h12v3H0z" />
                          <path fill="#E0BC00" d="M0 7h12v1H0z" />
                        </svg>{' '}
                        Leaflet
                      </a>{' '}
                      <span aria-hidden="true">|</span> ©{' '}
                      <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors ©{' '}
                      <a href="https://carto.com/attributions">CARTO</a>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Box>
    </>
  );
}
FormWrapper.defaultProps = {
  styles: {
    section: {
      py: {
        xs: 0,
        lg: 2,
      },
    },
  },
  name: 'Address to Latitude & Longitude',
  description:
    'To pinpoint a location, you can type in the name of a place, city, state, or address, or click the location on the map to get the coordinates.',
  map: false,
};
export default FormWrapper;
