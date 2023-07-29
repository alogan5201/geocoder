import Box from 'components/Box';

import Grid from '@mui/material/Grid';
import Typography from 'components/Typography';
import { useEffect } from 'react';
import useStore from 'store/mapStore';
import { covertAddressToLatLng, extractCityAndState } from 'util/geocoder';
import { formatMarkerData, test } from 'util/helpers';
import { useGlobalValue } from 'util/mapState';
import { v4 as uuidv4 } from 'uuid';
import LocationsTable from '../LocationsTable';
function Form() {
  useEffect(() => {
    test();
  }, []);

  const [coords, setCoords] = useGlobalValue();
  const updateMarkerData = useStore((state) => state.setMarkerData);
  const setUserLocationActive = useStore((state) => state.setUserLocationActive);
  const userLocationActive = useStore((state) => state.userLocationActive);
  const setMapInputState = useStore((state) => state.setMapInputState);
  const setErrorMessage = useStore((state) => state.setErrorMessage);

  /* -------------------------------------------------------------------------- */
  /*                                  FUNCTIONS                                 */
  /* -------------------------------------------------------------------------- */
  async function handleSubmit(e) {
    e.preventDefault();
    const inputOne = e.target[0].value;
    if (inputOne) {
      const mapBoxData = await covertAddressToLatLng(inputOne);
      if (mapBoxData && mapBoxData.features.length > 0) {
        let lat = mapBoxData.features[0].geometry.coordinates[1];
        let lng = mapBoxData.features[0].geometry.coordinates[0];

        setCoords([coords]);
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
            popupOpen: false,
          },
        ];
        setUserLocationActive(false);
        setMapInputState(false);
        const formattedMarkerData = formatMarkerData(markerData);
        updateMarkerData(formattedMarkerData);
      } else {
        setErrorMessage(true);

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
          Locations
        </Typography>
      </Box>
      <Box px={{ xs: 0, sm: 3 }} py={{ xs: 2, sm: 4 }}>
        <Grid container>
          <LocationsTable />
        </Grid>
      </Box>
    </Box>
  );
}
export default Form;
