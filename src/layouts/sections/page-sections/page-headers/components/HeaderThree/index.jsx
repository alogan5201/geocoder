/* eslint-disable no-unused-vars */
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
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Button from "components/Button";
import Typography from "components/Typography";

// Images
import bgImage from "assets/images/bg-presentation.jpg";

function HeaderThree() {
  return (
    <Box component="header" position="relative" height="100%">
      <Box component="nav" position="absolute" top="0.5rem" width="100%">
        <Container>
          <Grid container flexDirection="row" alignItems="center">
            <Typography
              component={Link}
              href="#"
              variant="button"
              color="white"
              fontWeight="regular"
              py={0.8125}
              mr={2}
            >
              Material Design
            </Typography>
            <Button
              variant="outlined"
              color="white"
              sx={{ display: { xs: "block", lg: "none" }, ml: "auto" }}
            >
              <Box component="i" color="white" className="fas fa-bars" />
            </Button>
            <Box
              component="ul"
              display={{ xs: "none", lg: "flex" }}
              p={0}
              my={0}
              mx="auto"
              sx={{ listStyle: "none" }}
            >
              <Box component="li">
                <Typography
                  component={Link}
                  href="#"
                  variant="button"
                  color="white"
                  fontWeight="regular"
                  p={1}
                  onClick={(e) => e.preventDefault()}
                >
                  Home
                </Typography>
              </Box>
              <Box component="li">
                <Typography
                  component={Link}
                  href="#"
                  variant="button"
                  color="white"
                  fontWeight="regular"
                  p={1}
                  onClick={(e) => e.preventDefault()}
                >
                  About Us
                </Typography>
              </Box>
              <Box component="li">
                <Typography
                  component={Link}
                  href="#"
                  variant="button"
                  color="white"
                  fontWeight="regular"
                  p={1}
                  onClick={(e) => e.preventDefault()}
                >
                  Contact Us
                </Typography>
              </Box>
            </Box>
            <Button color="default">buy now</Button>
          </Grid>
        </Container>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        minHeight="100%"
        sx={{
          backgroundImage: ({ palette: { gradients }, functions: { linearGradient, rgba } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.4),
              rgba(gradients.dark.state, 0.4)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container>
          <Grid
            container
            item
            xs={12}
            lg={6}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            mx="auto"
          >
            <Typography
              variant="h1"
              color="white"
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
              mb={3}
            >
              Work with an amazing
            </Typography>
            <Typography variant="body1" color="white" mt={1} mb={{ xs: 3, sm: 8 }} px={3}>
              We&apos;re constantly trying to express ourselves and actualize our dreams. If you
              have the opportunity to play this game. If you have the opportunity to play this game.
            </Typography>
            <Typography variant="h6" color="white" textTransform="uppercase" mb={3}>
              connect with us on:
            </Typography>
            <Stack direction="row" spacing={6} mx="auto">
              <Typography
                component={Link}
                href="#"
                variant="body2"
                onClick={(e) => e.preventDefault()}
              >
                <Box component="i" color="white" className="fab fa-facebook" />
              </Typography>
              <Typography
                component={Link}
                href="#"
                variant="body2"
                onClick={(e) => e.preventDefault()}
              >
                <Box component="i" color="white" className="fab fa-instagram" />
              </Typography>
              <Typography
                component={Link}
                href="#"
                variant="body2"
                onClick={(e) => e.preventDefault()}
              >
                <Box component="i" color="white" className="fab fa-twitter" />
              </Typography>
              <Typography
                component={Link}
                href="#"
                variant="body2"
                onClick={(e) => e.preventDefault()}
              >
                <Box component="i" color="white" className="fab fa-google-plus" />
              </Typography>
            </Stack>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default HeaderThree;
