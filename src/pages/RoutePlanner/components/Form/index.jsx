// Material Kit 2 PRO React components
import Box from 'components/Box';
// Material Kit 2 PRO React components
import DirectionsIcon from '@mui/icons-material/Directions';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import AddressInput from 'components/AddressInput';
import Button from 'components/Button';
import Typography from 'components/Typography';
import FilledInfoCard from 'components/Cards/InfoCards/FilledInfoCard';
import { useEffect, useRef, useState } from 'react';
import useStore from 'store/mapStore';
import { covertAddressToLatLng, extractCityAndState, getDirections, metersToMiles } from 'util/geocoder';
import { extractWords, fetchWeather, formatMarkerData, secondsToHoursMinutes } from 'util/helpers';
import { useGlobalValue } from 'util/mapState';
import { v4 as uuidv4 } from 'uuid';
const OriginInputIcon = () => {
  return (
    <Typography variant="h5" color="info">
      A
    </Typography>
  );
};
const DestinationInputIcon = () => {
  return (
    <Typography variant="h5" color="error">
      B
    </Typography>
  );
};
/* -------------------------------------------------------------------------- */
/*                                  ROUTE DATA                                */
/* -------------------------------------------------------------------------- */
function Form() {
  const formRef = useRef();

  const [coords, setCoords] = useGlobalValue();
  const [routeInfo, setRouteInfo] = useState(null);
  const updateMarkerData = useStore((state) => state.setMarkerData);
  const markerDataState = useStore((state) => state.markerData);
  const { setWeather, weather } = useStore((state) => ({
    setWeather: state.setWeather,
    weather: state.weather,
  }));
  const setMapZoom = useStore((state) => state.setMapZoom);
  const setUserLocationActive = useStore((state) => state.setUserLocationActive);
  const userLocationActive = useStore((state) => state.userLocationActive);
  const setMapInputState = useStore((state) => state.setMapInputState);
  const setRouteData = useStore((state) => state.setRouteData);
  const routeData = useStore((state) => state.routeData);
  const [directionsUrl, setDirectionsUrl] = useState(null);
  const { setErrorMessage, errorMessage } = useStore((state) => ({
    setErrorMessage: state.setErrorMessage,
    errorMessage: state.errorMessage,
  }));

  const { setLoading, loading } = useStore((state) => ({
    setLoading: state.setLoading,
    loading: state.loading,
  }));
  /* -------------------------------------------------------------------------- */
  /*                                  FUNCTIONS                                 */
  /* -------------------------------------------------------------------------- */
  async function handleSubmit(e) {
    e.preventDefault();

    const inputOne = e.target[0].value;
    const inputTwo = e.target[2].value;

    await handleFormInputs(inputOne, inputTwo);
    setLoading(false);
  }

  const handleFormInputs = async (inputOne, inputTwo) => {
    if (inputOne && inputTwo) {
      setLoading(true);
      const mapBoxDataOrigin = await covertAddressToLatLng(inputOne);
      const mapBoxDataDestination = await covertAddressToLatLng(inputTwo);

      if (mapBoxDataOrigin && mapBoxDataDestination) {
        if (mapBoxDataOrigin.features.length > 0 && mapBoxDataDestination.features.length > 0) {
          setCoords([coords]);

          const markerDataOriginFormatted = generateMarkerDataOrigin(mapBoxDataOrigin);
          const markerDataDestinationFormatted = generateMarkerDataDestination(mapBoxDataDestination);
          const markerData = [markerDataOriginFormatted[0], markerDataDestinationFormatted[0]];

          const updateRouteData = await updateRoute(markerData);
          if (updateRouteData) {
            setUserLocationActive(false);
            setMapInputState(false);
            const formattedMarkerData = formatMarkerData(markerData);
            updateMarkerData(formattedMarkerData);
            setMapZoom(5);
            const googleMapsDirectionUrl = generateGoogleMapsUrl(markerData);
            setDirectionsUrl(googleMapsDirectionUrl);
            const weatherOrigin = await fetchWeather(markerData[0].lat, markerData[0].lng);
            const weatherDestination = await fetchWeather(markerData[1].lat, markerData[1].lng);
            if (weatherOrigin && weatherDestination) {
              const iconOrigin = weatherOrigin.weather[0].icon.slice(0, -1);
              const iconDestination = weatherDestination.weather[0].icon.slice(0, -1);
              const iconOriginPath = `assets/images/weather/${iconOrigin}.png`;
              const iconDestinationPath = `assets/images/weather/${iconDestination}.png`;
              const currentWeatherOrigin = weatherOrigin.main.temp;
              const currentWeatherDestination = weatherDestination.main.temp;

              const extractedAddressOrigin = extractCityAndState(mapBoxDataOrigin);

              const extractedAddressDestination = extractCityAndState(mapBoxDataDestination);
              const originCity = extractedAddressOrigin ? extractedAddressOrigin.city : '';
              const destinationCity = extractedAddressDestination ? extractedAddressDestination.city : '';

              const weatherData = {
                origin: {
                  address: originCity,
                  icon: iconOriginPath,
                  temp: currentWeatherOrigin,
                },
                destination: {
                  address: destinationCity,
                  icon: iconDestinationPath,
                  temp: currentWeatherDestination,
                },
              };

              setWeather(weatherData);
            }
          } else {
            setErrorMessage(true);
            setTimeout(() => {
              setErrorMessage(false);
            }, 500);
          }
        }
      }
    }
  };
  const handleChildSubmit = (data) => {
    if (data) {
      const target = [formRef.current[0], 1, { value: data.name }];
      const e = {
        target: target,
        preventDefault: () => {},
      };

      handleSubmit(e);
    }
  };
  const updateRoute = async (markerData) => {
    if (markerData && markerData.length > 1) {
      try {
        const data = await getDirections(markerData[0], markerData[1]);
        if (data) {
          setRouteData(data);
          return data;
        } else {
          return;
        }
      } catch (err) {
        console.error('Error fetching route:', err);
      }
    }
  };
  const generateMarkerDataOrigin = (mapBoxData) => {
    let lat = mapBoxData.features[0].geometry.coordinates[1];
    let lng = mapBoxData.features[0].geometry.coordinates[0];

    const address = mapBoxData.features[0].place_name;
    const wikiData = mapBoxData.features[0].properties.wikidata;
    const uid = uuidv4();
    const cityAndState = extractCityAndState(mapBoxData);
    const city = cityAndState && cityAndState.city ? cityAndState.city : null;
    const state = cityAndState && cityAndState.state ? cityAndState.state : null;

    const markerData = [
      {
        id: uid,
        lat: lat,
        lng: lng,
        title: address,
        userLocation: false,
        wikiData: wikiData,
        city: city,
        state: state,
      },
    ];
    return markerData;
  };
  const generateMarkerDataDestination = (mapBoxData) => {
    let lat = mapBoxData.features[0].geometry.coordinates[1];
    let lng = mapBoxData.features[0].geometry.coordinates[0];

    const address = mapBoxData.features[0].place_name;
    const wikiData = mapBoxData.features[0].properties.wikidata;
    const uid = uuidv4();
    const cityAndState = extractCityAndState(mapBoxData);

    const city = cityAndState && cityAndState.city ? cityAndState.city : null;
    const state = cityAndState && cityAndState.state ? cityAndState.state : null;

    const markerData = [
      {
        id: uid,
        lat: lat,
        lng: lng,
        title: address,
        userLocation: false,
        wikiData: wikiData,
        city: city,
        state: state,
      },
    ];
    return markerData;
  };
  const generateGoogleMapsUrl = (markerData) => {
    if (markerData.length !== 2) {
      return;
    }

    const baseUrl = 'https://www.google.com/maps/dir/';
    const location1 = markerData[0].title.replace(', United States', '');
    const location2 = markerData[1].title.replace(', United States', '');

    return `${baseUrl}${encodeURIComponent(location1)}/${encodeURIComponent(location2)}/`;
  };
  useEffect(() => {
    if (userLocationActive === false) {
      let leafletBarElement = document.querySelector('.leaflet-bar');

      if (leafletBarElement) {
        let classes = leafletBarElement.classList;
        // Create an array to store the classes that need to be removed
        let classesToRemove = [];
        // Loop through each class and if it contains 'locateActive', add it to classesToRemove
        for (let i = 0; i < classes.length; i++) {
          if (classes[i].includes('locateActive')) {
            classesToRemove.push(classes[i]);
          }
        }
        // Loop through each class in classesToRemove and remove it from the element
        for (let i = 0; i < classesToRemove.length; i++) {
          leafletBarElement.classList.remove(classesToRemove[i]);
        }
      }
    }
  }, [userLocationActive]);

  useEffect(() => {
    if (routeData) {
      //The distance between each pair of coordinates, in meters.
      const distance = routeData.routes[0].distance ? Math.round(metersToMiles(routeData.routes[0].distance)) : null;
      // The duration between each pair of coordinates, in seconds.
      const duration = routeData.routes[0].duration ? secondsToHoursMinutes(routeData.routes[0].duration) : null;
      if (distance && duration) {
        let data = {
          ...duration,
          distance: distance,
        };
        setRouteInfo(data);
      }
    }
  }, [routeData]);
  useEffect(() => {
    if (markerDataState) {
      const cityOrigin = markerDataState[0].city;
      const cityDestination = markerDataState[1].city;
      if (cityOrigin == cityDestination) {
      }
    }
  }, [markerDataState]);
  return (
    <Box component="form" p={2} method="post" onSubmit={handleSubmit} ref={formRef}>
      <Box px={{ xs: 0, sm: 3 }} py={{ xs: 2, sm: 3 }}>
        <Typography variant="h4" mb={1}>
          Route Planner
        </Typography>
        <Typography variant="body2" color="text" mb={1}>
          To pinpoint a location, you can type in the name of a place, city, state, or address, or click the location on
          the map to get the coordinates.
        </Typography>
      </Box>
      <Box px={{ xs: 0, sm: 3 }} py={{ xs: 2, sm: 6 }}>
        <Grid container>
          {/* ============ ORGIN-AddressInput ============ */}
          <AddressInput
            label="Origin"
            readOnly={false}
            defaultValue="Atlanta, GA"
            icon={<OriginInputIcon />}
            disableChangeEventListener={true}
            index={0}
          />
          {/* ============ DESTINATION-AddressInput ============ */}
          <AddressInput
            label="Destination"
            readOnly={false}
            disableChangeEventListener={true}
            defaultValue="Austin, TX"
            icon={<DestinationInputIcon />}
            submitOnSelect={true}
            onSubmit={handleChildSubmit}
            index={1}
          />
          {/* ============ Submit ============ */}
          <Grid item xs={12} pr={1} mb={2}>
            {loading ? (
              <Button type="button" variant="gradient" color="info">
                <CircularProgress color="light" size={14} />
                &nbsp; Submit
              </Button>
            ) : (
              <Button type="submit" variant="gradient" color="info">
                Submit
              </Button>
            )}
          </Grid>
          {/* ============ Directions Card ============ */}
          {/*
          
           {
            "hours": 14, (hours could be null)
            "minutes": 36, 
            "distance": 925
            } 
            */}
          <Grid item xs={12} pr={1} mb={2}>
            {routeInfo && (
              <FilledInfoCard
                color="dark"
                variant="contained"
                title={
                  routeInfo.hours && routeInfo.minutes
                    ? `${routeInfo.hours} hours ${routeInfo.minutes} minutes`
                    : routeInfo.hours
                    ? `${routeInfo.hours} hours`
                    : `${routeInfo.minutes} minutes`
                }
                description={routeInfo.distance ? `${routeInfo.distance} miles` : ''}
                action={
                  directionsUrl
                    ? {
                        type: 'external',
                        route: directionsUrl,
                        label: 'Directions',
                        iconComponent: <DirectionsIcon color="info" fontSize="large" sx={{ ml: '5px' }} />,
                      }
                    : null
                }
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
export default Form;
