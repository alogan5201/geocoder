/* eslint-disable jsx-a11y/no-autofocus */
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import AddressInput from 'components/AddressInput';
import Box from 'components/Box';
import Button from 'components/Button';
import Typography from 'components/Typography';
import { useEffect, useState } from 'react';
import useStore from 'store/mapStore';
import { covertAddressToLatLng, extractCityAndState } from 'util/geocoder';
import { formatMarkerData } from 'util/helpers';
import { useGlobalValue } from 'util/mapState';
import { v4 as uuidv4 } from 'uuid';
import BookmarkTable from '../BookmarkTable';
import { alreadyBookmarked, handleBookmarkChange } from 'util/bookmarks';

function AddNewBookmark({ onSubmit, loaded }) {
  const [toggleInput, setInputToggle] = useState(false);
  const handleNewBookmark = (e) => {
    e.preventDefault();

    setInputToggle(true);
 
  };
 
  if (toggleInput && !loaded ) {
    return (
      <AddressInput
        readOnly={false}
        submitOnSelect={true}
        variant="standard"
        onSubmit={onSubmit}
        autoFocus={true}
        clear={true}
      />
    );
  } else {
    return (
      <Grid item xs={12} pr={1} mb={0} pl={2}>
        <Button color="white" size="large" sx={{ pl: 0 }} onClick={handleNewBookmark}>
          {' '}
          <AddIcon color="info" sx={{ mr: 1, my: 0.5 }} />{' '}
          <Typography variant="body2"> Search for a location to add</Typography>{' '}
        </Button>
      </Grid>
    );
  }
}
function Form() {
  const [addressLoaded, setAddressLoaded] = useState(false);
  const [bookmarkState, setBookmarkState] = useState(JSON.parse(localStorage.getItem('bookmarks')) || []);
  const setBookmarkForLocation = useStore((state) => state.setBookmarkForLocation);

  const [coords, setCoords] = useGlobalValue();
  const updateMarkerData = useStore((state) => state.setMarkerData);
  const setUserLocationActive = useStore((state) => state.setUserLocationActive);
  const userLocationActive = useStore((state) => state.userLocationActive);
  const setMapInputState = useStore((state) => state.setMapInputState);
    const [toggleInput, setInputToggle] = useState(false);
  const handleNewBookmark = (e) => {
    e.preventDefault();
    setAddressLoaded(false)
    setInputToggle(true);
 
  };
  /* -------------------------------------------------------------------------- */
  /*                                  FUNCTIONS                                 */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    window.addEventListener('storage', () => {
      setBookmarkState(JSON.parse(localStorage.getItem('bookmarks')) || []);
    });
  }, []);

  useEffect(() => {
    if (bookmarkState.length === 0) {
      
      setMapInputState(true);
    }
  }, [bookmarkState]);
  async function handleSubmit(e) {
    e.preventDefault();
    const inputOne = e.target[0].value;
    if (inputOne) {
    
      const mapBoxData = await covertAddressToLatLng(inputOne);
      if (mapBoxData && mapBoxData.features.length > 0) {
        setAddressLoaded(false);
         setAddressLoaded(false);
        let lat = mapBoxData.features[0].geometry.coordinates[1];
        let lng = mapBoxData.features[0].geometry.coordinates[0];
        setCoords([coords]);
        const address = mapBoxData.features[0].place_name;
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
            city: city,
            state: state,
            popupOpen: false,
          },
        ];
        setUserLocationActive(false);
        
        const formattedMarkerData = formatMarkerData(markerData);
        updateMarkerData(formattedMarkerData);
        handleBookmarkChange(true, 'bookmarks', markerData[0]);
        setMapInputState(false);
        setAddressLoaded(true); 
      }
    }
  }
  const handleToggleLoaded = () => {
    setAddressLoaded(!addressLoaded);
  }
  const alreadyBookmarked = (currentBookmarks, markerData) => {
    for (let index = 0; index < currentBookmarks.length; index++) {
      const element = currentBookmarks[index];
      if (element.lat === markerData.lat && element.lng === markerData.lng) {
        return true;
      } else if (element.city === markerData.city && element.state === markerData.state) {
        return true;
      }
    }
    return false;
  };
  const handleChildSubmit = (data) => {
    if (data) {
      const target = [{ value: data.name }];
      const e = {
        target: target,
        preventDefault: () => {},
      };
      handleSubmit(e);
    }

    //    handleSubmit(e);
    //handleSubmit({ preventDefault: () => {} });
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
    return () => {
      setBookmarkForLocation(false);
    };
  }, [userLocationActive]);


  return (
    <Box
      component="form"
      pl={{ xs: 0, sm: 2 }}
      pr={{ xs: 0, sm: 0 }}
      py={{ xs: 0, sm: 4 }}
      method="post"
      onSubmit={handleSubmit}
    >
      <Stack spacing={2}>
        <Box pl={{ xs: 0, sm: 5 }} pr={{ xs: 0, sm: 0 }} py={{ xs: 0, sm: 1 }}>
          <Grid container>
            <Box pl={{ xs: 0, sm: 3 }} pr={{ xs: 0, sm: 0 }} py={{ xs: 0, sm: 1 }}>
              <Typography variant="h4" mb={1}>
                Bookmarks
              </Typography>
            </Box>
            <Divider sx={{ m: 0 }} />
            {bookmarkState && bookmarkState.length > 0 ? (
              <>
                {toggleInput && !addressLoaded ? (
                  <AddressInput
                    readOnly={false}
                    submitOnSelect={true}
                    variant="standard"
                    onSubmit={handleChildSubmit}
                    autoFocus={true}
                    clear={true}
                  />
                ) : (
                  <Grid item xs={12} pr={1} mb={0} pl={2}>
                    <Button color="white" size="large" sx={{ pl: 0 }} onClick={handleNewBookmark}>
                      {' '}
                      <AddIcon color="info" sx={{ mr: 1, my: 0.5 }} />{' '}
                      <Typography variant="body2"> Search for a location to add</Typography>{' '}
                    </Button>
                  </Grid>
                )}

                {/* <AddNewBookmark onSubmit={handleChildSubmit} loaded={addressLoaded} toggleLoaded={handleToggleLoaded} /> */}
                <BookmarkTable bookmarkState={bookmarkState} />
              </>
            ) : (
              <>
                {toggleInput && !addressLoaded ? (
                  <AddressInput
                    readOnly={false}
                    submitOnSelect={true}
                    variant="standard"
                    onSubmit={handleChildSubmit}
                    autoFocus={true}
                    clear={true}
                  />
                ) : (
                  <Grid item xs={12} pr={1} mb={0} pl={2}>
                    <Button color="white" size="large" sx={{ pl: 0 }} onClick={handleNewBookmark}>
                      {' '}
                      <AddIcon color="info" sx={{ mr: 1, my: 0.5 }} />{' '}
                      <Typography variant="body2"> Search for a location to add</Typography>{' '}
                    </Button>
                  </Grid>
                )}
              </>
            )}
          </Grid>
        </Box>
      </Stack>
    </Box>
  );
}
export default Form;
