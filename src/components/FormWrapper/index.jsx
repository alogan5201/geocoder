import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "components/Box";
import Button from "components/Button";
import Typography from "components/Typography";
import { useEffect, useRef } from "react";
import { tron } from "util/helpers";
import { useGlobalGeoData, useGlobalValue } from "util/mapState";
import MapExternal from "components/Maps/MapExternal";
import Sandbox from "components/Sandbox";

function FormWrapper({props, form, map}) {
 

  /* -------------------------------------------------------------------------- */
  /*                                    HOOKS                                   */
  /* -------------------------------------------------------------------------- */
  const [coords, setCoords] = useGlobalValue();
  const [geoData, setGeoData] = useGlobalGeoData();
   const latInputElm = useRef(null);
   const lngInputElm = useRef(null);
   /* -------------------------------------------------------------------------- */
   /*                                  FUNCTIONS                                 */
   /* -------------------------------------------------------------------------- */
  function handleSelect(e){
    setBlurred(false)
   setSelected(true)
  }
  function handleBlur(e){
    setSelected(false)
   setBlurred(true)
  }
  function handleChange (e){
    let val = e.target.value
if(val.length === 0){
 latInputElm.current.value = "";
 lngInputElm.current.value = "";
}
  }
  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <>
      <Box component="section" py={{ xs: 2, sm: 6 }}>
        <Grid container item px={0}>
          <Box
            width="100%"
            bgColor="white"
            borderRadius="xl"
            shadow="xl"
            mb={6}
            sx={{ overflow: "hidden" }}
          >
            <Grid container spacing={0}>
              {/*================= LEFT COLUMN - FormWrapper / FormChildren =================*/}
              <Grid item xs={12} lg={5}>
                {form}
                {/* {children} */}
              </Grid>
              {/*================= RIGHT COLUMN - MAP ================= */}
              <Grid item xs={12} lg={7} position="relative" px={0}>
                <Box px={{ xs: 1, sm: 3 }} py={{ xs: 0, sm: 6 }} sx={{ height: 600 }}>
                  <MapExternal />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Sandbox />
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
