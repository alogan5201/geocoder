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

// @mui material components
import Icon from "@mui/material/Icon";
import Collapse from "@mui/material/Collapse";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Typography from "components/Typography";

// Material Kit 2 PRO React components
import borders from "assets/theme/base/borders";

function FaqCollapse({ title, open, children, ...rest }) {
  const { borderWidth, borderColor } = borders;

  return (
    <Box mb={2}>
      <Box
        {...rest}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        py={2}
        borderBottom={`${borderWidth[1]} solid ${borderColor}`}
        sx={{ cursor: "pointer" }}
      >
        <Typography variant="h5" color={open ? "dark" : "text"} sx={{ userSelect: "none" }}>
          {title}
        </Typography>
        <Box color={open ? "dark" : "text"}>
          <Icon sx={{ fontWeight: "bold" }} fontSize="small">
            {open ? "remove" : "add"}
          </Icon>
        </Box>
      </Box>
      <Collapse timeout={400} in={open}>
        <Box py={2} lineHeight={1}>
          <Typography variant="button" color="text" opacity={0.8} fontWeight="regular">
            {children}
          </Typography>
        </Box>
      </Collapse>
    </Box>
  );
}

// Typechecking props for the FaqCollapse
FaqCollapse.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default FaqCollapse;
