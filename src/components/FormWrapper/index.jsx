import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "components/Box";
import Button from "components/Button";
import Typography from "components/Typography";
import { useEffect, useRef } from "react";
import { tron } from "util/helpers";
import { useGlobalGeoData, useGlobalValue } from "util/mapState";
import GlobeMapBoxMap from "components/Maps/GlobeMapBoxMap";
import Sandbox from "components/Sandbox";

function FormWrapper({props, form, map}) {
  const sectionStyles = props.styles.section.py
useEffect(() => {
  if(props){
    tron.log(props)
  }
}, [props]);
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
      <Box component="section" py={sectionStyles}>
        <Container>
          <Sandbox />
          <Grid container item px={0}>
            <Box
              width="100%"
              bgColor="white"
              borderRadius="xl"
              shadow="xl"
              mb={6}
              sx={{ overflow: "hidden" }}
            >
           
              <Grid container spacing={3}>
                {/*================= LEFT COLUMN - FormWrapper / FormChildren =================*/}
                <Grid item xs={12} lg={5}>
                  {form}
                  {/* {children} */}
                </Grid>
                {/*================= RIGHT COLUMN - MAP ================= */}
                <Grid item xs={12} lg={7} position="relative" px={0}>
                  <div
                    style={{
                      position: "relative",
                      paddingBottom: "26.25%",
                      paddingTop: "30px",
                      height: "500px",
                    }}
                  >

                  <GlobeMapBoxMap />

                  </div>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Container>
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
