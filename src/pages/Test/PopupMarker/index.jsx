import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "components/Box";

export default function PopupMarker() {
const popupContent = {
  title: "Marker",
  lat: 38.98978,
  lng: -87.55545,

}

  return popupContent ? (
    <Box sx={{ width: "100%", maxWidth: 300, bgcolor: "transparent" }} py={1} px={1}>
      <List>
        <ListItem disablePadding>
          <span style={{ fontSize: "16px" }}>{popupContent.title}</span>
        </ListItem>
      </List>
      <Divider />

      <List>
        <ListItem disablePadding>
          <span style={{ fontSize: "16px" }}>Latitude: {popupContent.lat}</span>
        </ListItem>
        <ListItem disablePadding>
          <span style={{ fontSize: "16px" }}>Longitude: {popupContent.lng}</span>
        </ListItem>
        <ListItem disablePadding>
          <span style={{ fontSize: "16px" }}>33° 44' 56.37'' 84° 23' 24.95''</span>
        </ListItem>

    
      </List>
      <Divider />
    </Box>
  ) : null;
}
