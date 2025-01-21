import Grid from "@mui/material/Grid";
import Box from "components/Box";
import NoLocationFound from "components/Maps/components/NoLocationFound";
import { useState, useEffect, lazy} from 'react';
import useStore from "store/mapStore";
import { SyncLoader } from 'react-spinners';
const MapWithRoute = lazy(() => import("components/Maps/MapWithRoute"));

function FormWrapper({  form }) {
   const [mapLoaded, setMapLoaded] = useState(false);

  const {  errorMessage } = useStore((state) => ({
    errorMessage: state.errorMessage,
  }));
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
    const handleMapLoad = () => {
      setTimeout(() => {
        setMapLoaded(true);
      }, 500);
    };
  return (
    <>
      {!mapLoaded && (
        <Grid container item px={0}>
          <Box width="100%" bgColor="white" mt={4} mb={6} sx={{ overflow: 'hidden' }}>
            <Grid container spacing={0}>
              <Box
                px={{ xs: 1, sm: 3 }}
                py={{ xs: 0, sm: 0 }}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  minHeight: '65vh',
                  overflowY: 'hidden',
                }}
              >
                <SyncLoader color="#1A73E8" />
              </Box>
            </Grid>
          </Box>
        </Grid>
      )}
      <Box component="section" py={{ xs: 2, sm: 6 }} sx={mapLoaded ? {visibility:"visible"} : {visibility:"hidden"}}>
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
                    <div className="map-container" style={documentReady ? {display:"block"} : {display: "none"}}>{documentReady && <MapWithRoute setMapLoaded={handleMapLoad} />}</div>
                  </Box>
                </Box>
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
  name: "Address to Latitude/Longitude",
  description:
    "To pinpoint a location, you can type in the name of a place, city, state, or address, or click the location on the map to get the coordinates.",
  map: false,
};
export default FormWrapper;
