import { useEffect, useMemo } from "react";

import PropTypes from "prop-types";

import useStore from "store/mapStore";
import { v4 as uuidv4 } from "uuid";

import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";

import Box from "components/Box";
import Typography from "components/Typography";
import { formatMarkerData } from "util/helpers";

// Table is a React functional component used for rendering a table.
//
// Props:
// - columns: an array of column definitions where each column is an object with properties like name, align, width.
// - rows: an array of row data where each row is an object with key-value pairs corresponding to column names and cell data.
// - hideColumns: an array of indexes indicating which columns to hide.
// - hideColumnRow: a boolean indicating whether to hide the column header row.
// - bookmarkState: an array of bookmarks to check if there's data to display.
//
// Example:
// <Table
//   columns={[{ name: 'Name', align: 'left' }, { name: 'Age', align: 'right' }]}
//   rows={[{ Name: 'Alice', Age: 30 }, { Name: 'Bob', Age: 25 }]}
//   hideColumns={[1]}
//   hideColumnRow={false}
//   bookmarkState={bookmarks}
// />
//

function Table({ columns, rows, hideColumns, hideColumnRow, bookmarkState }) {
  // This hook provides access to the setMarkerData action from the mapStore.
  const updateMarkerData = useStore((state) => state.setMarkerData);
  useEffect(() => {
    if (hideColumns) {
    }
  }, [hideColumns]);
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
     const formattedMarkerData = formatMarkerData(markerData)
        updateMarkerData(formattedMarkerData);
  };
  // renderColumns maps through the columns and returns table header (th) elements.
  const renderColumns = columns.map(({ name, align, width }, key) => {
    let pl;
    let pr;
    let visibility = hideColumns && hideColumns.includes(key) ? "hidden" : "visible";
    if (key === 0) {
      pl = 3;
      pr = 3;
    } else if (key === columns.length - 1) {
      pl = 3;
      pr = 3;
    } else {
      pl = 1;
      pr = 1;
    }

    return (
      <Box
        key={name}
        component="th"
        width={width || "auto"}
        pt={1.5}
        pb={1.25}
        pl={2.5}
        pr={3}
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
  const renderRows = rows.map((row, key) => (
    <TableRow
      onClick={() => handleRowClick(row.address, row.latitude, row.longitude, row.dms, row.id)}
      hover
      key={`row-${key}`}
      sx={{
        "&:nth-of-type(odd)": {
          backgroundColor: "rgba(0, 0, 0, 0)", // Use any grey color you like here
        },
        cursor: "pointer",
        minHeight: "50px", // Set minimum height
        maxHeight: "50px", // Set maximum height
      }}
    >
      {columns.map(({ name, align }) => (
        <Box
          key={uuidv4()}
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
            sx={{ display: "inline-block", width: "max-content" }}
          >
            {row[name].length > 43
              ? (() => {
                  // Find the position of the last comma within the range 28 to 37
                  let breakPos = -1;
                  for (let i = 28; i <= 37; i++) {
                    if (row[name][i] === ",") {
                      breakPos = i + 1; // Break after the comma
                    }
                  }

                  // Return the modified text
                  if (breakPos !== -1) {
                    return (
                      <>
                        {row[name].slice(0, breakPos)}
                        <br />
                        {row[name].slice(breakPos)}
                      </>
                    );
                  } else {
                    return row[name];
                  }
                })()
              : row[name]}
          </Typography>
        </Box>
      ))}
    </TableRow>
  ));
  // Only render the table if there is bookmark data, else render nothing.

  if (bookmarkState && bookmarkState.length > 0) {

    return useMemo(
      () => (
        <MuiTable stickyHeader aria-label="sticky table">
          <Box component="thead">
            {hideColumnRow && hideColumnRow === true ? (
              <TableRow sx={{ display: "none" }}>{renderColumns}</TableRow>
            ) : (
              <TableRow>{renderColumns}</TableRow>
            )}
          </Box>
          <TableBody>{renderRows}</TableBody>
        </MuiTable>
      ),
      [columns, rows]
    );
  } else {
    null;
  }
}

// Setting default values for the props of Table
Table.defaultProps = {
  columns: [],
  rows: [{}],
};

// Typechecking props for the Table
Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
  rows: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
};

export default Table;
