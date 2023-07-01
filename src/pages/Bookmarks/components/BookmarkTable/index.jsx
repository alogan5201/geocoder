import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import TableContainer from "@mui/material/TableContainer";
import Table from "examples/Tables/Table";
import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import {getCityPhoto} from "util/geocoder"


function BookmarkTable() {
  const [rowData, setRowData] = useState([]);
  const [bookmarkState, setBookmarkState] = useState(localStorage.getItem("bookmarks") || []);
  const [value, setValue, remove] = useLocalStorage("bookmarks");
  useEffect(() => {
    window.addEventListener("storage", () => {
      setBookmarkState(localStorage.getItem("bookmarks") || []);
    });
  }, []);

  useEffect(() => {
       const setBookmarkData = async () => {
      if (bookmarkState && bookmarkState.length > 0) {
        let bookmarks = JSON.parse(bookmarkState);
        if (bookmarks && bookmarks.length > 0) {
          const bookmarkData = [];
          for (let i = 0; i < bookmarks.length; i++) {
            let obj = {};
            const address = bookmarks[i].title.includes(", United States")
              ? bookmarks[i].title.replace(", United States", "")
              : bookmarks[i].title;
            const latitude = bookmarks[i].lat;
            const longitude = bookmarks[i].lng;
            const dms = bookmarks[i].dms;
            const id = bookmarks[i].id;
            
            console.log(bookmarks[i].wikiData);
            const cityPhoto = await getCityPhoto(address)
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

          console.log(photo);
            obj.address = address;
            obj.latitude = latitude;
            obj.longitude = longitude;
            obj.dms = dms;
            obj.id = id;
      obj.action = photo
              bookmarkData.push(obj);
          }

          setRowData(bookmarkData);
        }
      }
       };
 setBookmarkData()
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
        />
      </TableContainer>
      <div style={{ fontSize: "14px", marginTop: "4em" }}>
        {/* <ReactJson src={bookmarkState || {id: 'foo'}} /> */}
      </div>
    </Grid>
  );
}

export default BookmarkTable;
