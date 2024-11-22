import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import Typography from 'components/Typography';

// Custom styles for Progress
import MKProgressRoot from 'components/Progress/MKProgressRoot';

const Progress = forwardRef(({ variant, color, value, label, ...rest }, ref) => (
  <>
    {label && (
      <Typography variant="button" fontWeight="medium" color="text">
        {value}%
      </Typography>
    )}
    <MKProgressRoot {...rest} ref={ref} variant="determinate" value={value} ownerState={{ color, value, variant }} />
  </>
));

// Setting default values for the props of Progress
Progress.defaultProps = {
  variant: 'contained',
  color: 'info',
  value: 0,
  label: false,
};

Progress.displayName = 'Progress';
// Typechecking props for the Progress
Progress.propTypes = {
  variant: PropTypes.oneOf(['contained', 'gradient']),
  color: PropTypes.oneOf(['primary', 'secondary', 'info', 'success', 'warning', 'error', 'light', 'dark']),
  value: PropTypes.number,
  label: PropTypes.bool,
};

export default Progress;
