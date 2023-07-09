import Grid from "@mui/material/Grid";
import Input from "components/Input";
// @mui material components
import InputAdornment from "@mui/material/InputAdornment";
import useStore from "store/mapStore";
import IconButton from "@mui/material/IconButton";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

// @mui icons
import SearchIcon from "@mui/icons-material/Search";
import { a } from "@react-spring/web";

// Material Kit 2 PRO React components
function AddressInput(props) {
  const markerData = useStore((state) => state.markerData);
  const { pathname } = useLocation();

  const clearMapInputs = useStore((state) => state.clearMapInputs);
  const setMapInputState = useStore((state) => state.setMapInputState);
  const addressInputElm = useRef(null);
  function handleChange(e) {
    let val = e.target.value;

    if (val.length === 0 && props.readOnly === false) {
      setMapInputState(true);
    } else if(val.length === 1 && props.readOnly === false) {
      setMapInputState(false);
    }
  }
  useEffect(() => {
    if (clearMapInputs) {
      addressInputElm.current.value = "";
    }
  }, [clearMapInputs]);

  useEffect(() => {
    if (pathname.includes("route-planner")){
      return
    }
      else if (markerData) {
        // [0].title
        const address = markerData[0].title.includes(", United States")
          ? markerData[0].title.replace(", United States", "")
          : markerData[0].title;

        addressInputElm.current.value = address;
      }
  }, [markerData]);
  return (
    <Grid item xs={12} pr={1} mb={3}>
      {props.readOnly === false ? (
        <Input
          inputRef={addressInputElm}
          onChange={props.disableChangeEventListener ? null : handleChange}
          fullWidth
          type="text"
          label={addressInputElm ? "" : "Address"}
          InputProps={{
            readOnly: props.readOnly,
            endAdornment: (
              <InputAdornment position="start">
                {props.icon ? (
                  props.icon
                ) : (
                  <IconButton type="submit">
                    <SearchIcon fontSize="medium" color="info" />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />
      ) : (
        <Input
          inputRef={addressInputElm}
          label={addressInputElm ? "" : "Address"}
          type="text"
          fullWidth
          InputProps={{ readOnly: props.readOnly }}
        />
      )}
    </Grid>
  );
}

export default AddressInput;
