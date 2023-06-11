import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useWhatChanged } from "@simbathesailor/use-what-changed";
import Box from "components/Box";
import React from "react";
// Material Kit 2 PRO React components
const { VITE_NODE_ENV } = import.meta.env;
// Only Once in your app you can set whether to enable hooks tracking or not.
// In CRA(create-react-app) e.g. this can be done in src/index.js

// This way the tracking will only happen in devlopment mode and will not
// happen in non-devlopment mode

export default function WhatChanged({data}) {
  const [testData, setTestData] = React.useState(null);
  const [x, setX] = React.useState(null);

  const [y, setY] = React.useState(null);

  const [lat, setLat] = React.useState();

  const [lng, setLng] = React.useState(0);

  // Just place the useWhatChanged hook call with dependency before your

  // useEffect, useCallback or useMemo

  useWhatChanged([lat,lng,x,y], "lat, lng, x, y"); // debugs the below useEffect

  React.useEffect(() => {
  if(data){
   setX(data.px.x)
   setY(data.px.y)
    setTestData(data);
    setLat(data.lat);
    setLng(data.lng);
  }
  }, [data]);

   return data ? (
     <Box sx={{ width: "100%", maxWidth: 260, bgcolor: "white" }} py={2} px={2}>
       <List>
         {Object.keys(data).map((key, index) => (
           <div key={index}>
             <ListItem disablePadding mb={5}>
               <span style={{ fontSize: "16px" }}>
                 {key}: {JSON.stringify(data[key])}
               </span>
             </ListItem>
             <Divider />
           </div>
         ))}
       </List>
     </Box>
   ) : null;
}
