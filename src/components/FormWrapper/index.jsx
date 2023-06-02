import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
import MKTypography from "components/MKTypography";
import MapExternal from "components/Maps/MapExternal";
import { useEffect, useRef, useState } from "react";
import { extractWords,tron } from "util/helpers";
import { useGlobalValue,useGlobalGeoData } from "util/mapState";
import { create } from "apisauce";
function FormWrapper({props,form}) {
useEffect(() => {
  if(props){
    
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
      <MKBox component="section" py={{ xs: 0, lg: 2 }}>
        <Container>
          <Grid container item px={0}>
            <MKBox
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
                <Grid
                  item
                  xs={12}
                  lg={7}
                  position="relative"
                  px={0}
                >
                  <MKBox
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="100%"
                    height="100%"
                  >
                    <MKBox py={6} pl={6} pr={{ xs: 6, sm: 12 }} my="auto">
                      <MKTypography variant="h3" color="white" mb={1}>
                        Contact Information
                      </MKTypography>
                      <MKTypography variant="body2" color="white" opacity={0.8} mb={3}>
                        Fill up the form and our Team will get back to you within 24 hours.
                      </MKTypography>
                      <MKBox display="flex" p={1}>
                        <MKTypography variant="button" color="white">
                          <i className="fas fa-phone" />
                        </MKTypography>
                        <MKTypography
                          component="span"
                          variant="button"
                          color="white"
                          opacity={0.8}
                          ml={2}
                          fontWeight="regular"
                        >
                          (+40) 772 100 200
                        </MKTypography>
                      </MKBox>
                      <MKBox display="flex" color="white" p={1}>
                        <MKTypography variant="button" color="white">
                          <i className="fas fa-envelope" />
                        </MKTypography>
                        <MKTypography
                          component="span"
                          variant="button"
                          color="white"
                          opacity={0.8}
                          ml={2}
                          fontWeight="regular"
                        >
                          hello@creative-tim.com
                        </MKTypography>
                      </MKBox>
                      <MKBox display="flex" color="white" p={1}>
                        <MKTypography variant="button" color="white">
                          <i className="fas fa-map-marker-alt" />
                        </MKTypography>
                        <MKTypography
                          component="span"
                          variant="button"
                          color="white"
                          opacity={0.8}
                          ml={2}
                          fontWeight="regular"
                        >
                          Dyonisie Wolf Bucharest, RO 010458
                        </MKTypography>
                      </MKBox>
                      <MKBox mt={3}>
                        <MKButton variant="text" color="white" size="large" iconOnly>
                          <i className="fab fa-facebook" style={{ fontSize: "1.25rem" }} />
                        </MKButton>
                        <MKButton variant="text" color="white" size="large" iconOnly>
                          <i className="fab fa-twitter" style={{ fontSize: "1.25rem" }} />
                        </MKButton>
                        <MKButton variant="text" color="white" size="large" iconOnly>
                          <i className="fab fa-dribbble" style={{ fontSize: "1.25rem" }} />
                        </MKButton>
                        <MKButton variant="text" color="white" size="large" iconOnly>
                          <i className="fab fa-instagram" style={{ fontSize: "1.25rem" }} />
                        </MKButton>
                      </MKBox>
                    </MKBox>
                  </MKBox>
                </Grid>
              </Grid>
            </MKBox>
          </Grid>
        </Container>
      </MKBox>
    </>
  );
}
FormWrapper.defaultProps = {
  name: "Geocoder",
};
export default FormWrapper;
