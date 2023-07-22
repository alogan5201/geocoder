import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Popper from '@mui/material/Popper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { debounce } from '@mui/material/utils';
import parse from 'autosuggest-highlight/parse';
import { useEffect, useMemo, useState } from 'react';
import useStore from 'store/mapStore';
import { fetchAutocomplete } from 'util/geocoder';

export default function AutoCompleteAddress({ address, clear, submitOnSelect, onSubmit, icon, label }) {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const setMapInputState = useStore((state) => state.setMapInputState);
  const [overrideInput, setOverrideInput] = useState(false);

  const modifiers = [
    {
      name: 'flip',
      options: {
        fallbackPlacements: [],
      },
    },
  ];
  const fetch = useMemo(
    () =>
      debounce(async (request, callback) => {
        const data = await fetchAutocomplete(request.input);
        callback(data.suggestions);
      }, 400),
    []
  );
  const handleInputFocus = () => {
    if (inputValue.length > 2 && !overrideInput) {
      setOpen(true);
    }
  };
  const handleChange = async (event, newValue) => {
    if (typeof newValue === 'string') {
      return;
    }
    console.log(`newValue = ${JSON.stringify(newValue)}`)
    
    setOptions(newValue ? [newValue, ...options] : options);

    setOverrideInput(true);
    setOpen(false);
// * handleSubmit(formattedValue);
  };
  const handleSubmit = (formattedValue, label) => {
    if (submitOnSelect) {
      onSubmit(formattedValue, label);
    } else {
      return;
    }
  };
  useEffect(() => {
    let active = true;
    if (inputValue === '') {
      setMapInputState(true);
      //setOptions(value ? [value] : []);
      return undefined;
    }
    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (results) {
          //  const uid = uuidv4();
          let resultsWithId = results.map(({ name, mapbox_id }) => ({
            name,
            mapbox_id,
          }));
          newOptions = [...newOptions, ...resultsWithId];
        }
        setOptions(newOptions);
      }
    });
    return () => {
      active = false;
    };
  }, [inputValue, fetch]);
  useEffect(() => {
    if (address) {
      setOverrideInput(true);

      // setValue(newInputValue);
    }
  }, [address, label]);
  useEffect(() => {
    if (clear) {
      setInputValue('');
    }
  }, [clear]);
  return (
    <Autocomplete
      freeSolo
      id="mapbox-autocomplete-demo"
      getOptionLabel={(option) => (option && option.name ? option.name : inputValue)}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      disableClearable
      PopperComponent={(props) => (
        <Popper
          {...props}
          open={open}
          modifiers={modifiers}
          popperOptions={{
            placement: 'bottom',
          }}
          sx={{ marginTop: 10 }}
        />
      )}
      sx={{
        '& .MuiInputBase-root': { padding: 0.6, position: 'relative' },
        '& .MuiAutocomplete-popupIndicator': { transform: 'none' },
      }}
      fullWidth
      filterSelectedOptions
      noOptionsText=""
      onChange={handleChange}
      onInputChange={(_, value) => {
        if (!overrideInput) {
          const isLengthLessThanThree = value.length < 3;
          const isOpenAndLengthLessThanThree = open && isLengthLessThanThree;
          const isNotOpenAndLengthGreaterThanThree = !open && !isLengthLessThanThree;
          if (isOpenAndLengthLessThanThree || isNotOpenAndLengthGreaterThanThree) {
            setOpen(!open);
          }
          setInputValue(value);
        }
        setOverrideInput(false);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                <InputAdornment position="end">
                  {icon ? (
                    <Box sx={{ pr: 2 }}>{icon}</Box>
                  ) : (
                    <IconButton type="button" sx={{ pr: 2 }}>
                      <SearchIcon fontSize="medium" color="info" />
                    </IconButton>
                  )}
                </InputAdornment>
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          fullWidth
          onBlur={() => {
            setOpen(false);
          }}
          onFocus={handleInputFocus}
        />
      )}
      renderOption={(props, option) => {
        const id = option.mapbox_id;
        const parts = parse(option, []);
        // [0].text.mapbox_id
        return (
          <li {...props} key={id}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: 'flex', width: 44 }}>
                <LocationOnIcon sx={{ color: 'text.secondary' }} />
              </Grid>
              <Grid
                item
                sx={{
                  width: 'calc(100% - 44px)',
                  wordWrap: 'break-word',
                }}
              >
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{
                      fontWeight: part.highlight ? 'bold' : 'regular',
                    }}
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
