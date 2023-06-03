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

import { useEffect, useRef } from "react";

// rellax
import Rellax from "rellax";

// typed-js
import Typed from "typed.js";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Typography from "components/Typography";
import Button from "components/Button";

// Material Kit 2 PRO React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";

// About Us page sections
import Information from "pages/Company/AboutUs/sections/Information";
import Team from "pages/Company/AboutUs/sections/Team";
import Featuring from "pages/Company/AboutUs/sections/Featuring";
import Newsletter from "pages/Company/AboutUs/sections/Newsletter";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";

// Images
import bgImage from "assets/images/bg-about-us.jpg";

function AboutUs() {
  const headerRef = useRef(null);
  const typedJSRef = useRef(null);

  // Setting up rellax
  useEffect(() => {
    const parallax = new Rellax(headerRef.current, {
      speed: -6,
    });

    return () => parallax.destroy();
  }, []);

  // Setting up typedJS
  useEffect(() => {
    const typedJS = new Typed(typedJSRef.current, {
      strings: ["team", "design", "tool"],
      typeSpeed: 90,
      backSpeed: 90,
      backDelay: 200,
      startDelay: 500,
      loop: true,
    });

    return () => typedJS.destroy();
  }, []);

  return (
    <>
      <DefaultNavbar
        routes={routes}
        action={{
          type: "external",
          route: "https://www.creative-tim.com/product/material-kit-pro-react",
          label: "buy now",
          color: "default",
        }}
        transparent
        light
      />
      <Box
        ref={headerRef}
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid
            container
            item
            xs={12}
            lg={8}
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            sx={{ mx: "auto", textAlign: "center" }}
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
              Work with an amazing <span ref={typedJSRef} />
            </Typography>
            <Typography variant="body1" color="white" opacity={0.8} mt={1} mb={3}>
              We&apos;re constantly trying to express ourselves and actualize our dreams. If you
              have the opportunity to play this game
            </Typography>
            <Button color="default" sx={{ color: ({ palette: { dark } }) => dark.main }}>
              create account
            </Button>
            <Typography variant="h6" color="white" mt={8} mb={1}>
              Find us on
            </Typography>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography component="a" variant="body1" color="white" href="#" mr={3}>
                <i className="fab fa-facebook" />
              </Typography>
              <Typography component="a" variant="body1" color="white" href="#" mr={3}>
                <i className="fab fa-instagram" />
              </Typography>
              <Typography component="a" variant="body1" color="white" href="#" mr={3}>
                <i className="fab fa-twitter" />
              </Typography>
              <Typography component="a" variant="body1" color="white" href="#">
                <i className="fab fa-google-plus" />
              </Typography>
            </Box>
          </Grid>
        </Container>
      </Box>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <Information />
        <Team />
        <Featuring />
        <Newsletter />
      </Card>
      <Box pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </Box>
    </>
  );
}

export default AboutUs;
