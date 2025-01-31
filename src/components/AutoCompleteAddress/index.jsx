/* eslint-disable jsx-a11y/no-autofocus */
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
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import useStore from 'store/mapStore';
import { getCitiesStartWith } from 'util/geocoder';
import { v4 as uuidv4 } from 'uuid';

export default function AutoCompleteAddress({ address, clear, submitOnSelect, onSubmit, icon, label, autoFocus }) {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const clearMapInputs = useStore((state) => state.clearMapInputs);
  const setMapInputState = useStore((state) => state.setMapInputState);
  const [overrideInput, setOverrideInput] = useState(false);

  const [capitalCities, setCapitalCities] = useState([]);
  const loading = open && options.length === 0;
  const popperVisibility = loading ? "hidden" : "visible"
  const modifiers = [
    {
      name: 'flip',
      options: {
        fallbackPlacements: [],
      },
    },
  ];

  const handleInputFocus = () => {
    
    if (inputValue.length > 2) {
      setOpen(true);
    }
  };
  const handleChange = async (event, newValue) => {
    if (typeof newValue === 'string') {
      return;
    }

    const displayName = `${newValue.city}, ${newValue.state}`;
    setInputValue(displayName);
    setValue(newValue); // Add this line
    setOverrideInput(false);
    const newValueData = { ...newValue, name: displayName };
    setOpen(false);
    setOptions(options.filter((option) => option.id !== newValue.id));

    handleSubmit(newValueData, label);
  };
  const handleSubmit = (formattedValue, label) => {
    if (submitOnSelect) {
      onSubmit(formattedValue, label);
    } else {
      return;
    }
  };



  function isCityCapital(shortHand, cityArray) {
    if (shortHand.length < 3) return false;
    // Format the shorthand to have the first letter uppercase and the rest lowercase
    const formattedShortHand = shortHand.charAt(0).toUpperCase() + shortHand.slice(1).toLowerCase();

    // Find and return the city object whose name starts with the formatted shorthand
    const match = cityArray.find((cityObject) => cityObject.city.startsWith(formattedShortHand));
    return match ? match : false;
  }
function reorderCities(targetCity, citiesObj) {
  // Convert the citiesObj to an array
  const citiesArr = Object.entries(citiesObj);

  // Find the index of the target city in the array
  const targetIndex = citiesArr.findIndex(
    ([key, value]) => value.city === targetCity.city && value.state === targetCity.state
  );

  // If the target city is not found, return the original object
  if (targetIndex === -1) return citiesObj;

  // Remove the target city from the array
  const [targetKey, targetValue] = citiesArr.splice(targetIndex, 1)[0];

  // Add the target city to the beginning of the array
  citiesArr.unshift([targetKey, targetValue]);

  // Convert the array back to an object
  const reorderedCities = Object.fromEntries(citiesArr);

  return reorderedCities;
}
  useEffect(() => {
    let active;
    if (inputValue === '') {
      setMapInputState(true);
      return undefined;
    }
    if (inputValue.length > 2) {
      active = true;

      if (active) {
        (async function () {
          let newOptions = [];
          const results = await getCitiesStartWith(inputValue);

          if (results) {
            const capitalCity = isCityCapital(inputValue, capitalCities);

            if (capitalCity) {
              
              const uid = uuidv4();
              const newOption = { ...capitalCity, id: uid, name: `${capitalCity.city}, ${capitalCity.state}` };
              const reorderedCities = reorderCities(newOption, results);
              newOptions = Object.values(reorderedCities).map((reorderedCity) => ({
                ...reorderedCity,
                name: `${reorderedCity.city}, ${reorderedCity.state}`,
              }));
                setOptions(newOptions);
            } else {
              newOptions = Object.values(results).map((result) => ({
                ...result,
                name: `${result.city}, ${result.state}`,
              }));
                setOptions(newOptions);
            }

          }
        })();
      }
    }
    return () => {
      active = false;
    };
  }, [inputValue]);

  // ...

  useEffect(() => {
    if (address && label !== 'Destination') {
      const uid = uuidv4();
      const newInputValue = { name: address, id: uid };
      if (options.length > 0) {
        setOptions([newInputValue, ...options]);
      }
      setOverrideInput(true);
      setValue(newInputValue);
    }
  }, [address, label]);
  useEffect(() => {
    if (clear && clearMapInputs) {
      setOverrideInput(true);
      setValue('');
      setInputValue(''); // Clear input value here
    }
    setOverrideInput(false);
  }, [clear, clearMapInputs]);

  useEffect(() => {
    const loadCapitalCities = async () => {
      // This will only be downloaded when this code runs
      const arrayModule = await import('./capitalCities.js');
      setCapitalCities(arrayModule.default);
    };

    loadCapitalCities();
  }, []);

  return (
    <Autocomplete
      freeSolo
      blurOnSelect
      id="mapbox-autocomplete-demo"
      getOptionLabel={(option) => (option && option.name ? option.name : inputValue)}
      filterOptions={(x) => x}
      options={options}
      loading={loading}
      loadingText="..."
      autoComplete
      disableClearable
      PopperComponent={(props) => (
        <Popper
          id="autocomplete-dropdown"
          {...props}
          open={open}
          modifiers={modifiers}
          popperOptions={{
            placement: 'bottom',
          }}
          sx={{ marginTop: 10, padding: 0,visibility:popperVisibility }}
        />
      )}
      sx={{
        '& .MuiInputBase-root': { padding: 0.6, position: 'relative' },
        '& .MuiAutocomplete-popupIndicator': { transform: 'none' },
      }}
      fullWidth
      filterSelectedOptions
      value={value}
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
          autoFocus={autoFocus ? autoFocus : false}
          size="small"
          {...params}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                <InputAdornment position="end">
                  {loading ? (
                    <Box sx={{ py: '8px', pl: '8px', pr:'18px', opacity: 0.5 }}>
                      <ClipLoader color="#1A73E8" size={20} />
                    </Box>
                  ) : icon ? (
                    <Box sx={{ pr: 0 }}>{icon}</Box>
                  ) : (
                    <IconButton type="submit" sx={{ pr: 2 }}>
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
      renderOption={(props, option, { index }) => {
        return (
          <li {...props} key={index}>
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
                <Typography variant="body2" color="text.secondary">
                  {option.name}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}
