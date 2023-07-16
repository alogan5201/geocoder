import { useState, useEffect, useMemo, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import { debounce } from '@mui/material/utils';
import { fetchAutocomplete, retrieveAutocomplete } from 'util/geocoder';
import { v4 as uuidv4 } from 'uuid';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import useStore from 'store/mapStore';
import Popper from '@mui/material/Popper';
export default function AutoCompleteAddress({
    address,
    clear,
    submitOnSelect,
    onSubmit,
    icon,
    label,
}) {
    const autocompleteRef = useRef(null);
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const [open, setOpen] = useState(false);
    const setMapInputState = useStore((state) => state.setMapInputState);
    const [overrideInput, setOverrideInput] = useState(false);
    const setFlyToMarker = useStore((state) => state.setFlyToMarker);
    const [origin, setOrigin] = useState(null);
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
        const id = newValue.mapbox_id;
        const retrieveSuggestion = await retrieveAutocomplete(id);
        const placeFormatted = retrieveSuggestion
            ? retrieveSuggestion.features[0].properties.full_address
            : null;
        const newInputValue = !placeFormatted
            ? newValue.name
            : placeFormatted.includes(', United States of America')
            ? placeFormatted.replace(', United States of America', '')
            : placeFormatted;
        const formattedValue = {
            name: newInputValue,
            mapbox_id: newValue.mapbox_id,
        };
        setOptions(formattedValue ? [formattedValue, ...options] : options);
        console.log("🚀 ~ handleChange ~ formattedValue:", formattedValue)
       //setValue(formattedValue);
        setOverrideInput(true);
        setOpen(false);
        handleSubmit(formattedValue);
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
    }, [value, inputValue, fetch]);
    useEffect(() => {
        if (address) {
            const uid = uuidv4();
            const newInputValue = { name: address, id: uid };
            setOverrideInput(true);
            console.log("🚀 ~ useEffect ~ newInputValue:", newInputValue)
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
            disablePortal={true}
            freeSolo
            id="mapbox-autocomplete-demo"
            getOptionLabel={(option) => option.name}
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
                    const isOpenAndLengthLessThanThree =
                        open && isLengthLessThanThree;
                    const isNotOpenAndLengthGreaterThanThree =
                        !open && !isLengthLessThanThree;
                    if (
                        isOpenAndLengthLessThanThree ||
                        isNotOpenAndLengthGreaterThanThree
                    ) {
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
                                        <Box sx={{ mr: 2 }}>{icon}</Box>
                                    ) : (
                                        <IconButton
                                            type="button"
                                            sx={{ mr: 2 }}
                                        >
                                            <SearchIcon
                                                fontSize="medium"
                                                color="info"
                                            />
                                        </IconButton>
                                    )}
                                </InputAdornment>
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                    fullWidth
                    onBlur={() => {
                        const savedInputValue = inputValue;
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
                                <LocationOnIcon
                                    sx={{ color: 'text.secondary' }}
                                />
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
                                            fontWeight: part.highlight
                                                ? 'bold'
                                                : 'regular',
                                        }}
                                    >
                                        {part.text.name}
                                    </Box>
                                ))}
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
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
