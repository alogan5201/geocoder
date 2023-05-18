import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import { useCallback, useEffect, useMemo, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import LocationButton from "./LocationButton";
const CustomTab = ({ children, ...otherProps }) => (
  <Tab {...otherProps}>
    <h1>{children}</h1>
  </Tab>
);

CustomTab.tabsRole = "Tab"; 
function PopupDetails({coords,geoData}){
const [latLng,setLatLng] = useState([])

useEffect(() => {
  if(coords){
    if(coords[0]){

      if(coords[0].lat){
        let lat = coords[0].lat
        let lng = coords[0].lng
        setLatLng([lat,lng])
        if(geoData){
          console.log("GEO DATA",geoData)
        }
      }
    }
  }
}, [coords,geoData])
  return (
    <MKBox component="form" method="post" autoComplete="off">
      <MKBox py={3}>
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sx={{ my: 1 }}>
            {latLng && latLng.length > 0 && geoData && geoData.length >  0 ? (
              <>
                <div> Address is {geoData[0].display_name}</div>
                <br />
                <div> Latitude is {latLng[0]}</div>
                <br />
                <div> Longitude is {latLng[1]}</div>
              </>
            ) : (
              ""
            )}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <MKButton type="submit" variant="gradient" color="info">
              Submit
            </MKButton>
          </Grid>
        </Grid>
      </MKBox>
    </MKBox>
  );
}
const center = [39.7072, -98.1736];
const zoom = 3
// const center = [39.7072,-98.0837]
const content = [
  {
    title: "Details",
    style: { width: "100%" },
    figcaption: "Source: wikipedia.org",
    text: "Kraków,[a] also written in English as Krakow and traditionally known as Cracow, is the second-largest and one of the oldest cities in Poland. Situated on the Vistula River in Lesser Poland Voivodeship...",
    link: "https://en.wikipedia.org/wiki/Krak%C3%B3w",
  },
  {
    title: "Town Hall Tower",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Krak%C3%B3w_-_Town_Hall_Tower_01a.jpg/315px-Krak%C3%B3w_-_Town_Hall_Tower_01a.jpg",
    style: { display: "flex", height: "202px", width: "auto", margin: "auto" },
    figcaption: "Source: wikipedia.org",
    text: "Town Hall Tower in Kraków, Poland (Polish: Wieża ratuszowa w Krakowie) is one of the main focal points of the Main Market Square in the Old Town district of Kraków. The Tower is the only...",
    link: "https://en.wikipedia.org/wiki/Town_Hall_Tower,_Krak%C3%B3w",
  },
];
function DisplayPosition({ map,coords,geoData }) {
  const [position, setPosition] = useState(() => map.getCenter())
  useEffect(() => {
    if(coords && map && geoData){
      console.log("GEO DATA");
      console.log(geoData);
      if(coords[0]){
            if(coords[0].lat){
                let lat = coords[0].lat
                let lng = coords[0].lng
                map.setView([lat,lng],12)
            }
 }
    }
  }, [coords,map,geoData]);
  const onClick = useCallback(() => {
    map.setView(center, zoom)
  }, [map])

  const onMove = useCallback(() => {
    setPosition(map.getCenter())
  }, [map])

  useEffect(() => {
    map.on('move', onMove)
    return () => {
      map.off('move', onMove)
    }
  }, [map, onMove])

  return (
    <p>
      latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)}{' '}
      <button onClick={onClick}>reset</button>
    </p>
  )
}

function MapExternal({coords,geoData}) {
  const [map, setMap] = useState(null)

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        zoomControl={false}
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
        />
        <LocationButton map={map} />
        {coords && coords.length > 0 ? (
          <Marker position={[coords[0].lat, coords[0].lng]}>
            <Popup maxWidth={320}>
              <Tabs>
                <TabList>
                  <Tab>Sukiennice</Tab>
                  <Tab>Town Hall Tower</Tab>
                </TabList>

                {content.map((item, index) => (
                  <TabPanel key={index}>
                    <figure>
                      <img src={item.image} alt={item.title} style={item.style} />
                      <figcaption>{item.figcaption}</figcaption>
                    </figure>
                    <div>
                      {item.text}
                      <a href={item.link} target="_blank" rel="noreferrer">
                        → show more
                      </a>
                    </div>
                    {coords && coords.length > 0 && geoData && geoData.length > 0 ? (
                      <PopupDetails coords={coords} geoData={geoData} />
                    ) : (
                      ""
                    )}
                  </TabPanel>
                ))}
              </Tabs>
            </Popup>
          </Marker>
        ) : (
          ""
        )}
      </MapContainer>
    ),
    [coords]
  );

  return (
    <div>
      {map ? <DisplayPosition map={map} coords={coords} /> : null}
      {displayMap}
    </div>
  )
}

export default MapExternal