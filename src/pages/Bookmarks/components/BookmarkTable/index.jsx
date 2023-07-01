import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import TableContainer from "@mui/material/TableContainer";
import Table from "examples/Tables/Table";
import { useEffect, useState } from "react";
import { addKeyValueToObjectInLocalStorageList } from "util/bookmarks";
import { getCityPhoto } from "util/geocoder";

function BookmarkTable({ bookmarkState }) {
  const [rowData, setRowData] = useState([]);


  useEffect(() => {
    const setBookmarkData = async () => {
      if (bookmarkState && bookmarkState.length > 0) {
        let bookmarks = bookmarkState;

        const bookmarkData = [];
        for (let i = 0; i < bookmarks.length; i++) {
          let obj = {};
          const address =
            bookmarks[i].title && bookmarks[i].title.includes(", United States")
              ? bookmarks[i].title.replace(", United States", "")
              : bookmarks[i].title;
          const latitude = bookmarks[i].lat;
          const longitude = bookmarks[i].lng;
          const dms = bookmarks[i].dms;
          const id = bookmarks[i].id;

          console.log(bookmarks[i].wikiData);

          if (bookmarks[i].cityPhoto) {
            const cityPhoto = bookmarks[i].cityPhoto;
            const photo = cityPhoto ? (
              <IconButton aria-label="delete">
                <img
                  className="bookmark-image"
                  src={cityPhoto.replace("/google-api/", "https://maps.googleapis.com/maps/api/")}
                ></img>
              </IconButton>
            ) : (
              ""
            );
            obj.address = address;
            obj.latitude = latitude;
            obj.longitude = longitude;
            obj.dms = dms;
            obj.id = id;
            obj.action = photo;
            bookmarkData.push(obj);
          } else {
            const cityPhoto = await getCityPhoto(address);
            addKeyValueToObjectInLocalStorageList("bookmarks", id, "cityPhoto", cityPhoto);
            const photo = cityPhoto ? (
              <IconButton aria-label="delete">
                <img
                  className="bookmark-image"
                  src={cityPhoto.replace("/google-api/", "https://maps.googleapis.com/maps/api/")}
                ></img>
              </IconButton>
            ) : (
              ""
            );
            obj.address = address;
            obj.latitude = latitude;
            obj.longitude = longitude;
            obj.dms = dms;
            obj.id = id;
            obj.action = photo;
            bookmarkData.push(obj);
          }
        }

        setRowData(bookmarkData);
      }
    };
    setBookmarkData();
  }, [bookmarkState]);

  const { columns, rows } = {
    columns: [
      { name: "address", align: "left" },
      { name: "action", align: "right" },
    ],
  };
  return (
    <Grid container item xs={12} lg={12} mx="auto">
   
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
      <div style={{ fontSize: "14px", marginTop: "4em" }}>
        {/* <ReactJson src={bookmarkState || {id: 'foo'}} /> */}
      </div>
    </Grid>
  );
}

export default BookmarkTable;
