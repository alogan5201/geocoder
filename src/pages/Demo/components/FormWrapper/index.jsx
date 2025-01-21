import Grid from "@mui/material/Grid";
import mapPlaceHolderImg from 'assets/images/map_placeholder.png';
import Box from "components/Box";
import MapWithRoute from "components/Maps/MapWithRoute";
import NoLocationFound from "components/Maps/components/NoLocationFound";
import { useState } from 'react';
import useStore from "store/mapStore";
function FormWrapper({  form }) {
 
  const {  errorMessage } = useStore((state) => ({
    errorMessage: state.errorMessage,
  }));
  const [isMapLoaded, setMapLoaded] = useState(false);
 
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
              <Grid item xs={12} lg={7}>
                <Box p={2}>
                  <Box px={{ xs: 0, sm: 3 }} py={{ xs: 2, sm: 3 }}>
                    <div className="map-container">
                      {!isMapLoaded && (
                        // Your placeholder image here. Make sure it's styled to fill the space.
                        <img
                          src={mapPlaceHolderImg}
                          alt="Map placeholder"
                          style={{ width: '600px', height: '400px' }}
                        />
                      )}
                      <MapWithRoute setMapLoaded={setMapLoaded} />
                  
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
  name: "address to latitude/longitude",
  description:
    "To pinpoint a location, you can type in the name of a place, city, state, or address, or click the location on the map to get the coordinates.",
  map: false,
};
export default FormWrapper;
