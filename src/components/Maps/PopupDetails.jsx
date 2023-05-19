import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import { useEffect, useState } from 'react';
import { Tab } from "react-tabs";
import "react-tabs/style/react-tabs.css";
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