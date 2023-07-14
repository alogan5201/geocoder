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
import { shallow } from "zustand/shallow";

function PopupMarkerContent({ content }) {
  const markerData = useStore((state) => state.markerData);
  const locationMarkerData = useStore((state) => state.locationMarkerData);

  const setBookmarks = useStore((state) => state.setBookmarks);
  const setBookmarked = useStore((state) => state.setBookmarked);
  const bookmarked = useStore((state) => state.bookmarked);
  const bookmarkLocation = useStore((state) => state.bookmarkLocation);
  const [popupContent, setPopupcontent] = useState(null);
  const [dmsDisplay, setDisplayDMS] = useState(null);
  const markerPointData = markerData
    ? markerData
    : locationMarkerData
    ? locationMarkerData
    : localStorage.getItem("markerData")
    ? JSON.parse(localStorage.getItem("markerData"))
    : null;

  const [bookMarkId, setBookMarkId] = useState();
  useEffect(() => {
    if (bookmarkLocation) {
      // const markerDataPoint
      let bookmarkData = markerData[content];
      handleBookmarkChange(bookmarkLocation, "bookmarks", bookmarkData);

      setBookmarked(bookmarkLocation);
    }
  }, [bookmarkLocation]);
  useEffect(() => {
    if (markerPointData || bookmarkLocation) {
      const shouldBookmark = alreadyBookmarked(
        "bookmarks",
        markerPointData[content].lat,
        markerPointData[content].lng
      );
      setBookmarked(shouldBookmark);
      // popupContent.dms.lat.display
      let dmsDisplay = `${markerPointData[content].dms.lat.display} ${markerPointData[content].dms.lng.display}`;
      setDisplayDMS(dmsDisplay);
      setPopupcontent(markerPointData[content]);
    }
  }, [markerData, bookmarkLocation, locationMarkerData]);

  function handleBookMarkClick(e) {
    e.preventDefault();
    if (markerPointData) {
      let bookmarkData = markerPointData[content];
      //  setBookmarks();
      handleBookmarkChange(!bookmarked, "bookmarks", bookmarkData);
      setBookmarked(!bookmarked);
    }
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
