import { useState } from "react";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import Box from "components/Box";
import Button from "components/Button";

export default function PopupMarker({ content }) {
  const [bookmarked, setBookmarked] = useState(false);
  function handleBookMarkClick(e) {
    e.preventDefault();
    setBookmarked(!bookmarked);
    
  }
  return (
    <Box sx={{ width: "100%", maxWidth: 260, bgcolor: "transparent" }} py={1} px={1}>
      <List>
        <ListItem disablePadding>
          <span style={{ fontSize: "16px" }}>{content}</span>
        </ListItem>
      </List>
      <Divider />

      <List>
        <ListItem disablePadding>
          <span style={{ fontSize: "16px" }}>Latitude: 30.271129</span>
        </ListItem>
        <ListItem disablePadding>
          <span style={{ fontSize: "16px" }}>Longitude: -97.7437</span>
        </ListItem>
        <ListItem disablePadding>
          <span style={{ fontSize: "16px" }}>30° 16' 16.064'' 97° 44' 37.32''</span>
        </ListItem>
      </List>
      <Divider />
{/* ================= BOOKMARK ================= */}
      <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
        {bookmarked ? (
          <Button color="info" size="small" onClick={handleBookMarkClick}>
            Bookmark
            <Icon sx={{ ml: 1 }}>bookmark</Icon>
          </Button>
        ) : (
          <Button color="info" size="small" variant="outlined" onClick={handleBookMarkClick}>
            Bookmark
            <Icon sx={{ ml: 1 }}>bookmark</Icon>
          </Button>
        )}
      </Stack>
    </Box>
  );
}
