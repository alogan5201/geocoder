/*
=========================================================
* Material Kit 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useMemo } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// uuid is a library for generating unique id
import { v4 as uuidv4 } from "uuid";

// @mui material components
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Avatar from "components/Avatar";
import Typography from "components/Typography";

function Table({ columns, rows }) {
  const renderColumns = columns.map(({ name, align, width }, key) => {
    let pl;
    let pr;

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
        pl={align === "left" ? pl : 3}
        pr={align === "right" ? pr : 3}
        textAlign={align}
        color="secondary"
        opacity={0.7}
        sx={({ typography: { size, fontWeightBold }, borders: { borderWidth, borderColor } }) => ({
          fontSize: size.xxs,
          fontWeight: fontWeightBold,
          borderBottom: `${borderWidth[1]} solid ${borderColor}`,
        })}
      >
        {name.toUpperCase()}
      </Box>
    );
  });

  const renderRows = rows.map((row, key) => {
    const rowKey = `row-${key}`;

    const tableRow = columns.map(({ name, align }) => {
      let template;

      if (Array.isArray(row[name])) {
        template = (
          <Box
            key={uuidv4()}
            component="td"
            p={1}
            sx={({ borders: { borderWidth, borderColor } }) => ({
              borderBottom: row.hasBorder ? `${borderWidth[1]} solid ${borderColor}` : 0,
            })}
          >
            <Box display="flex" alignItems="center" py={0.5} px={1}>
              <Box mr={2}>
                <Avatar src={row[name][0]} name={row[name][1]} variant="rounded" size="sm" />
              </Box>
              <Typography variant="button" fontWeight="medium" sx={{ width: "max-content" }}>
                {row[name][1]}
              </Typography>
            </Box>
          </Box>
        );
      } else {
        template = (
          <Box
            key={uuidv4()}
            component="td"
            p={1}
            textAlign={align}
            sx={({ borders: { borderWidth, borderColor } }) => ({
              borderBottom: row.hasBorder ? `${borderWidth[1]} solid ${borderColor}` : 0,
            })}
          >
            <Typography
              variant="button"
              fontWeight="regular"
              color="secondary"
              sx={{ display: "inline-block", width: "max-content" }}
            >
              {row[name]}
            </Typography>
          </Box>
        );
      }

      return template;
    });

    return <TableRow key={rowKey}>{tableRow}</TableRow>;
  });

  return useMemo(
    () => (
  
        <MuiTable>
          <Box component="thead">
            <TableRow>{renderColumns}</TableRow>
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
