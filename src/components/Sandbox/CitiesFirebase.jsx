import {
  useState,
  useCallback,
  useEffect,
  Fragment
} from "react";
import Button from "components/Button"
import { getCitiesStartWith } from "util/geocoder";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
const CitiesFirebase = () => {
   const [open, setOpen] = useState(false);
   const [cachedCities, setCachedCities] = useState([])
   const [options, setOptions] = useState(cachedCities);
   const loading = open && options.length === 0;
   const queryLengths = [1, 3, 6, 9];
  const fetchCities = useCallback(async (inputValue) => {
    let active
      if (inputValue.length === 0) {
        setCachedCities([]);
        setOptions([]);
        setOpen(false);
        return undefined;
      }
    if (inputValue) {
  
      if (inputValue.length > 0 && queryLengths.includes(inputValue.length)) {
       active = true
        const cities = await getCitiesStartWith(inputValue);
        if (cities && active) {
          console.log(cities)
          const formatted = Object.entries(cities).map(([key, value]) => ({
            title: `${value.city}, ${value.state}`,
            id: value.id,
          }));
          setOptions(formatted);
          setCachedCities(formatted)
        }
      }
    }
      return () => {
       active = false;
     };
   }, [loading]);
   useEffect(() => {
     if (!open) {
       setOptions([]);
     }
   }, [open]);
  const handleClick = async (e) => { 
    e.preventDefault();
    const cities = await getCitiesStartWith('A');
    console.log(cities)
  }
  return (
    <>
      <Button type="button" variant="gradient" color="info" onClick={handleClick} sx={{mb:5}}>
        Get Cities
      </Button>
      <Autocomplete
        id="asynchronous-demo"
        sx={{ width: 300,mb:5 }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        isOptionEqualToValue={(option, value) => option.title === value.title}
        getOptionLabel={(option) => option.title}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Asynchronous"
            onChange={(event) => fetchCities(event.target.value)}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </Fragment>
              ),
            }}
          />
        )}
      />
    </>
  );
}

export default CitiesFirebase;