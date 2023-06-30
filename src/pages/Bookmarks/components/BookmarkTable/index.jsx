// prop-types is a library for typechecking of props

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Typography from "components/Typography";

// Material Kit 2 PRO React examples
import Table from "examples/Tables/Table";
import TableContainer from "@mui/material/TableContainer";

// Images



function BookmarkTable() {
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

    ],
  };

  return (
    <Grid container item xs={12} lg={12} mx="auto">
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table columns={columns} rows={rows} stickyHeader aria-label="sticky table" />
      </TableContainer>
    </Grid>
  );
}

export default BookmarkTable;
