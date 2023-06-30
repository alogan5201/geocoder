import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "components/Box";
import Typography from "components/Typography";
import Table from "examples/Tables/Table";
import TableContainer from "@mui/material/TableContainer";

function BookmarkTable() {
  const [rowData,setRowData] = useState([])
  useEffect(() => {
    const bookmarkData = []
    const bookmarks = localStorage.getItem("bookmarks") ? JSON.parse(localStorage.getItem("bookmarks")) : [];
    for (let i = 0; i < bookmarks.length; i++) {
      let obj = {}
      const address = bookmarks[i].title.replace(", United States", "")
      const latitude = bookmarks[i].lat
      const longitude = bookmarks[i].lng
      const dms = bookmarks[i].dms
      const id = bookmarks[i].id
      obj.address = address
      obj.latitude = latitude
      obj.longitude = longitude
      obj.dms = dms
      obj.id = id
bookmarkData.push(obj)
}

setRowData(bookmarkData)
  }, []);


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
    </Grid>
  );
}

export default BookmarkTable;
