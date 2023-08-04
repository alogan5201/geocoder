import Grid from '@mui/material/Grid';
import mapPlaceHolderImg from 'assets/images/map_placeholder.png';
import Box from 'components/Box';
import NoLocationFound from 'components/Maps/components/NoLocationFound';
import { useState} from 'react';
import useStore from 'store/mapStore';
import MapExternal from 'components/Maps/MapExternal';

function FormWrapper({ form }) {
  const errorMessage = useStore((state) => state.errorMessage);
  const [, setMapLoaded] = useState(false);

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
                    <div className="map-container">
                      <img
                  
                        src={mapPlaceHolderImg}
                        alt="Map placeholder"
                        style={{ width: '600px', height: '400px' }}
                      />

                      <MapExternal setMapLoaded={setMapLoaded} />
                    </div>
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
  name: 'Address to Latitude & Longitude',
  description:
    'To pinpoint a location, you can type in the name of a place, city, state, or address, or click the location on the map to get the coordinates.',
  map: false,
};
export default FormWrapper;
