// Material Kit 2 PRO React components
import Box from "components/Box";

// Material Kit 2 PRO React components
import Grid from "@mui/material/Grid";
import AddressInput from "components/AddressInput";
import Button from "components/Button";
import Input from "components/Input";
import { useRef } from "react";
import { extractWords } from "util/helpers";
import { useGlobalGeoData, useGlobalValue } from "util/mapState";
import Typography from "components/Typography";
import InputOutlined from "components/InputOutlined";
import useStore from "store/mapStore";

function DisplayGeoData() {
  const geoData = useStore((state) => state.geoData);
  return (
    <Box>
      <Typography variant="h4" mb={1}>
        GeoData
      </Typography>
      <Typography variant="body2" color="text" mb={2}>
        {JSON.stringify(geoData)}
      </Typography>
    </Box>
  );
}
function Form() {
  const handleChild = (callback) => {
    // Here, you have the function from the child.
    callback();
  };
  const [coords, setCoords] = useGlobalValue();
  const latInputElm = useRef(null);
  const lngInputElm = useRef(null);
  const updateGeoData = useStore((state) => state.setGeoData);
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
        updateGeoData(data);
        //const geoData = useStore((state) => state.geoData);
        //  useStore((data) => state.setGeoData(data))
        setCoords([coords]);
      }
    }
  }
    

  return (
    <Box component="form" p={2} method="post" onSubmit={handleSubmit}>
      <Box px={3} py={{ xs: 2, sm: 6 }}>
        <Typography variant="h4" mb={1}>
          Address to Latitude & Longitude
        </Typography>
        <Typography variant="body2" color="text" mb={2}>
          To pinpoint a location, you can type in the name of a place, city, state, or address, or
          click the location on the map to get the coordinates.
        </Typography>
      </Box>
      <Box pt={0.5} pb={3} px={3}>
        <Grid container>
          {/* ============ AddressInput ============ */}
          <AddressInput handleChild={handleChild} />
          {/* ============ Submit ============ */}
          <Grid item xs={12} pr={1} mb={2}>
            <Button type="submit" variant="gradient" color="info">
              Submit
            </Button>
          </Grid>

          {/* ============ LatInput ============ */}
          <Grid item xs={12} pr={1} mb={2}>
            <Box>
              <Typography display="inline" variant="h6" fontWeight="regular" color="secondary">
                Latitude
              </Typography>
            </Box>
            <Box>
              <Input
                label={latInputElm ? "" : "Longitude"}
                type="text"
                fullWidth
                inputRef={latInputElm}
              />
            </Box>
          </Grid>
          {/* ============ LngInput ============ */}
          <Grid item xs={12} pr={1} mb={2}>
            <Box>
              <Typography display="inline" variant="h6" fontWeight="regular" color="secondary">
                Longitude
              </Typography>
            </Box>
            <Input
              label={lngInputElm ? "" : "Longitude"}
              type="text"
              fullWidth
              inputRef={lngInputElm}
            />
          </Grid>
          <Grid item xs={12} pr={1} mb={2}>
            <Box>
            </Box>
          
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Form;
