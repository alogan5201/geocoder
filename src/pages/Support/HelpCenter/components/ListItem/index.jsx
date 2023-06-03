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

// Material Kit 2 PRO React components
import Box from "components/Box";
import Typography from "components/Typography";

function ListItem({ title, children }) {
  return (
    <Box p={2}>
      <Typography variant="h5" mb={1}>
        {title}
      </Typography>
      <Typography variant="body2" color="text" mb={2}>
        {children}
      </Typography>
    </Box>
  );
}

// Typechecking props for the ListItem
ListItem.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ListItem;
