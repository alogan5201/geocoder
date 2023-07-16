import { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import BookmarkIcon from '@mui/icons-material/Bookmark';import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import Box from "components/Box";
import Button from "components/Button";
import useStore from "store/mapStore";
import { extractWords, test, tron } from "util/helpers";
import { handleBookmarkChange, alreadyBookmarked } from "util/bookmarks";
import { v4 as uuidv4 } from "uuid";
import Switch from "@mui/material/Switch";
import Paper from "@mui/material/Paper";
import Fade from "@mui/material/Fade";
import FormControlLabel from "@mui/material/FormControlLabel";
import { shallow } from "zustand/shallow";

const icon = (
  <Paper elevation={4}>
    <List>
      <ListItem disablePadding>
        <span style={{ fontSize: "16px" }}> Atlanta, GA</span>
      </ListItem>
    </List>
    <Divider />

    <List>
      <ListItem disablePadding>
        <span style={{ fontSize: "16px" }}>Latitude: 33</span>
      </ListItem>
      <ListItem disablePadding>
        <span style={{ fontSize: "16px" }}>Longitude: 89</span>
      </ListItem>

      <ListItem disablePadding style={{ fontSize: "16px" }}>
        33 89 22
        {/*    <span style={{ fontSize: "16px" }}>{popupContent.dms.lat.display} {popupContent.dms.lng.display}</span> */}
      </ListItem>
    </List>
    <Divider />
  </Paper>
);
export default function PopupMarker() {
      const [checked, setChecked] = useState(false);
  const [popupContent, setPopupcontent] = useState(null);
  const [dmsDisplay, setDisplayDMS] = useState(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [bookMarkId, setBookMarkId] = useState();

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  function handleBookMarkClick(e) {
    e.preventDefault();

    //handleBookmarkChange(!bookmarked, "bookmarks", bookmarkData);
     setChecked((prev) => !prev);
    setBookmarked(!bookmarked);
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 300, bgcolor: 'transparent', border: '1px dashed grey' }} py={1} px={1}>
      <Box sx={{ display: 'flex' }}>
        <Fade in={checked}>{icon}</Fade>
      </Box>

      {/* ================= BOOKMARK ================= */}
      <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
        {bookmarked ? (
          <Button color="info" size="small" onClick={handleBookMarkClick}>
            Bookmark
            <BookmarkIcon sx={{ ml: 1 }}></BookmarkIcon>{' '}
          </Button>
        ) : (
          <Button color="info" size="small" variant="outlined" onClick={handleBookMarkClick}>
            Bookmark
            <BookmarkIcon sx={{ ml: 1 }}></BookmarkIcon>{' '}
          </Button>
        )}
      </Stack>
    </Box>
  );
}
