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

function Form({ name, description }) {
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
  async function handleSubmit(e) {
    e.preventDefault();
    const inputOne = e.target[0].value;
    if (inputOne) {
      let extracted = extractWords(inputOne);
      let withPlus = extracted.join("+");
      const response = await fetch(
        `https://nominatim.openstreetmap.org/?addressdetails=1&q=${withPlus}&format=json&limit=1`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        let lat = data[0].lat;
        let lng = data[0].lon;
        const coords = { lat: lat, lng: lng };
        latInputElm.current.value = lat;
        lngInputElm.current.value = lng;
        console.log(data)
        setGeoData(data)
        setCoords([coords]);
      }
    }
  }
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
      <MKBox component="section" py={{ xs: 2, md: 4 }}>
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
      <MKBox component="section" py={{ xs: 3, md: 6 }}>
        <Container>
          <Grid container item xs={12} justifyContent="center">
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                ml: { xs: 0, md: "auto" },
                mr: { xs: 0, md: 6 },
                mb: { xs: 4, md: 0 },
                mt: { xs: 0, md: 8 },
              }}
            >
              <MKBox component="form" method="post" autoComplete="off" onSubmit={handleSubmit}>
                <MKBox py={3}>
                  <Grid container spacing={3} sx={{ mb: 3 }}>
                    <Grid item xs={12} sx={{ my: 1 }}>
                      <MKInput
                      defaultValue="Atlanta, GA"
                        onChange={handleChange}
                        variant="standard"
                        placeholder="Address"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12}>
                      <MKButton type="submit" variant="gradient" color="info">
                        Submit
                      </MKButton>
                    </Grid>
                  </Grid>
                </MKBox>
              </MKBox>
              <MKBox py={3}>
                <Grid container spacing={3} sx={{ mb: 3 }}>
                  <Grid item xs={12} sx={{ my: 1 }}>
                 <MKInput                       
                        label={latInputElm ? "" : "Longitude"}
                        type="text"
                        fullWidth
                        inputRef={latInputElm}
                      />
                  </Grid>
                  <Grid item xs={12} sx={{ my: 1 }}>
                    <MKInput
                      label={lngInputElm ? "" : "Longitude"}
                      type="text"
                      fullWidth
                      inputRef={lngInputElm}
                    />
                  </Grid>
                </Grid>
              </MKBox>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ mr: { xs: 0, md: "auto" }, ml: { xs: 0, md: 6 }, mb: { xs: 4, md: 0 } }}
            >
              <MapExternal coords={coords} geoData={geoData}/>
            </Grid>
          </Grid>
        </Container>
      </MKBox>
    </>
  );
}
Form.defaultProps = {
  name: "Geocoder",
};
export default Form;