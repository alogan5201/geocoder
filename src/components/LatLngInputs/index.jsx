import Box from "components/Box";
import Grid from "@mui/material/Grid";
import AddressInput from "components/AddressInput";
import Button from "components/Button";
import Input from "components/Input";
import Typography from "components/Typography";
import { useEffect, useRef, useState } from "react";
import useStore from "store/mapStore";
import { covertAddressToLatLng } from "util/geocoder";
import { extractWords, test } from "util/helpers";
import { useGlobalValue } from "util/mapState";
import { clear } from "localforage";


export default function LatLngInputs(props){
   const markerData = useStore((state) => state.markerData);
   const clearMapInputs = useStore((state) => state.clearMapInputs);
     const setMapInputState = useStore((state) => state.setMapInputState);

      const latInputElm = useRef(null);
      const lngInputElm = useRef(null);
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

    if (val.length === 0 && props.readOnly === false) {
      setMapInputState(true);
    }
    else if(val.length === 1) {
      setMapInputState(false);
    }
  }
        useEffect(() => {
          if (markerData && props && props.readOnly === true) {
            let lat = markerData[0].lat;
            let lng = markerData[0].lng;
            latInputElm.current.value = lat;
            lngInputElm.current.value = lng;
          }
       
        }, [markerData]);
        useEffect(() => {
            if (clearMapInputs){
              // ! UNCOMMENT FOR PRODUCTION
         latInputElm.current.value = "";
         lngInputElm.current.value = "";
          }
        }, [clearMapInputs]);
    return (
      <>
        {/* ============ LatInput ============ */}
        <Grid item xs={12} pr={1} mb={2}>
          <Box>
            <Typography display="inline" variant="h6" fontWeight="regular" color="secondary">
              Latitude
            </Typography>
          </Box>
          <Box>
            <Input
              defaultValue={props.defaultValue ? props.defaultValue[0] : ""}
              onChange={handleChange}
              label={latInputElm ? "" : "Latitude"}
              type="text"
              fullWidth
              inputRef={latInputElm}
              InputProps={{ readOnly: props.readOnly }}
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
            defaultValue={props.defaultValue ? props.defaultValue[1] : ""}
            label={lngInputElm ? "" : "Longitude"}
            type="text"
            fullWidth
            inputRef={lngInputElm}
            InputProps={{ readOnly: props.readOnly }}
          />
        </Grid>
      </>
    );
} 