
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import colors from "assets/theme/base/colors";
 function Spinner({color}) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <CircularProgress color={color} />
    </Box>
  );
}

Spinner.defaultProps = {
color: "secondary"
};
export default Spinner