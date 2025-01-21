import Box from 'components/Box';

import DirectionsIcon from '@mui/icons-material/Directions';
import Grid from '@mui/material/Grid';
import AddressInput from 'components/AddressInput';
import Button from 'components/Button';
import Typography from 'components/Typography';
import FilledInfoCard from 'components/Cards/InfoCards/FilledInfoCard';
import { useEffect, useRef, useState } from 'react';
import useStore from 'store/mapStore';
import { covertAddressToLatLng, extractCityAndState, getDirections, metersToMiles } from 'util/geocoder';
import { useWindowSize } from 'react-use';
import { ClipLoader } from 'react-spinners';

import {
  fetchWeather,
  formatMarkerData,
  secondsToHoursMinutes,
  retrieveWeatherIconUrl,
  mobileScrollTo,
} from 'util/helpers';
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
  const { width } = useWindowSize();
  const [coords, setCoords] = useGlobalValue();
  const [routeInfo, setRouteInfo] = useState(null);
  const setMarkerData = useStore((state) => state.setMarkerData);
  const setJourneyInsightsPromisesResolved = useStore((state) => state.setJourneyInsightsPromisesResolved);
  const { setWeather } = useStore((state) => ({
    setWeather: state.setWeather,
  }));
  const setHideAllLayers = useStore((state) => state.setHideAllLayers);
  const setMapZoom = useStore((state) => state.setMapZoom);
  const setUserLocationActive = useStore((state) => state.setUserLocationActive);
  const userLocationActive = useStore((state) => state.userLocationActive);
  const setMapInputState = useStore((state) => state.setMapInputState);
  const setRouteData = useStore((state) => state.setRouteData);
  const routeData = useStore((state) => state.routeData);
  const [directionsUrl, setDirectionsUrl] = useState(null);
  const { setErrorMessage } = useStore((state) => ({
    setErrorMessage: state.setErrorMessage,
  }));
  const [loading, setLoading] = useState(false);

  /* -------------------------------------------------------------------------- */
  /*                                  FUNCTIONS                                 */
  /* -------------------------------------------------------------------------- */
  async function handleSubmit(e) {
    e.preventDefault();
    const inputOne = e.target[0].value;
    const inputTwo = e.target[2].value;
    await handleFormInputs(inputOne, inputTwo);
  }

  const handleFormInputs = async (inputOne, inputTwo) => {
    if (inputOne && inputTwo) {
      setTimeout(() => {
        setLoading(true);
      }, 500);
      try {
        const [mapBoxDataOrigin, mapBoxDataDestination] = await Promise.all([
          covertAddressToLatLng(inputOne),
          covertAddressToLatLng(inputTwo),
        ]);

        if (
          mapBoxDataOrigin &&
          mapBoxDataDestination &&
          mapBoxDataOrigin.features.length > 0 &&
          mapBoxDataDestination.features.length > 0
        ) {
          setCoords([coords]);
          setHideAllLayers(true);

          const markerDataOriginFormatted = generateMarkerDataOrigin(mapBoxDataOrigin);
          const markerDataDestinationFormatted = generateMarkerDataDestination(mapBoxDataDestination);

          const markerData = [markerDataOriginFormatted[0], markerDataDestinationFormatted[0]];
          const formattedMarkerData = formatMarkerData(markerData);

          const updateRouteData = await updateRoute(markerData);
          if (updateRouteData) {
            setMarkerData(formattedMarkerData);
            setMapZoom(5);
            setUserLocationActive(false);
            setMapInputState(false);

            const googleMapsDirectionUrl = generateGoogleMapsUrl(markerData);
            setDirectionsUrl(googleMapsDirectionUrl);

            const [weatherOrigin, weatherDestination] = await Promise.all([
              fetchWeather(markerData[0].lat, markerData[0].lng),
              fetchWeather(markerData[1].lat, markerData[1].lng),
            ]);

            if (weatherOrigin && weatherDestination) {
              await setWeatherData(mapBoxDataOrigin, mapBoxDataDestination, weatherOrigin, weatherDestination);
              setTimeout(() => setHideAllLayers(false), 500);

              checkAllPromises([
                mapBoxDataOrigin,
                mapBoxDataDestination,
                updateRouteData,
                weatherOrigin,
                weatherDestination,
              ]);
            }
          } else {
            setErrorMessage(true);
            setTimeout(() => setErrorMessage(false), 500);
          }
        }
      } catch (error) {}
    }
    setTimeout(() => {
      setLoading(false);
      if (width < 992) {
        mobileScrollTo('map', 500);
      }
    }, 3000);
  };
  const setWeatherData = async (mapBoxDataOrigin, mapBoxDataDestination, weatherOrigin, weatherDestination) => {
    const iconOrigin = weatherOrigin.weather[0].icon.slice(0, -1);
    const iconDestination = weatherDestination.weather[0].icon.slice(0, -1);

    const [iconOriginUrl, iconDestinationUrl] = await Promise.all([
      retrieveWeatherIconUrl(iconOrigin),
      retrieveWeatherIconUrl(iconDestination),
    ]);

    const currentWeatherOrigin = weatherOrigin.main.temp;
    const currentWeatherDestination = weatherDestination.main.temp;

    const extractedAddressOrigin = extractCityAndState(mapBoxDataOrigin);
    const extractedAddressDestination = extractCityAndState(mapBoxDataDestination);

    const originCity = extractedAddressOrigin ? extractedAddressOrigin.city : '';
    const destinationCity = extractedAddressDestination ? extractedAddressDestination.city : '';

    const weatherData = {
      origin: {
        address: originCity,
        icon: iconOriginUrl,
        temp: currentWeatherOrigin,
      },
      destination: {
        address: destinationCity,
        icon: iconDestinationUrl,
        temp: currentWeatherDestination,
      },
    };

    setWeather(weatherData);
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
  const checkAllPromises = (promises) => {
    Promise.all(
      promises.map((promise) =>
        Promise.resolve(promise).then(
          () => true,
          () => false
        )
      )
    ).then((results) => {
      if (results.every((result) => result)) setJourneyInsightsPromisesResolved(true);
    });
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
        setTimeout(() => {
          setRouteInfo(data);
        }, 3000);
      }
    }
  }, [routeData]);
  return (
    <Box component="form" p={2} method="post" onSubmit={handleSubmit} ref={formRef}>
      <Box px={{ xs: 0, sm: 3 }} py={{ xs: 2, sm: 3 }}>
        <Typography variant="h4" mb={1}>
          Journey Insights
        </Typography>
        <Typography variant="body2" color="text" mb={1}>
          To pinpoint a location, you can type in the name of a place, city, state, or address, or click the location on
          the map to get the coordinates.
        </Typography>
      </Box>
      <Box
        px={{ xs: 0, sm: 3 }}
        py={{
          xs: 2,
          sm: 1.6,
        }}
      >
        <Grid container>
          {/* ============ ORGIN-AddressInput ============ */}
          <AddressInput
            label="Origin"
            readOnly={false}
            defaultValue="Atlanta, GA"
            icon={
              loading ? (
                <Box sx={{ marginTop: '7px', marginRight: '-7px', opacity: 0.5 }}>
                  <ClipLoader color="#1A73E8" size={20} />
                </Box>
              ) : (
                <OriginInputIcon />
              )
            }
            disableChangeEventListener={true}
            index={0}
          />
          {/* ============ DESTINATION-AddressInput ============ */}
          <AddressInput
            label="Destination"
            readOnly={false}
            disableChangeEventListener={true}
            defaultValue="Austin, TX"
            icon={
              loading ? (
                <Box sx={{ marginTop: '7px', marginRight: '-7px', opacity: 0.5 }}>
                  <ClipLoader color="#f44335" size={20} />
                </Box>
              ) : (
                <DestinationInputIcon />
              )
            }
            submitOnSelect={true}
            onSubmit={handleChildSubmit}
            index={1}
          />
          {/* ============ Submit ============ */}
          <Grid item xs={12} pr={1} mb={2}>
            <Button type="submit" variant="gradient" color="info">
              Submit
            </Button>
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
              <Box
                sx={{
                  transition: 'opacity 0.3s',
                  opacity: loading ? 0 : 1,
                }}
              >
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
                          label: 'Google Maps Directions',
                          iconComponent: <DirectionsIcon color="info" fontSize="large" sx={{ ml: '5px' }} />,
                        }
                      : null
                  }
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
export default Form;
