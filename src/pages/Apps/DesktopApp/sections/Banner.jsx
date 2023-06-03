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
import Button from "components/Button";
import Typography from "components/Typography";

// Images
import bgPattern from "assets/images/shapes/pattern-lines.svg";
import laptop from "assets/images/macbook-2.png";

function Banner() {
  return (
    <Box
      variant="gradient"
      bgColor="warning"
      position="relative"
      borderRadius="xl"
      mx={{ xs: 2, xl: 3, xxl: 16 }}
      mt={-32}
      py={13}
      px={3}
      sx={{ overflow: "hidden" }}
    >
      <Box
        component="img"
        src={bgPattern}
        alt="pattern-lines"
        position="absolute"
        top={0}
        left={0}
        width="100%"
        opacity={0.6}
      />
      <Container sx={{ position: "relative" }}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} md={7} lg={5} py={{ xs: 0, sm: 6 }} mr="auto" position="relative">
            <Typography variant="h2" color="white" mb={1}>
              Start building your awesome application
            </Typography>
            <Typography variant="body1" color="white" mb={6}>
              Elegance is the end result of hard work, not the starting point. Strive to make your
              work so invisible that the reader thinks they could have written what you published.
              Trusted by 5.000+ clients from all around the world.
            </Typography>
            <Button variant="gradient" color="dark">
              Start now
            </Button>
            <Button variant="text" color="white" sx={{ ml: 1 }}>
              Read more
            </Button>
          </Grid>
          <Grid item xs={12} position="absolute" left="50%" mr={-32} width="75%">
            <Box
              component="img"
              src={laptop}
              alt="macbook"
              width="100%"
              display={{ xs: "none", md: "block" }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Banner;
