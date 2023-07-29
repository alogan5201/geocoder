import { forwardRef } from 'react';

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

// Custom styles for Button
import MKButtonRoot from 'components/Button/MKButtonRoot';

const Button = forwardRef(({ color, variant, size, circular, iconOnly, children, ...rest }, ref) => (
  <MKButtonRoot
    {...rest}
    ref={ref}
    color="primary"
    variant={variant === 'gradient' ? 'contained' : variant}
    size={size}
    ownerState={{ color, variant, size, circular, iconOnly }}
  >
    {children}
  </MKButtonRoot>
));

// Setting default values for the props of Button
Button.defaultProps = {
  size: 'medium',
  variant: 'contained',
  color: 'white',
  circular: false,
  iconOnly: false,
};

// Typechecking props for the Button
Button.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['text', 'contained', 'outlined', 'gradient']),
  color: PropTypes.oneOf([
    'default',
    'white',
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
    'light',
    'dark',
  ]),
  circular: PropTypes.bool,
  iconOnly: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Button;
