import Grid from "@mui/material/Grid";
import Box from "components/Box";
import MapWithRoute from "components/Maps/MapWithRoute";
import NoLocationFound from "components/Maps/components/NoLocationFound";
import { useRef, useState } from 'react';
import useStore from "store/mapStore";
import { useGlobalGeoData, useGlobalValue } from "util/mapState";
import mapPlaceHolderImg from 'assets/images/map_placeholder.png';


function FormWrapper({ props, form, map }) {
  /* -------------------------------------------------------------------------- */
  /*                                    HOOKS                                   */
  /* -------------------------------------------------------------------------- */
  const { setErrorMessage, errorMessage } = useStore((state) => ({
    setErrorMessage: state.setErrorMessage,
    errorMessage: state.errorMessage,
  }));
  const [isMapLoaded, setMapLoaded] = useState(false);
  const [coords, setCoords] = useGlobalValue();
  const [geoData, setGeoData] = useGlobalGeoData();
  const latInputElm = useRef(null);
  const lngInputElm = useRef(null);
  /* -------------------------------------------------------------------------- */
  /*                                  FUNCTIONS                                 */
  /* -------------------------------------------------------------------------- */
  function handleSelect(e) {
    setBlurred(false);
    setSelected(true);
  }
  function handleBlur(e) {
    setSelected(false);
    setBlurred(true);
  }
  function handleChange(e) {
    let val = e.target.value;
    if (val.length === 0) {
      latInputElm.current.value = '';
      lngInputElm.current.value = '';
    }
  }

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
  name: "Address to Latitude & Longitude",
  description:
    "To pinpoint a location, you can type in the name of a place, city, state, or address, or click the location on the map to get the coordinates.",
  map: false,
};
export default FormWrapper;
