import Box from 'components/Box';

import Grid from '@mui/material/Grid';
import AddressInput from 'components/AddressInput';
import Button from 'components/Button';
import LatLngInputs from 'components/LatLngInputs';
import Typography from 'components/Typography';
import { useEffect } from 'react';
import { useWindowSize } from 'react-use';
import useStore from 'store/mapStore';
import { convertLatLngToAddress, extractCityAndState } from 'util/geocoder';
import { formatMarkerData } from 'util/helpers';
import { v4 as uuidv4 } from 'uuid';

function Form() {
  const markerData = useStore((state) => state.markerData);
  const { width } = useWindowSize();

  const locationMarkerData = useStore((state) => state.locationMarkerData);
  const updateMarkerData = useStore((state) => state.setMarkerData);
  const setUserLocationActive = useStore((state) => state.setUserLocationActive);
  const userLocationActive = useStore((state) => state.userLocationActive);
  const setMapInputState = useStore((state) => state.setMapInputState);
  const setErrorMessage = useStore((state) => state.setErrorMessage);
  const resetMapData = useStore((state) => state.resetMapData);

  useEffect(() => {}, [markerData, locationMarkerData]);
  /* -------------------------------------------------------------------------- */
  /*                                  FUNCTIONS                                 */
  /* -------------------------------------------------------------------------- */

  async function handleSubmit(e) {
    e.preventDefault();
    const inputOne = e.target[0].value;
    const inputTwo = e.target[2].value;

    if (inputOne && inputTwo) {
      const mapBoxData = await convertLatLngToAddress(inputOne, inputTwo);

      if (mapBoxData && mapBoxData.features.length > 0) {
        let lat = mapBoxData.features[0].geometry.coordinates[1];
        let lng = mapBoxData.features[0].geometry.coordinates[0];

        const cityAndState = extractCityAndState(mapBoxData);
        const city = cityAndState && cityAndState.city ? cityAndState.city : null;
        const state = cityAndState && cityAndState.state ? cityAndState.state : null;

        const address = mapBoxData.features[0].place_name;
        const wikiData = mapBoxData.features[0].properties.wikidata;
        const uid = uuidv4();

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
            popupOpen: false,
          },
        ];
        setUserLocationActive(false);
        setMapInputState(false);
        const formattedMarkerData = formatMarkerData(markerData);
        updateMarkerData(formattedMarkerData);
        if (width < 992) {
          const mapElement = document.getElementById('map');
          if (mapElement) {
            const offset = 650; // change this to the offset that suits your needs
            window.scrollTo({ top: mapElement.offsetTop + offset, behavior: 'smooth' });
          }
        }
      } else {
        setErrorMessage(true);
        resetMapData();

        setTimeout(() => {
          setErrorMessage(false);
        }, 500);
      }
    }
  }
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

  return (
    <Box component="form" p={2} method="post" onSubmit={handleSubmit}>
      <Box px={{ xs: 0, sm: 3 }} py={{ xs: 2, sm: 3 }}>
        <Typography variant="h4" mb={1}>
          Latitude & Longitude to Address
        </Typography>
        <Typography variant="body2" color="text" mb={1}>
          To pinpoint a location, you can type in the latitude and longitude, or click the location on the map to get
          the coordinates.
        </Typography>
      </Box>
      <Box px={{ xs: 0, sm: 3 }} py={{ xs: 2, sm: 3.7 }}>
        <Grid container>
          {/* ============ LatLngInputs ============ */}
          <LatLngInputs readOnly={false} defaultValue={['33.748992', '-84.390264']} />
          {/* ============ Submit ============ */}
          <Grid item xs={12} pr={1} mb={2}>
            <Button type="submit" variant="gradient" color="info">
              Submit
            </Button>
          </Grid>
          {/* ============ AddressInput ============ */}
          <AddressInput readOnly={true} defaultValue="Atlanta, GA" key="1" />
        </Grid>
      </Box>
    </Box>
  );
}
export default Form;
