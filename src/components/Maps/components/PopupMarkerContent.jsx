import Divider from '@mui/material/Divider';
import { useEffect, useState } from 'react';

import BookmarkIcon from '@mui/icons-material/Bookmark';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Box from 'components/Box';
import Button from 'components/Button';
import useStore from 'store/mapStore';
import { alreadyBookmarked, handleBookmarkChange } from 'util/bookmarks';

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
    : localStorage.getItem('markerData')
    ? JSON.parse(localStorage.getItem('markerData'))
    : null;

  const [bookMarkId, setBookMarkId] = useState();
  useEffect(() => {
    if (bookmarkLocation) {
      // const markerDataPoint
      let bookmarkData = markerData[content];
      handleBookmarkChange(bookmarkLocation, 'bookmarks', bookmarkData);

      setBookmarked(bookmarkLocation);
    }
  }, [bookmarkLocation]);
  useEffect(() => {
    if (locationMarkerData) {
      const shouldBookmark = alreadyBookmarked(
        'bookmarks',
        locationMarkerData[content].lat,
        locationMarkerData[content].lng
      );

      setBookmarked(shouldBookmark);
      // popupContent.dms.lat.display
      let dmsDisplay = `${locationMarkerData[content].dms.lat.display} ${locationMarkerData[content].dms.lng.display}`;
      setDisplayDMS(dmsDisplay);
      setPopupcontent(locationMarkerData[content]);
    } else if (markerData) {
      const shouldBookmark = alreadyBookmarked('bookmarks', markerData[content].lat, markerData[content].lng);

      setBookmarked(shouldBookmark);
      // popupContent.dms.lat.display
      let dmsDisplay = `${markerData[content].dms.lat.display} ${markerData[content].dms.lng.display}`;
      setDisplayDMS(dmsDisplay);
      setPopupcontent(markerData[content]);
    }
  }, [markerData, bookmarkLocation, locationMarkerData]);

  function handleBookMarkClick(e) {
    e.preventDefault();
    if (locationMarkerData) {
      let bookmarkData = locationMarkerData[content];
      //  setBookmarks();
      handleBookmarkChange(!bookmarked, 'bookmarks', bookmarkData);
      setBookmarked(!bookmarked);
    } else if (markerData) {
      let bookmarkData = markerData[content];
      //  setBookmarks();
      handleBookmarkChange(!bookmarked, 'bookmarks', bookmarkData);
      setBookmarked(!bookmarked);
    }
  }

  return popupContent ? (
    <Box sx={{ width: '100%', maxWidth: 300, bgcolor: 'transparent' }} py={1} px={1}>
      <List>
        <ListItem disablePadding>
          <span style={{ fontSize: '16px' }}>{popupContent.title}</span>
        </ListItem>
      </List>
      <Divider />

      <List>
        <ListItem disablePadding>
          <span style={{ fontSize: '16px' }}>Latitude: {popupContent.lat}</span>
        </ListItem>
        <ListItem disablePadding>
          <span style={{ fontSize: '16px' }}>Longitude: {popupContent.lng}</span>
        </ListItem>

        <ListItem disablePadding style={{ fontSize: '16px' }}>
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
            <BookmarkIcon sx={{ ml: 1 }}></BookmarkIcon>
          </Button>
        ) : (
          <Button color="info" size="small" variant="outlined" onClick={handleBookMarkClick}>
            Bookmark
            <BookmarkIcon sx={{ ml: 1 }}></BookmarkIcon>
          </Button>
        )}
      </Stack>
    </Box>
  ) : null;
}

export default PopupMarkerContent;
