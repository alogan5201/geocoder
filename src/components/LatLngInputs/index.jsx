// Import required dependencies and components
import Grid from "@mui/material/Grid";
import Box from "components/Box";
import Input from "components/Input";
import Typography from "components/Typography";
import { useEffect, useRef } from "react";
import useStore from "store/mapStore";
import { shallow } from "zustand/shallow";

// LatLngInputs functional component
export default function LatLngInputs({ defaultValue, readOnly }) {
  // Utilize the state from the map store
  const markerData = useStore((state) => state.markerData,shallow);
  const clearMapInputs = useStore((state) => state.clearMapInputs);
  const setMapInputState = useStore((state) => state.setMapInputState);
  const locationMarkerData = useStore((state) => state.locationMarkerData);

  // Define refs for latitude and longitude inputs
  const latInputElm = useRef(null);
  const lngInputElm = useRef(null);

  // Handler for input changes
  const handleChange = (e) => {
    // Destructure value from event target
    const { value: val } = e.target;

    // Check if the input is empty and not read-only, then update the map input state accordingly
    if (val.length === 0 && !readOnly) {
      setMapInputState(true);
    } else if (val.length === 1) {
      setMapInputState(false);
    }
  };

  // useEffect hook to update input values based on marker data and read-only state
  useEffect(() => {
        const markerDataPoints = markerData
          ? markerData
          : locationMarkerData
          ? locationMarkerData
          : null;

    if (markerDataPoints) {
      const { lat, lng } = markerDataPoints[0];
      latInputElm.current.value = lat;
      lngInputElm.current.value = lng;
    }
  }, [markerData, locationMarkerData]);

  // useEffect hook to clear input values based on clearMapInputs state
  useEffect(() => {
    if (clearMapInputs) {
      latInputElm.current.value = "";
      lngInputElm.current.value = "";
    }
  }, [clearMapInputs]);

  // Return the JSX elements for the component
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
            name="lat"
            autoComplete="off"
            defaultValue={defaultValue ? defaultValue[0] : ""}
            onChange={handleChange}
            label=""
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
          name="lng"
          autoComplete="off"
          defaultValue={defaultValue ? defaultValue[1] : ""}
          label=""
          type="text"
          fullWidth
          inputRef={lngInputElm}
        />
      </Grid>
    </>
  );
}
