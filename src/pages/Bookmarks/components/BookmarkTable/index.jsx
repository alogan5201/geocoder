import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import TableContainer from "@mui/material/TableContainer";
import Box from "components/Box";
import Spinner from "components/Spinner";
import Table from "examples/Tables/Table";
import { useEffect, useState } from "react";
import { getPhotoByCoordinates } from "util/geocoder";
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
            bookmarks[i].title && bookmarks[i].title.includes(", United States")
              ? bookmarks[i].title.replace(", United States", "")
              : bookmarks[i].title;

          // Extract the latitude, longitude, dms, and id from the bookmark.
          const latitude = bookmarks[i].lat;
          const longitude = bookmarks[i].lng;
          const dms = bookmarks[i].dms;
          const id = bookmarks[i].id;

          // Check if the bookmark has a city photo.
          if (bookmarks[i].cityPhoto) {
            // Processing the URL for the city photo.
            const cityPhoto = bookmarks[i].cityPhoto;
            const photoUrl = cityPhoto
              ? cityPhoto.replace("/google-api/", "https://maps.googleapis.com/maps/api/")
              : "";

            // Adding the city photo to the object using an IconButton.
            const photo = cityPhoto ? (
              <IconButton aria-label="delete">
                <img className="bookmark-image" src={photoUrl}></img>
              </IconButton>
            ) : (
              ""
            );

            // Adding the processed data to obj.
            obj.address = address;
            obj.latitude = latitude;
            obj.longitude = longitude;
            obj.dms = dms;
            obj.id = id;
            obj.action = photo;
            const city = bookmarks[i].city;
            const state = bookmarks[i].state;
            // Pushing obj to bookmarkData array.
            bookmarkData.push(obj);
          } else {
            // Fetch the city photo if not available in the bookmark.
            const city = bookmarks[i].city;
            const state = bookmarks[i].state;
            const locationPhoto = await getPhotoByCoordinates(latitude, longitude, city, state);

            const photoUrl = locationPhoto
              ? locationPhoto.replace("/google-api/", "https://maps.googleapis.com/maps/api/")
              : "";
            const photo = locationPhoto ? (
              <IconButton aria-label="delete">
                <img className="bookmark-image" src={photoUrl}></img>
              </IconButton>
            ) : (
              ""
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
      { name: "address", align: "left" },
      { name: "action", align: "right" },
    ],
  };

  // Render the component.
  return (
    <Grid container item xs={12} lg={12} mx="auto">
      {loading ? (
        <Box mt={10} width="100%">
          <Spinner />
        </Box>
      ) : (
        <TableContainer
          sx={{
            maxHeight: 440,
            overflowX: "hidden",
            border: "none",
            boxShadow: "none",
            borderRadius: "0",
          }}
        >
          <Table
            columns={columns}
            rows={rowData}
            aria-label="sticky table"
            hideColumns={[0, 1]}
            hideColumnRow={true}
            bookmarkState={bookmarkState}
          />
        </TableContainer>
      )}

      <div style={{ fontSize: "14px", marginTop: "4em" }}></div>
    </Grid>
  );
}

// Export the BookmarkTable component.
export default BookmarkTable;
