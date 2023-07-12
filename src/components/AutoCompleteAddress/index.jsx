import {useState, useEffect, useMemo} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";
import { debounce } from "@mui/material/utils";
import { fetchAutocomplete } from "util/geocoder";
import { v4 as uuidv4 } from "uuid";
import SearchIcon from "@mui/icons-material/Search";

export default function AutoCompleteAddress() {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const fetch = useMemo(
    () =>
      debounce(async (request, callback) => {
        const data = await fetchAutocomplete(request.input);
        callback(data.suggestions);
      }, 400),
    []
  );

  useEffect(() => {
    let active = true;

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];
        
        if (value) {
        
          newOptions = [value];
        }

        if (results) {
          const uid = uuidv4();
          let resultsWithId = results.map(({ name, mapbox_id }) => ({ name, mapbox_id }));

          newOptions = [...newOptions, ...resultsWithId];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <Autocomplete
      open={open}
      id="mapbox-autocomplete-demo"
      getOptionLabel={(option) => option.name}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      disableClearable
      sx={{
        "& .MuiInputBase-root": { padding: 0.6 },
        "& .MuiAutocomplete-popupIndicator": { transform: "none" },
      }}
      fullWidth
      filterSelectedOptions
      value={value}
      noOptionsText=""
      popupIcon={
        <SearchIcon
          fontSize="medium"
          color="info"
          sx={{
           mr:2.5
          }}
        />
      }
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        setOpen(false);
      }}
      onInputChange={(_, value) => {
        if (value.length < 3) {
          if (open) setOpen(false);
        } else {
          if (!open) {
            setInputValue(value);
            setOpen(true);
          }
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          onBlur={() => setOpen(false)} // close dropdown when input loses focus
        />
      )}
      renderOption={(props, option) => {
        const parts = parse(option, []);

        // [0].text.mapbox_id
        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: "flex", width: 44 }}>
                <LocationOnIcon sx={{ color: "text.secondary" }} />
              </Grid>
              <Grid item sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}>
                {parts.map((part, index) => (
                  <Box
                    key={part.text.mapbox_id}
                    component="span"
                    sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
                  >
                    {part.text.name}
                  </Box>
                ))}
                <Typography variant="body2" color="text.secondary">
                  {option.formatted_address}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}
