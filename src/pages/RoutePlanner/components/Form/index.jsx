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
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import FilledInfoCard from "examples/Cards/InfoCards/FilledInfoCard";
import DirectionsIcon from "@mui/icons-material/Directions";
import { metersToMiles } from "util/geocoder";
import { secondsToHoursMinutes } from "util/helpers";
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
  const [coords, setCoords] = useGlobalValue();
 const [routeInfo, setRouteInfo] = useState(null)
  const updateMarkerData = useStore((state) => state.setMarkerData);
  const setMapZoom = useStore((state) => state.setMapZoom);
  const setUserLocationActive = useStore((state) => state.setUserLocationActive);
  const userLocationActive = useStore((state) => state.userLocationActive);
  const setMapInputState = useStore((state) => state.setMapInputState);
  const setRouteData = useStore((state) => state.setRouteData);
  const routeData = useStore((state) => state.routeData);
  
  /* -------------------------------------------------------------------------- */
  /*                                  FUNCTIONS                                 */
  /* -------------------------------------------------------------------------- */
  async function handleSubmit(e) {
    e.preventDefault();
    const inputOne = e.target[0].value;
    const inputTwo = e.target[2].value;

    if (inputOne && inputTwo) {
      let extracted = extractWords(inputOne);
      let withPlus = extracted.join("+");
      const mapBoxData = await covertAddressToLatLng(inputOne);
      const mapBoxDataOrigin = await covertAddressToLatLng(inputOne);
      const mapBoxDataDestination = await covertAddressToLatLng(inputTwo);

      if (mapBoxDataOrigin && mapBoxDataDestination) {
        if (mapBoxDataOrigin.features.length > 0 && mapBoxDataDestination.features.length > 0) {
          setCoords([coords]);

          const markerDataOriginFormatted = generateMarkerDataOrigin(mapBoxDataOrigin);
          const markerDataDestinationFormatted =
            generateMarkerDataDestination(mapBoxDataDestination);
          const markerData = [markerDataOriginFormatted[0], markerDataDestinationFormatted[0]];
          setUserLocationActive(false);
          setMapInputState(false);

          updateMarkerData(markerData);
          setMapZoom(5);
          //   updateGeoData(mapBoxData.features[0]);
        }
      }
    }
  }
  const generateMarkerDataOrigin = (mapBoxData) => {
    let lat = mapBoxData.features[0].geometry.coordinates[1];
    let lng = mapBoxData.features[0].geometry.coordinates[0];

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
    const markerData = [
      {
        id: uid,
        lat: lat,
        lng: lng,
        title: address,
        userLocation: false,
        wikiData: wikiData,
      },
    ];
    return markerData;
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
  }, [userLocationActive]);
  
useEffect(() => {
  if(routeData){
    //The distance between each pair of coordinates, in meters.
    const distance = routeData.routes[0].distance
      ? Math.round(metersToMiles(routeData.routes[0].distance))
      : null;
    // The duration between each pair of coordinates, in seconds.
    const duration = routeData.routes[0].duration ? secondsToHoursMinutes(routeData.routes[0].duration) : null;
if(distance && duration){
let data = {
  ...duration,
  distance: distance
}
setRouteInfo(data)
console.log(data)
}
 
  }
}, [routeData]);
  return (
    <Box component="form" p={2} method="post" onSubmit={handleSubmit}>
      <Box px={{ xs: 0, sm: 3 }} py={{ xs: 2, sm: 3 }}>
        <Typography variant="h4" mb={1}>
          Route Planner
        </Typography>
        <Typography variant="body2" color="text" mb={1}>
          To pinpoint a location, you can type in the name of a place, city, state, or address, or
          click the location on the map to get the coordinates.
        </Typography>
      </Box>
      <Box px={{ xs: 0, sm: 3 }} py={{ xs: 2, sm: 6 }}>
        <Grid container>
          {/* ============ ORGIN-AddressInput ============ */}
          <AddressInput readOnly={false} defaultValue="Atlanta, GA" icon={<OriginInputIcon />} />
          {/* ============ DESTINATION-AddressInput ============ */}
          <AddressInput
            readOnly={false}
            defaultValue="Austin, TX"
            icon={<DestinationInputIcon />}
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
              <FilledInfoCard
                color="dark"
                variant="contained"
                icon="directions_car"
                title={
                  routeInfo.hours && routeInfo.minutes
                    ? `${routeInfo.hours} hours ${routeInfo.minutes} minutes`
                    : routeInfo.hours 
                    ? `${routeInfo.hours} hours`
                    : `${routeInfo.minutes} minutes`
                }
                description={routeInfo.distance ? `${routeInfo.distance} miles` : ""}
                action={{
                  type: "external",
                  route: "https://www.google.com/maps/dir/Atlanta,+Georgia/Austin,+Texas/",
                  label: "Directions",
                  iconComponent: (
                    <DirectionsIcon color="info" fontSize="medium" sx={{ ml: "5px" }} />
                  ),
                }}
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
export default Form;
