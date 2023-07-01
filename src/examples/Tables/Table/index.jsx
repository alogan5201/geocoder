import { useMemo, useEffect } from "react";

import PropTypes from "prop-types";

import { v4 as uuidv4 } from "uuid";
import useStore from "store/mapStore";

import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import Box from "components/Box";
import Avatar from "components/Avatar";
import Typography from "components/Typography";

function Table({ columns, rows, hideColumns, hideColumnRow }) {
  const updateMarkerData = useStore((state) => state.setMarkerData);
  useEffect(() => {
    if (hideColumns) {
      console.log(hideColumns);
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
      },
    ];
    updateMarkerData(markerData);
  };
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
            {row[name]}
          </Typography>
        </Box>
      ))}
    </TableRow>
  ));

  return useMemo(
    () => (
      <MuiTable stickyHeader aria-label="sticky table" >
        <Box component="thead">
          {hideColumnRow && hideColumnRow === true ? (
            <TableRow sx={{display:"none"}}>{renderColumns}</TableRow>
          ) : (
            <TableRow>{renderColumns}</TableRow>
          )}
        </Box>
        <TableBody>{renderRows}</TableBody>
      </MuiTable>
    ),
    [columns, rows]
  );
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
