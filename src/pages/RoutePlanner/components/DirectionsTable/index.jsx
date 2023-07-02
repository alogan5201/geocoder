import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import TableContainer from "@mui/material/TableContainer";
import Table from "./Table";
import { useEffect, useState } from "react";
import { addKeyValueToObjectInLocalStorageList } from "util/bookmarks";
import { getCityPhoto } from "util/geocoder";

function DirectionsTable() {
  const [rowData, setRowData] = useState([]);



  const { columns, rows } = {
    // * Data structure for row
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

export default DirectionsTable;
