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

// prop-types is a library for type checking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Typography from "components/Typography";

function AboutUsOption({ icon, content }) {
  return (
    <Box display="flex" alignItems="center" p={2}>
      <Box
        width="3rem"
        height="3rem"
        variant="gradient"
        bgColor="info"
        color="white"
        coloredShadow="info"
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="xl"
      >
        <Icon fontSize="small">{icon}</Icon>
      </Box>
      <Typography variant="body2" color="text" pl={2}>
        {content}
      </Typography>
    </Box>
  );
}

// Typechecking props for the AboutUsOption
AboutUsOption.propTypes = {
  icon: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
};

export default AboutUsOption;
