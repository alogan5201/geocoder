import Grid from '@mui/material/Grid';
import Box from 'components/Box';
import MapExternal from 'components/Maps/MapExternal';
import NoLocationFound from 'components/Maps/components/NoLocationFound';
import { useEffect, useState } from 'react';
import useStore from 'store/mapStore';
import mapPlaceHolderImg from 'assets/images/map_placeholder.png';
import Sandbox from 'components/Sandbox';
function FormWrapper({ form }) {
  const errorMessage = useStore((state) => state.errorMessage);
  const markerData = useStore((state) => state.markerData);
  const locationMarkerData = useStore((state) => state.locationMarkerData);
  const [isMapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    //
  }, [markerData, locationMarkerData]);

  /* -------------------------------------------------------------------------- */
  /*                                  FUNCTIONS                                 */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <>
      <Box component="section" py={{ xs: 2, sm: 6 }}>
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
              <Grid item xs={12} lg={7} position="relative" px={0}>
                <Box px={{ xs: 1, sm: 3 }} py={{ xs: 0, sm: 6 }} sx={{ height: 600 }}>
                  {!isMapLoaded && (
                    // Your placeholder image here. Make sure it's styled to fill the space.
                    <img src={mapPlaceHolderImg} alt="Map placeholder" style={{ width: '100%', height: '100%' }} />
                  )}
                  <MapExternal setMapLoaded={setMapLoaded} />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Sandbox />
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
