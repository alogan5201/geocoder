import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "components/Box";
import Typography from "components/Typography";
import Table from "examples/Tables/Table";
import TableContainer from "@mui/material/TableContainer";
import ReactJson from "react-json-view";
import { useLocalStorage } from "react-use";

function BookmarkTable() {
  const [rowData,setRowData] = useState([])
  const [bookmarkState, setBookmarkState] = useState(localStorage.getItem("bookmarks") || []);
   const [value, setValue, remove] = useLocalStorage("bookmarks");
useEffect(() => {
window.addEventListener("storage", () => {
  setBookmarkState(localStorage.getItem("bookmarks") || []);
  

});
}, []);

useEffect(() => {
  if(bookmarkState && bookmarkState.length > 0){
    console.log(bookmarkState)
    let bookmarks = JSON.parse(bookmarkState)
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
            obj.address = address;
            obj.latitude = latitude;
            obj.longitude = longitude;
            obj.dms = dms;
            obj.id = id;
            bookmarkData.push(obj);
          }

          setRowData(bookmarkData);
        }
  }
}, [bookmarkState]);

/*   useEffect(() => {
    if (bookmarkState && bookmarkState.length > 0) {
      const bookmarkData = [];
      for (let i = 0; i < bookmarkState.length; i++) {
        let obj = {};
        const address = bookmarkState[i].title.includes(", United States") ? bookmarkState[i].title.replace(", United States", "") : bookmarkState[i].title;
        const latitude = bookmarkState[i].lat;
        const longitude = bookmarkState[i].lng;
        const dms = bookmarkState[i].dms;
        const id = bookmarkState[i].id;
        obj.address = address;
        obj.latitude = latitude;
        obj.longitude = longitude;
        obj.dms = dms;
        obj.id = id;
        bookmarkData.push(obj);
      }

      setRowData(bookmarkData);
    }
  }, [bookmarkState]); */


  const { columns, rows } = {
    columns: [
      { name: "address", align: "left" },
      { name: "latitude", align: "left" },
      { name: "longitude", align: "left" },
    ],

    rows: [
      {
        address: "Atlanta, GA",
        latitude: "33.748992",
        longitude: " -84.390264",
      },
      {
        address: "Atlanta, GA",
        latitude: "33.748992",
        longitude: " -84.390264",
      },
      {
        address: "Atlanta, GA",
        latitude: "33.748992",
        longitude: " -84.390264",
      },
      {
        address: "Atlanta, GA",
        latitude: "33.748992",
        longitude: " -84.390264",
      },
      {
        address: "Atlanta, GA",
        latitude: "33.748992",
        longitude: " -84.390264",
      },
      {
        address: "Atlanta, GA",
        latitude: "33.748992",
        longitude: " -84.390264",
      },

    ],
  };

  return (
    <Grid container item xs={12} lg={12} mx="auto">
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table columns={columns} rows={rowData} stickyHeader aria-label="sticky table" />
      </TableContainer>
      <div style={{fontSize: "14px", marginTop:"4em"}}>
      {/* <ReactJson src={bookmarkState || {id: 'foo'}} /> */}

      </div>
    </Grid>
  );
}

export default BookmarkTable;
