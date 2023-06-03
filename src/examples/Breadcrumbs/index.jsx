/**
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

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Typography from "components/Typography";

function Breadcrumbs({ routes, ...rest }) {
  return (
    <Box bgColor="light" borderRadius="md" py={1} px={2} width="100%">
      <MuiBreadcrumbs {...rest}>
        {routes.map(({ label, route }) =>
          route ? (
            <Typography
              key={label}
              component={Link}
              to={route}
              variant="button"
              color="text"
              fontWeight="regular"
              opacity={0.8}
              sx={{
                "&:hover, &:focus": {
                  color: ({ palette: { info } }) => info.main,
                },
              }}
            >
              {label}
            </Typography>
          ) : (
            <Typography key={label} variant="button" fontWeight="regular">
              {label}
            </Typography>
          )
        )}
      </MuiBreadcrumbs>
    </Box>
  );
}

// Typechecking props for the Breadcrumbs
Breadcrumbs.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])).isRequired,
};

export default Breadcrumbs;
