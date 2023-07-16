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
import { shallow } from "zustand/shallow";

// Material Kit 2 PRO React components
function AddressInput({ onSubmit, ...props }) {
  const markerData = useStore((state) => state.markerData);
    const resetMapData = useStore((state) => state.resetMapData);
  const clearMapInputs = useStore((state) => state.clearMapInputs);
  const setMapInputState = useStore((state) => state.setMapInputState);
  const addressInputElm = useRef(null);
  const { pathname } = useLocation();
  const [address, setAddress] = useState(null);
  const userLocationActive = useStore((state) => state.userLocationActive);
  const locationMarkerData = useStore((state) => state.locationMarkerData);

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
    if (locationMarkerData && props.label === "Destination") {
      return;
    }

    else if (markerData || locationMarkerData) {
      const markerDataPoints = markerData ? markerData : locationMarkerData ? locationMarkerData : null;

      const index = props.index ? props.index : 0;
      
      const addressData = markerDataPoints[index].title.includes(", United States")
        ? markerDataPoints[index].title.replace(", United States", "")
        : markerDataPoints[index].title;
    
      setAddress(addressData);
      console.log("🚀 ~ useEffect ~ addressData:", addressData)
      
        if(props.readOnly){
          addressInputElm.current.value = addressData;
        }
    }
  }, [markerData, locationMarkerData]);
  return (
    <Grid item xs={12} pr={1} mb={3}>
      {props.label && (
        <Box>
          <Typography display="inline" variant="h6" fontWeight="regular" color="secondary">
            {props.label}
          </Typography>
        </Box>
      )}

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
