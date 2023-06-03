/* eslint-disable no-template-curly-in-string */
const bgImage =
  "`${linearGradient(rgba(gradients.info.main, 0.5), rgba(gradients.info.state, 0.5))}, url(${bgImage})`";

const headerTwoCode = `import { useEffect, useRef } from "react";

// typed-js
import Typed from "typed.js";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Button from "components/Button";
import Typography from "components/Typography";

// Images
import bgImage from "assets/images/bg-about-us.jpg";

function HeaderTwo() {
  const typedJSRef = useRef(null);

  // Setting up typedJS
  useEffect(() => {
    const typedJS = new Typed(typedJSRef.current, {
      strings: ["web design", "web development", "mobile development"],
      typeSpeed: 70,
      backSpeed: 70,
      backDelay: 200,
      startDelay: 500,
      loop: true,
    });

    return () => typedJS.destroy();
  }, []);

  return (
    <Box component="header" position="relative">
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
            <Box
              component="ul"
              display={{ xs: "none", lg: "flex" }}
              p={0}
              m={0}
              sx={{ listStyle: "none" }}
            >
              <Box component="li">
                <Typography
                  component={Link}
                  href="#"
                  variant="button"
                  p={1}
                  onClick={(e) => e.preventDefault()}
                >
                  <Box component="i" color="white" className="fab fa-twitter" />
                </Typography>
              </Box>
              <Box component="li">
                <Typography
                  component={Link}
                  href="#"
                  variant="button"
                  p={1}
                  onClick={(e) => e.preventDefault()}
                >
                  <Box component="i" color="white" className="fab fa-facebook" />
                </Typography>
              </Box>
              <Box component="li">
                <Typography
                  component={Link}
                  href="#"
                  variant="button"
                  p={1}
                  onClick={(e) => e.preventDefault()}
                >
                  <Box component="i" color="white" className="fab fa-instagram" />
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Container>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ palette: { gradients }, functions: { linearGradient, rgba } }) => ${bgImage},
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container>
          <Grid
            container
            item
            xs={12}
            lg={8}
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
            >
              Our company mission is to lead the <span ref={typedJSRef} />
            </Typography>
            <Typography variant="body1" color="white" mt={1} mb={6} px={{ xs: 3, lg: 6 }}>
              The time is now for it to be okay to be great. People in this world shun people for
              being great. For being a bright color.
            </Typography>
            <Button color="white">contact us</Button>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default HeaderTwo;`;

export default headerTwoCode;
