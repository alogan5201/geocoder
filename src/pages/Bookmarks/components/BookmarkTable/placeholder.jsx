import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import Box from 'components/Box';
import Spinner from 'components/Spinner';
import { Fragment, useEffect, useMemo, useState } from 'react';
import useStore from 'store/mapStore';
import { getPlacePhoto } from 'util/geocoder';
import Skeleton from '@mui/material/Skeleton';

import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';

import Typography from 'components/Typography';
import { formatMarkerData } from 'util/helpers';

// PlaceHolderBookmarkTable is a React functional component that displays a list of bookmarks
// in a table format. The bookmarks are fetched from a given state and includes
// various details like address, latitude, longitude, and an associated image.
//
// Props:
// - bookmarkState: an array of bookmarks.
//
// State:
// - rowData: an array holding the processed data to be displayed in the table.
//
function PlaceHolderBookmarkTable({ bookmarkState }) {
  // rowData holds the processed data for the bookmarks to be displayed in the table.
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);
  // This hook provides access to the setMarkerData action from the mapStore.
  const updateMarkerData = useStore((state) => state.setMarkerData);
  const hideColumns = [0, 1];
  const hideColumnRow = true;
  // useEffect hook to perform side-effects. In this case, it processes
  // the bookmarks data once the bookmarkState is updated.

  // Column definitions for the Table.
  const { columns, rows } = {
    columns: [
      { name: 'address', align: 'left' },
      { name: 'action', align: 'right' },
    ],
  };

  // renderColumns maps through the columns and returns table header (th) elements.
  const renderColumns = columns.map(({ name, align, width }, key) => {
    let visibility = hideColumns && hideColumns.includes(key) ? 'hidden' : 'visible';

    return (
      <Box
        key={name}
        component="th"
        width={width || 'auto'}
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
  const renderRows = Array.from({ length: bookmarkState }).map((_, index) => (
    <TableRow
      key={index}
      sx={{
        '&:nth-of-type(odd)': { backgroundColor: '#f8f8f8' },
        '&:hover': { backgroundColor: '#eeeeee' },
        cursor: 'pointer',
        minHeight: '50px', // Set minimum height
        maxHeight: '50px', // Set maximum height
      }}
    >
      {Array.from({ length: bookmarkState }).map((_, index) => (
        <Box key={index} component="td" pl={2.5} pr={3}>
          <Typography
            variant="body2"
            fontWeight="regular"
            color="secondary"
            sx={{ display: 'inline-block', width: 'max-content' }}
          >
            hello
            <Skeleton width="60%" />
          </Typography>
        </Box>
      ))}
    </TableRow>
  ));
  if (bookmarkState && bookmarkState.length > 0) {
    return useMemo(
      () => (
        <Grid container item xs={12} lg={12} mx="auto">
          <TableContainer
            sx={{
              maxHeight: 440,
              overflowX: 'hidden',
              border: 'none',
              boxShadow: 'none',
              borderRadius: '0',
            }}
          >
            <MuiTable stickyHeader aria-label="sticky table">
              <Box component="thead">
                {hideColumnRow && hideColumnRow === true ? (
                  <TableRow sx={{ display: 'none' }}>{renderColumns}</TableRow>
                ) : (
                  <TableRow>{renderColumns}</TableRow>
                )}
              </Box>
              <TableBody>
                {' '}
                <TableRow
                  sx={{
                    '&:nth-of-type(odd)': { backgroundColor: '#f8f8f8' },
                    '&:hover': { backgroundColor: '#eeeeee' },
                    cursor: 'pointer',
                    minHeight: '50px', // Set minimum height
                    maxHeight: '50px', // Set maximum height
                  }}
                >
                  <Box component="td" pl={2.5} pr={3}>
                    <Typography
                      variant="body2"
                      fontWeight="regular"
                      color="secondary"
                      sx={{ display: 'inline-block', width: '100%' }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between"}}>
                        <Skeleton width="20%" />
                        <Skeleton variant="rectangular" width={210} height={118} />
                      </Box>
                    </Typography>
                  </Box>
                </TableRow>
              </TableBody>
            </MuiTable>
          </TableContainer>

          <div style={{ fontSize: '14px', marginTop: '4em' }}></div>
        </Grid>
      ),
      [columns, rows]
    );
  } else {
    null;
  }
}

// Export the PlaceHolderBookmarkTable component.
export default PlaceHolderBookmarkTable;
