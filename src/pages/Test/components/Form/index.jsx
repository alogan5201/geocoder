// Material Kit 2 PRO React components
import Box from "components/Box";

// Material Kit 2 PRO React components
import Grid from "@mui/material/Grid";
import AddressInput from "components/AddressInput";
import Button from "components/Button";
import Input from "components/Input";
import { useRef,useEffect } from "react";
import { extractWords, test,tron} from "util/helpers";
import {covertAddressToLatLng} from "util/geocoder"
import { useGlobalGeoData, useGlobalValue } from "util/mapState";
import Typography from "components/Typography";
import InputOutlined from "components/InputOutlined";
import useStore from "store/mapStore";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
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
  useEffect(() => {
    test()
  }, []);
  const handleChild = (callback) => {
    // Here, you have the function from the child.
    callback();
  };
  const [coords, setCoords] = useGlobalValue();
  const latInputElm = useRef(null);
  const lngInputElm = useRef(null);
  const updateGeoData = useStore((state) => state.setGeoData);
  const updateMarkerData = useStore((state) => state.setMarkerData);
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
      const mapBoxData = await covertAddressToLatLng(inputOne);
      if (mapBoxData && mapBoxData.features.length > 0) {

let lat = mapBoxData.features[0].geometry.coordinates[1]
let lng = mapBoxData.features[0].geometry.coordinates[0]
        setCoords([coords]);
        const address = mapBoxData.features[0].place_name
      
        const markerData = [
          {
           id: "1",
           lat: lat,
           lng: lng,
           title: address
             }
      ]
      updateMarkerData(markerData)
        updateGeoData(mapBoxData.features[0]);

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
