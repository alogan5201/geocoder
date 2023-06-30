import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from 'components/Box';
import { useEffect } from "react";

export default function BasicList({data}) {
useEffect(() => {
  if(data){

  }
}, [data]);
  return data ? (
    <Box sx={{ width: "100%", maxWidth: 260, bgcolor: "white" }} py={2} px={2}>
      <List>
        {Object.keys(data).map((key, index) => (
       
          <div key={index}>
          <ListItem  disablePadding mb={5}>
            <span style={{ fontSize: "16px" }}>{key}: {JSON.stringify(data[key])}</span>
          </ListItem>
          <Divider />

          </div>
   
        ))}
      </List>
  
    </Box>
  ) : null;
}