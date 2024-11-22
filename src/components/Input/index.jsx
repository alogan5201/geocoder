import { forwardRef } from 'react';

import PropTypes from 'prop-types';

// Custom styles for Input
import MKInputRoot from 'components/Input/MKInputRoot';

const Input = forwardRef(({ error, success, disabled, ...rest }, ref) => (
  <MKInputRoot {...rest} ref={ref} ownerState={{ error, success, disabled }} />
));

Input.displayName = 'Input';
// Setting default values for the props of Input
Input.defaultProps = {
  error: false,
  success: false,
  disabled: false,
};

// Typechecking props for the Input
Input.propTypes = {
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Input;
