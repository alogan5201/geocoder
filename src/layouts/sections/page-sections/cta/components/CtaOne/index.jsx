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
import Grid from "@mui/material/Grid";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Input from "components/Input";
import Button from "components/Button";
import Typography from "components/Typography";

// Images
import image from "assets/images/examples/blog2.jpg";

function StatsOne() {
  return (
    <Box component="section" py={12}>
      <Box bgColor="grey-100" py={12} px={{ xs: 3, lg: 0 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} xl={6} ml="auto">
            <Typography variant="h4" mb={1}>
              Be the first to see the news
            </Typography>
            <Typography variant="body2" color="text" mb={3}>
              Your company may not be in the software business, but eventually, a software company
              will be in your business.
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={5}>
                <Input label="Email Here" fullWidth />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button variant="gradient" color="warning" sx={{ height: "100%" }}>
                  Subscribe
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} xl={4} position="relative">
            <Box
              component="img"
              src={image}
              alt="image"
              maxWidth="18.75rem"
              width="100%"
              borderRadius="lg"
              shadow="xl"
              mt={-24}
              display={{ xs: "none", lg: "block" }}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default StatsOne;
