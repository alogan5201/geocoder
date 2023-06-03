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

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Alert from "components/Alert";

function SimpleAlerts() {
  return (
    <Box component="section" py={6}>
      <Container>
        <Grid container item xs={12} lg={10} mx="auto">
          <Grid item xs={12}>
            <Alert color="primary">A simple primary alert—check it out!</Alert>
          </Grid>
          <Grid item xs={12}>
            <Alert color="secondary">A simple secondary alert—check it out!</Alert>
          </Grid>
          <Grid item xs={12}>
            <Alert color="success">A simple success alert—check it out!</Alert>
          </Grid>
          <Grid item xs={12}>
            <Alert color="error">A simple error alert—check it out!</Alert>
          </Grid>
          <Grid item xs={12}>
            <Alert color="warning">A simple warning alert—check it out!</Alert>
          </Grid>
          <Grid item xs={12}>
            <Alert color="info">A simple info alert—check it out!</Alert>
          </Grid>
          <Grid item xs={12}>
            <Alert color="light">A simple light alert—check it out!</Alert>
          </Grid>
          <Grid item xs={12}>
            <Alert color="dark">A simple dark alert—check it out!</Alert>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default SimpleAlerts;
