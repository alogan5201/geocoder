import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "components/Box";
import Button from "components/Button";
import Typography from "components/Typography";
import { useEffect, useRef, useState } from "react";
import useStore from "store/mapStore";
import { covertAddressToLatLng, extractCityAndState } from "util/geocoder";
import { extractWords, formatMarkerData } from "util/helpers";
import { useGlobalValue } from "util/mapState";
import { v4 as uuidv4 } from "uuid";
import BookmarkTable from "../BookmarkTable";
import AddressInput from 'components/AddressInput';

function InputWithIcon() {
  return (
    <Grid item xs={12} pr={1} mb={3}>
      <AddIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
      <TextField fullWidth id="input-with-sx" label="With sx" variant="standard" />
    </Grid>
  );
}
function AddNewBookmark({ onSubmit }) {
  const [newLocation, setNewLocation] = useState('');
  const [toggleInput, setInputToggle] = useState(false);
  const handleNewBookmark = (e) => {
    e.preventDefault();
    setInputToggle(true);
  };
  if (toggleInput) {
    return <AddressInput label="" readOnly={false} submitOnSelect={true} variant="standard" onSubmit={onSubmit} />;
  } else {
    return (
      <Grid item xs={12} pr={1} mb={0}>
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
  const [bookmarkState, setBookmarkState] = useState(
    JSON.parse(localStorage.getItem("bookmarks")) || []
  );
  const setBookmarkForLocation = useStore((state) => state.setBookmarkForLocation);

  useEffect(() => {
    if (bookmarkState) {
    }
  }, [bookmarkState]);
  useEffect(() => {
    window.addEventListener("storage", () => {
      setBookmarkState(JSON.parse(localStorage.getItem("bookmarks")) || []);
    });
  }, []);

  const [zoomState, setZoomState] = useState();
  const [coords, setCoords] = useGlobalValue();
  const latInputElm = useRef(null);
  const lngInputElm = useRef(null);
  const updateMarkerData = useStore((state) => state.setMarkerData);
  const resetZoom = useStore((state) => state.resetMapZoom);
  const setUserLocationActive = useStore((state) => state.setUserLocationActive);
  const userLocationActive = useStore((state) => state.userLocationActive);
  const setMapInputState = useStore((state) => state.setMapInputState);
  /* -------------------------------------------------------------------------- */
  /*                                  FUNCTIONS                                 */
  /* -------------------------------------------------------------------------- */
  function handleZoomReset(e) {
    e.preventDefault();
    resetZoom(1);
    setTimeout(() => {
      resetZoom(0);
    }, 2000);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const inputOne = e.target[0].value;
    if (inputOne) {
      let extracted = extractWords(inputOne);
      let withPlus = extracted.join("+");
      const mapBoxData = await covertAddressToLatLng(inputOne);
      if (mapBoxData && mapBoxData.features.length > 0) {
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
        setMapInputState(false);
            const formattedMarkerData = formatMarkerData(markerData);
            updateMarkerData(formattedMarkerData);
        setBookmarkForLocation(true);
      }
    }
  }

    const handleChildSubmit = (data, label) => {
      if (data) {
        if (!label) {
          const target = [{ value: data.name }];
          const e = {
            target: target,
            preventDefault: () => {},
          };
          handleSubmit(e);
        } else {
          console.log(data, label);
          const target = [formRef.current[0], 1, { value: data.name }];
          console.log(target);
          const e = {
            target: target,
            preventDefault: () => {},
          };
          handleSubmit(e);
        }
      }

      //    handleSubmit(e);
      //handleSubmit({ preventDefault: () => {} });
    };
  useEffect(() => {
    if (userLocationActive === false) {
      let leafletBarElement = document.querySelector(".leaflet-bar");

      if (leafletBarElement) {
        let classes = leafletBarElement.classList;
        // Create an array to store the classes that need to be removed
        let classesToRemove = [];
        // Loop through each class and if it contains 'locateActive', add it to classesToRemove
        for (let i = 0; i < classes.length; i++) {
          if (classes[i].includes("locateActive")) {
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
      py={{ xs: 0, sm: 2 }}
      method="post"
      onSubmit={handleSubmit}
    >
      <Box px={{ xs: 0, sm: 3 }} py={{ xs: 2, sm: 3 }}>
        <Typography variant="h4" mb={1}>
          Bookmarks
        </Typography>
      </Box>
      <Divider sx={{ m: 0 }} />
      <Box pl={{ xs: 0, sm: 3 }} pr={{ xs: 0, sm: 0 }} py={{ xs: 0, sm: 1 }}>
        <Grid container>
          {bookmarkState && bookmarkState.length > 0 ? (
            <>
              <AddNewBookmark onSubmit={handleChildSubmit} />

              <BookmarkTable bookmarkState={bookmarkState} />
            </>
          ) : (
            <>
              <AddNewBookmark onSubmit={handleChildSubmit} />
            </>
          )}
        </Grid>
      </Box>
    </Box>
  );
}
export default Form;
