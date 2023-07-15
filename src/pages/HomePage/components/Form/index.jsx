// Material Kit 2 PRO React components
import Box from "components/Box";
// Material Kit 2 PRO React components
import Grid from "@mui/material/Grid";
import AddressInput from "components/AddressInput";
import Button from "components/Button";
import LatLngInputs from "components/LatLngInputs";
import Typography from "components/Typography";
import { useEffect, useRef, useState } from "react";
import { useEffectOnce } from "react-use";
import useStore from "store/mapStore";
import { covertAddressToLatLng, extractCityAndState, getPlacePhoto } from "util/geocoder";
import { extractWords, formatMarkerData } from "util/helpers";
import { useGlobalValue } from "util/mapState";
import { v4 as uuidv4 } from "uuid";

function Form() {
  const formRef = useRef();
  const markerData = useStore((state) => state.markerData);
  const [zoomState, setZoomState] = useState();
  const [coords, setCoords] = useGlobalValue();
  const latInputElm = useRef(null);
  const lngInputElm = useRef(null);
  const updateMarkerData = useStore((state) => state.setMarkerData);
  const resetZoom = useStore((state) => state.resetMapZoom);
  const setUserLocationActive = useStore((state) => state.setUserLocationActive);
  const userLocationActive = useStore((state) => state.userLocationActive);
  const setMapInputState = useStore((state) => state.setMapInputState);
  const setErrorMessage = useStore((state) => state.setErrorMessage);
  const resetMapData = useStore((state) => state.resetMapData);

  /* -------------------------------------------------------------------------- */
  /*                                  FUNCTIONS                                 */
  /* -------------------------------------------------------------------------- */

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
        const wikiData = mapBoxData.features[0].properties.wikidata;
        const uid = uuidv4();
        const cityAndState = extractCityAndState(mapBoxData);

        const city = cityAndState.city ? cityAndState.city : null;
        const state = cityAndState.state ? cityAndState.state : null;

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
        const formattedMarkerData = formatMarkerData(markerData)
        updateMarkerData(formattedMarkerData);
      } else {
        setErrorMessage(true);

        setTimeout(() => {
          setErrorMessage(false);
        }, 500);
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
        const target = [formRef.current[0], 1, { value: data.name }];
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
  useEffectOnce(() => { 
    resetMapData();
  })
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
  }, [userLocationActive]);

  useEffect(() => {
    return (() => {
        localStorage.setItem("markerData", "[]");
        resetMapData();
    })
  }, []);
const testFunc = async (e) => {
  e.preventDefault();
  const b = {
    data: {
      latitude: 40.75962,
      longitude: -111.886798,
      city: "Salt Lake City",
      state: "Utah",
    },
  };

const res = await getPlacePhoto(b.data);


}

  return (
    <Box component="form" p={2} method="post" onSubmit={handleSubmit} ref={formRef}>
      <Box px={{ xs: 0, sm: 3 }} py={{ xs: 2, sm: 3 }}>
        <Typography variant="h4" mb={1}>
          Address to Latitude & Longitude
        </Typography>
        <Typography variant="body2" color="text" mb={1}>
          To pinpoint a location, you can type in the name of a place, city, state, or address, or
          click the location on the map to get the coordinates.
        </Typography>
      </Box>
      <Box px={{ xs: 0, sm: 3 }} py={{ xs: 2, sm: 4 }}>
        <Grid container>
          {/* ============ AddressInput ============ */}
          <AddressInput
            key="2"
            label="Address"
            readOnly={false}
            defaultValue="Atlanta, GA"
            submitOnSelect={true}
            onSubmit={handleChildSubmit}
          />
          {/* ============ Submit ============ */}
          <Grid item xs={12} pr={1} mb={2}>
            <Button type="submit" variant="gradient" color="info">
              Submit
            </Button>
          </Grid>
          {/* ============ LatLngInputs ============ */}
          <LatLngInputs readOnly={true} />
          <Grid item xs={12} pr={1} mb={2}>
            <Button type="submit" variant="gradient" color="primary" onClick={testFunc}>
              Test
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
export default Form;
