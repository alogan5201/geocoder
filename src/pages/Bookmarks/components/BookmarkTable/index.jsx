import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import Box from 'components/Box';
import Spinner from 'components/Spinner';
import { Fragment, useEffect, useMemo, useState } from 'react';
import useStore from 'store/mapStore';
import { getPlacePhoto } from 'util/geocoder';

import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';

import Typography from 'components/Typography';
import { formatMarkerData } from 'util/helpers';

// BookmarkTable is a React functional component that displays a list of bookmarks
// in a table format. The bookmarks are fetched from a given state and includes
// various details like address, latitude, longitude, and an associated image.
//
// Props:
// - bookmarkState: an array of bookmarks.
//
// State:
// - rowData: an array holding the processed data to be displayed in the table.
//
function BookmarkTable({ bookmarkState }) {
  // rowData holds the processed data for the bookmarks to be displayed in the table.
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);
  // This hook provides access to the setMarkerData action from the mapStore.
  const updateMarkerData = useStore((state) => state.setMarkerData);
  const hideColumns = [0, 1];
  const hideColumnRow = true;
  // useEffect hook to perform side-effects. In this case, it processes
  // the bookmarks data once the bookmarkState is updated.
  useEffect(() => {
    // Async function to set the bookmark data.
    const setBookmarkData = async () => {
      // Checking if the bookmarkState array has data.
      if (bookmarkState && bookmarkState.length > 0) {
        let bookmarks = bookmarkState;

        // Array to store processed bookmark data.
        const bookmarkData = [];

        // Loop through each bookmark in the bookmarkState array.
        for (let i = 0; i < bookmarks.length; i++) {
          let obj = {};

          // Process the address and remove ", United States" if it exists.
          const address =
            bookmarks[i].title && bookmarks[i].title.includes(', United States')
              ? bookmarks[i].title.replace(', United States', '')
              : bookmarks[i].title;

          // Extract the latitude, longitude, dms, and id from the bookmark.
          const latitude = bookmarks[i].lat;
          const longitude = bookmarks[i].lng;
          const dms = bookmarks[i].dms;
          const id = bookmarks[i].id;

          // Fetch the city photo if not available in the bookmark.
          const city = bookmarks[i].city;
          const state = bookmarks[i].state;
          const photoLocationQuery = {
            latitude: latitude,
            longitude: longitude,
            city: city,
            state: state,
          };
          const locationPhoto = await getPlacePhoto(photoLocationQuery);

          const imgSrc =
            locationPhoto && locationPhoto.data
              ? locationPhoto.data
              : 'https://firebasestorage.googleapis.com/v0/b/geotools-bc75a.appspot.com/o/images%2Fplaceholder-images%2Fcity-locations%2Fconcept-of-travel-and-adventure-traveller-lifesty-2022-07-12-15-38-22-utc.jpg?alt=media&token=14c18b2f-45a2-440b-af78-d9e7297be52d';
          const photo = (
            <IconButton aria-label="delete">
              <img className="bookmark-image" src={imgSrc} alt="location-city"></img>
            </IconButton>
          );

          // Adding the processed data to obj.
          obj.address = address;
          obj.latitude = latitude;
          obj.longitude = longitude;
          obj.dms = dms;
          obj.id = id;
          obj.action = photo;

          // Pushing obj to bookmarkData array.
          bookmarkData.push(obj);
        }

        // Setting rowData state with the processed bookmark data.
        setRowData(bookmarkData);
        setLoading(false);
      }
    };

    // Call setBookmarkData function.
    setBookmarkData();

    // Dependency array for useEffect, re-run when bookmarkState changes.
  }, [bookmarkState]);

  // Column definitions for the Table.
  const { columns, rows } = {
    columns: [
      { name: 'address', align: 'left' },
      { name: 'action', align: 'right' },
    ],
  };

  const handleRowClick = (address, latitude, longitude, dms, id) => {
    const markerData = [
      {
        id: id,
        lat: latitude,
        lng: longitude,
        title: address,
        userLocation: false,
        popupOpen: false,
      },
    ];
    const formattedMarkerData = formatMarkerData(markerData);
    updateMarkerData(formattedMarkerData);
  };
  // renderColumns maps through the columns and returns table header (th) elements.
  const renderColumns = columns.map(({ name, align, width }, key) => {
    let visibility = hideColumns && hideColumns.includes(key) ? 'hidden' : 'visible';

    return (
      <Box
        key={name}
        component="th"
        width={width || 'auto'}
        textAlign={align}
        color="secondary"
        opacity={0.7}
        sx={({ typography: { size, fontWeightBold }, borders: { borderWidth, borderColor } }) => ({
          fontSize: size.xxs,
          fontWeight: fontWeightBold,
          borderBottom: `${borderWidth[1]} solid ${borderColor}`,
        })}
      >
        <Typography variant="body2" sx={{ visibility: visibility }}>
          {name.toUpperCase()}
        </Typography>
      </Box>
    );
  });
  // renderRows maps through the rows and returns table row (tr) elements.
  const renderRows = rowData.map((row, key) => (
    <TableRow
      onClick={() => handleRowClick(row.address, row.latitude, row.longitude, row.dms, row.id)}
      key={`row-${key}`}
      sx={{
        '&:nth-of-type(odd)': { backgroundColor: '#f8f8f8' },
        '&:hover': { backgroundColor: '#eeeeee' },
        cursor: 'pointer',
        minHeight: '50px', // Set minimum height
        maxHeight: '50px', // Set maximum height
      }}
    >
      {columns.map(({ name, align }, index) => (
        <Box
          key={index}
          component="td"
          pl={2.5}
          pr={3}
          textAlign={align}
          sx={({ borders: { borderWidth, borderColor } }) => ({
            borderBottom: row.hasBorder ? `${borderWidth[1]} solid ${borderColor}` : 0,
          })}
        >
          <Typography
            variant="body2"
            fontWeight="regular"
            color="secondary"
            sx={{ display: 'inline-block', width: 'max-content' }}
          >
            {row[name].length > 43
              ? (() => {
                  // Split the string into parts by comma
                  let parts = row[name].split(',');

                  // Iterate over the parts and insert <br /> after the first comma
                  // and after every second comma thereafter
                  for (let i = 1; i < parts.length; i++) {
                    if (i === 1 || (parts.length > 3 && i % 2 === 0)) {
                      parts[i] = (
                        <Fragment key={i}>
                          <br />
                          {parts[i]}
                        </Fragment>
                      );
                    } else {
                      parts[i] = `,${parts[i]}`;
                    }
                  }

                  // Return the modified text
                  return parts;
                })()
              : row[name]}
          </Typography>
        </Box>
      ))}
    </TableRow>
  ));
  if (bookmarkState && bookmarkState.length > 0) {
    return useMemo(
      () => (
        <Grid container item xs={12} lg={12} mx="auto">
          {loading ? (
            <Box mt={10} width="100%">
              <Spinner />
            </Box>
          ) : (
            <TableContainer
              sx={{
                maxHeight: 440,
                overflowX: 'hidden',
                border: 'none',
                boxShadow: 'none',
                borderRadius: '0',
              }}
            >
              <MuiTable stickyHeader aria-label="sticky table">
                <Box component="thead">
                  {hideColumnRow && hideColumnRow === true ? (
                    <TableRow sx={{ display: 'none' }}>{renderColumns}</TableRow>
                  ) : (
                    <TableRow>{renderColumns}</TableRow>
                  )}
                </Box>
                <TableBody>{renderRows}</TableBody>
              </MuiTable>
            </TableContainer>
          )}

          <div style={{ fontSize: '14px', marginTop: '4em' }}></div>
        </Grid>
      ),
      [columns, rows]
    );
  } else {
    null;
  }
}

// Export the BookmarkTable component.
export default BookmarkTable;
