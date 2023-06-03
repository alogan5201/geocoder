/* eslint-disable react/jsx-no-duplicate-props */
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
import Typography from "components/Typography";
import Input from "components/Input";
import Button from "components/Button";

// Images
import macbook from "assets/images/macbook.png";

function Newsletter() {
  return (
    <Box component="section" pt={6} my={6}>
      <Container>
        <Grid container alignItems="center">
          <Grid item  md={6} sx={{ ml: { xs: 0, lg: 3 }, mb: { xs: 12, md: 0 } }}>
            <Typography variant="h4">Be the first to see the news</Typography>
            <Typography variant="body2" color="text" mb={3}>
              Your company may not be in the software business, but eventually, a software company
              will be in your business.
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={8}>
                <Input type="email" label="Email Here..." fullWidth />
              </Grid>
              <Grid item xs={4}>
                <Button variant="gradient" color="info" sx={{ height: "100%" }}>
                  Subscribe
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={5} sx={{ ml: "auto" }}>
            <Box position="relative">
              <Box component="img" src={macbook} alt="macbook" width="100%" />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Newsletter;
