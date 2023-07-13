import Grid from "@mui/material/Grid";
import Input from "components/Input";
// @mui material components
import AutoCompleteAddress from "components/AutoCompleteAddress";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import useStore from "store/mapStore";
// @mui icons
import Box from "components/Box";
import Typography from "components/Typography";
import { marker } from "leaflet";

// Material Kit 2 PRO React components
function AddressInput({ onSubmit, ...props }) {
  const markerData = useStore((state) => state.markerData);
    const resetMapData = useStore((state) => state.resetMapData);
const markerState = useState(markerData)
  const clearMapInputs = useStore((state) => state.clearMapInputs);
  const setMapInputState = useStore((state) => state.setMapInputState);
  const addressInputElm = useRef(null);
  const { pathname } = useLocation();
  const [address, setAddress] = useState(null);
  const userLocationActive = useStore((state) => state.userLocationActive);

  function handleChange(e) {
    let val = e.target.value;

    if (val.length === 0 && props.readOnly === false) {
      setMapInputState(true);
    } else if (val.length === 1 && props.readOnly === false) {
      setMapInputState(false);
    }
  }
  useEffect(() => {
    if (clearMapInputs && props.readOnly) {
      addressInputElm.current.value = "";
      setAddress(null);
    }
  }, [clearMapInputs]);

  useEffect(() => {
    if (markerData) {
       console.log(`markerData: ${JSON.stringify(markerData)}`)
       const addr = markerData[0].title.includes(", United States")
         ? markerData[0].title.replace(", United States", "")
         : markerData[0].title;
       console.log(markerData);
       setAddress(addr);
       if (props.readOnly) {
       addressInputElm.current.value = addr;
       }
     }

  }, [markerData]);
  return (
    <Grid item xs={12} pr={1} mb={3}>
      <Box>
        <Typography display="inline" variant="h6" fontWeight="regular" color="secondary">
          {props.label ? props.label : "Address"}
        </Typography>
      </Box>
      {props.readOnly ? (
        <Input
          inputRef={addressInputElm}
          label={addressInputElm ? "" : "Address"}
          type="text"
          fullWidth
          InputProps={{ readOnly: props.readOnly }}
        />
      ) : (
        <AutoCompleteAddress

          address={address}
          label={props.label}
          submitOnSelect={props.submitOnSelect}
          onSubmit={onSubmit}
          icon={props.icon ? props.icon : null}
        />
      )}
    </Grid>
  );
}

export default AddressInput;
