import React from "react";
import { useWhatChanged } from "@simbathesailor/use-what-changed";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "components/Typography";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Button from "components/Button";
const { VITE_NODE_ENV } = import.meta.env;
// Only Once in your app you can set whether to enable hooks tracking or not.
// In CRA(create-react-app) e.g. this can be done in src/index.js

// This way the tracking will only happen in devlopment mode and will not
// happen in non-devlopment mode

export default function WhatChanged() {
  const [a, setA] = React.useState(0);

  const [b, setB] = React.useState(0);

  const [c, setC] = React.useState(0);

  const [d, setD] = React.useState(0);

  // Just place the useWhatChanged hook call with dependency before your

  // useEffect, useCallback or useMemo

  useWhatChanged([a, b, c, d], "a, b, c, d"); // debugs the below useEffect

  React.useEffect(() => {
    //
  }, [a, b, c, d]);

  return (
    <div>
      <Box component="section" py={12}>
        <Container>
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={9}>
              <Typography variant="h3">A = {a}</Typography>
            </Grid>
            <Stack direction="row" alignItems="flex-end" spacing={1}>
              <Button variant="outlined" color="info" onClick={() => setA(a + 1)}>
                info
              </Button>
              <Button variant="outlined" color="secondary">
                secondary
              </Button>
              <Button variant="outlined" color="success">
                success
              </Button>
            </Stack>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}
