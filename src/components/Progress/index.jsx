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

import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Material Kit 2 PRO React components
import Typography from "components/Typography";

// Custom styles for Progress
import MKProgressRoot from "components/Progress/MKProgressRoot";

const Progress = forwardRef(({ variant, color, value, label, ...rest }, ref) => (
  <>
    {label && (
      <Typography variant="button" fontWeight="medium" color="text">
        {value}%
      </Typography>
    )}
    <MKProgressRoot
      {...rest}
      ref={ref}
      variant="determinate"
      value={value}
      ownerState={{ color, value, variant }}
    />
  </>
));

// Setting default values for the props of Progress
Progress.defaultProps = {
  variant: "contained",
  color: "info",
  value: 0,
  label: false,
};

// Typechecking props for the Progress
Progress.propTypes = {
  variant: PropTypes.oneOf(["contained", "gradient"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  value: PropTypes.number,
  label: PropTypes.bool,
};

export default Progress;
