import { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import Box from "components/Box";
import Button from "components/Button";
import useStore from "store/mapStore";
import { extractWords, test, tron } from "util/helpers";
import { handleBookmarkChange, alreadyBookmarked } from "util/bookmarks";
import { v4 as uuidv4 } from "uuid";

function PopupMarkerContent({ content }) {
  const markerData = useStore((state) => state.markerData);
  const [popupContent, setPopupcontent] = useState(null);
  const [dmsDisplay, setDisplayDMS] = useState(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [bookMarkId, setBookMarkId] = useState();
  useEffect(() => {
    if (markerData) {
      const shouldBookmark = alreadyBookmarked(
        "bookmarks",
        markerData[content].lat,
        markerData[content].lng
      );
      setBookmarked(shouldBookmark);
      // popupContent.dms.lat.display
      let dmsDisplay = `${markerData[content].dms.lat.display} ${markerData[content].dms.lng.display}`;
      setDisplayDMS(dmsDisplay);
      setPopupcontent(markerData[content]);
    }
  }, [markerData, content]);

  function handleBookMarkClick(e) {
    e.preventDefault();

    let bookmarkData = markerData[content];

    handleBookmarkChange(!bookmarked, "bookmarks", bookmarkData);
    setBookmarked(!bookmarked);
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

        <ListItem disablePadding style={{ fontSize: "16px" }}>
          {`${popupContent.dms.lat.display} ${popupContent.dms.lng.display}`}

          {/*    <span style={{ fontSize: "16px" }}>{popupContent.dms.lat.display} {popupContent.dms.lng.display}</span> */}
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
  ) : null;
}

export default PopupMarkerContent;
