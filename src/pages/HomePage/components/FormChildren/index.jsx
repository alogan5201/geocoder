
// Material Kit 2 PRO React components
import MKBox from "components/MKBox";

// Material Kit 2 PRO React components
import Grid from "@mui/material/Grid";
import AddressInput from "components/AddressInput";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
import { useRef } from "react";
import { extractWords } from "util/helpers";
import { useGlobalGeoData, useGlobalValue } from "util/mapState";
// @mui material components

// Material Kit 2 PRO React components
import MKTypography from "components/MKTypography";
// Material Kit 2 PRO React components

// Material Kit 2 PRO React examples
// Coworking page sections

// Routes

// Images
function FormChildren(){
  const handleChild = (callback) => {
    // Here, you have the function from the child.
    callback();
  };
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
        
        setGeoData(data)
        setCoords([coords]);
      }
    }
  }
  return (
    <MKBox component="form" p={2} method="post">
      <MKBox px={3} py={{ xs: 2, sm: 6 }}>
        <MKTypography variant="h3" mb={1}>
          Address to Latitude & Longitude
        </MKTypography>
        <MKTypography variant="body2" color="text" mb={2}>
          To pinpoint a location, you can type in the name of a place, city, state, or address, or
          click the location on the map to get the coordinates.
        </MKTypography>
      </MKBox>
      <MKBox pt={0.5} pb={3} px={3}>
        <Grid container>
          {/* ============ AddressInput ============ */}
          <AddressInput handleChild={handleChild} />
          <Grid item xs={12} pr={1} mb={3}>
            <MKButton type="submit" variant="gradient" color="info">
              Submit
            </MKButton>
          </Grid>

          <Grid item xs={12} pr={1} mb={3}>
            <MKInput
              label={latInputElm ? "" : "Longitude"}
              type="text"
              fullWidth
              inputRef={latInputElm}
            />
          </Grid>
          <Grid item xs={12} pr={1} mb={3}>
            <MKInput
              label={lngInputElm ? "" : "Longitude"}
              type="text"
              fullWidth
              inputRef={lngInputElm}
            />
          </Grid>
        </Grid>
      </MKBox>
    </MKBox>
  );
}



export default FormChildren;
