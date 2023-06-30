import React, { useEffect } from "react";
import Divider from '@mui/material/Divider';
import Icon from "@mui/material/Icon";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stack from "@mui/material/Stack";
import Box from 'components/Box';
import Button from "components/Button";
import ReactJson from "react-json-view";

export default function BasicList({data}) {
useEffect(() => {
  if(data){
  
  }
}, [data]);
  return data ? (
    <Box sx={{ width: "100%", maxWidth: 1200, bgcolor: "white", fontSize: "14px" }} py={2} px={2}>
      <ReactJson src={data} displayDataTypes={false} />
    </Box>
  ) : null;
}