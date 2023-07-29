import { forwardRef } from 'react';

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

// Custom styles for the Badge
import MKBadgeRoot from 'components/Badge/MKBadgeRoot';

const Badge = forwardRef(({ color, variant, size, circular, indicator, border, container, children, ...rest }, ref) => (
  <MKBadgeRoot
    {...rest}
    ownerState={{ color, variant, size, circular, indicator, border, container, children }}
    ref={ref}
    color="default"
  >
    {children}
  </MKBadgeRoot>
));

// Setting default values for the props of Badge
Badge.defaultProps = {
  color: 'info',
  variant: 'gradient',
  size: 'sm',
  circular: false,
  indicator: false,
  border: false,
  children: false,
  container: false,
};

// Typechecking props of the Badge
Badge.propTypes = {
  color: PropTypes.oneOf(['white', 'primary', 'secondary', 'info', 'success', 'warning', 'error', 'light', 'dark']),
  variant: PropTypes.oneOf(['gradient', 'contained']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  circular: PropTypes.bool,
  indicator: PropTypes.bool,
  border: PropTypes.bool,
  children: PropTypes.node,
  container: PropTypes.bool,
};

export default Badge;
