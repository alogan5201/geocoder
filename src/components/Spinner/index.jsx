
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import colors from "assets/theme/base/colors";
import { PuffLoader } from 'react-spinners';

 function Spinner({color}) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <PuffLoader color="#1A73E8" />
    </Box>
  );
}

Spinner.defaultProps = {
color: "secondary"
};
export default Spinner