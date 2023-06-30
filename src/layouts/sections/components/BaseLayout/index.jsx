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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Typography from "components/Typography";

// Material Kit 2 PRO React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import CenteredFooter from "examples/Footers/CenteredFooter";

// Routes
import routes from "routes";

function BaseLayout({  children }) {
  return (
    <Box display="flex" flexDirection="column" bgColor="white" minHeight="100vh">
      <Box bgColor="white" shadow="sm" py={0.25}>
        <DefaultNavbar
          routes={routes}
          action={{
            type: "external",
            route: "https://www.creative-tim.com/product/material-kit-pro-react",
            label: "buy now",
            color: "info",
          }}
          transparent
          relative
        />
      </Box>
      <Container maxWidth="sm" px={{ xs: 0, sm: 4 }}>
        <Grid container item xs={12} flexDirection="column" justifyContent="center" mx="auto">
          {children}
        </Grid>
      </Container>
      <Box mt="auto">
        <CenteredFooter />
      </Box>
    </Box>
  );
}

// Typechecking props for the BaseLayout
BaseLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BaseLayout;
