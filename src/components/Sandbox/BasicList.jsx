import Divider from '@mui/material/Divider';
import Icon from "@mui/material/Icon";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stack from "@mui/material/Stack";
import Box from 'components/Box';
import Button from "components/Button";
export default function BasicList() {
  return (
    <Box sx={{ width: '100%', maxWidth: 260, bgcolor: 'lightgrey' }} py={2} px={2}>
        <List>
          <ListItem disablePadding >
     <span style={{fontSize:"16px"}}>
         Austin, TX
     </span>
          </ListItem>
        </List>
      <Divider />
     
        <List>
          <ListItem disablePadding >
          <span style={{fontSize:"16px"}}>
          Latitude: 30.271129
     </span>
          </ListItem>
          <ListItem disablePadding >
          <span style={{fontSize:"16px"}}>
          Longitude: -97.7437
     </span>
          </ListItem>
          <ListItem disablePadding >
          <span style={{fontSize:"16px"}}>
          30° 16' 16.064'' 97° 44' 37.32''
     </span>
          </ListItem>
        </List>
        <Divider />
     
          <Stack direction="row"  spacing={1}  justifyContent="space-between" alignItems="center">
          <Button color="info" size="small" variant="outlined">
              Bookmark
              <Icon sx={{ ml: 1 }}>bookmark</Icon>
            </Button>
        
            <Button color="info" size="small">
              Bookmark
              <Icon sx={{ ml: 1 }}>bookmark</Icon>
            </Button>
         
          </Stack>
     
    </Box>
  );
}