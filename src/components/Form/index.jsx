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
import { extractWords } from "util/helpers";
import { useGlobalValue,useGlobalGeoData } from "util/mapState";

function Form({ name, description, children }) {
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
      <MKBox component="section" py={{ xs: 2, md: 2 }}>
        <Container>
          <Grid container item xs={12} justifyContent="center">
            <Grid item xs={12} md={6} sx={{ ml: { xs: 0, md: 10 }, mr: { xs: 0, md: "auto" } }}>
              <MKTypography variant="h2" mb={1}>
                {name}
              </MKTypography>
              <MKTypography variant="body2" color="text">
                {description}
              </MKTypography>
            </Grid>
          </Grid>
        </Container>
      </MKBox>
      <MKBox component="section" py={{ xs: 3, md: 3 }}>
        <Container>
        {children}
        </Container>
      </MKBox>
    </>
  );
}
Form.defaultProps = {
  name: "Geocoder",
};
export default Form;
