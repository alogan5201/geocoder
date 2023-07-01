// Material Kit 2 PRO React components
import Box from "components/Box";
// Material Kit 2 PRO React components
import Grid from "@mui/material/Grid";
import AddressInput from "components/AddressInput";
import Button from "components/Button";
import Input from "components/Input";
import Typography from "components/Typography";
import { useEffect, useRef, useState } from "react";
import useStore from "store/mapStore";
import { covertAddressToLatLng } from "util/geocoder";
import { extractWords, test } from "util/helpers";
import { useGlobalValue } from "util/mapState";
import LatLngInputs from "components/LatLngInputs";
import { v4 as uuidv4 } from "uuid";
import BookmarkTable from "../BookmarkTable";
import Table from "../Table";
function Form() {
  useEffect(() => {
    test();
  }, []);

  const [zoomState, setZoomState] = useState();
  const [coords, setCoords] = useGlobalValue();
  const latInputElm = useRef(null);
  const lngInputElm = useRef(null);
  const updateGeoData = useStore((state) => state.setGeoData);
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
        const markerData = [
          {
            id: uid,
            lat: lat,
            lng: lng,
            title: address,
            userLocation: false,
          },
        ];
        setUserLocationActive(false);
        setMapInputState(false);
        updateMarkerData(markerData);
        updateGeoData(mapBoxData.features[0]);
      }
    }
  }
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
  return (
    <Box component="form" p={2} method="post" onSubmit={handleSubmit}>
      <Box px={{ xs: 0, sm: 3 }} py={{ xs: 2, sm: 3 }}>
        <Typography variant="h4" mb={1}>
          Bookmarks
        </Typography>
      </Box>
      <Box px={{ xs: 0, sm: 1 }} py={{ xs: 2, sm: 1 }}>
        <BookmarkTable />
      </Box>
    </Box>
  );
}
export default Form;
