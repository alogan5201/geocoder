import { forwardRef } from 'react';

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

// Custom styles for SocialButton
import MKSocialButtonRoot from 'components/SocialButton/MKSocialButtonRoot';

const SocialButton = forwardRef(({ color, size, iconOnly, circular, children, ...rest }, ref) => (
  <MKSocialButtonRoot
    {...rest}
    ref={ref}
    variant="contained"
    color="primary"
    size={size}
    ownerState={{ color, size, iconOnly, circular }}
  >
    {children}
  </MKSocialButtonRoot>
));

// Setting default values for the props of SocialButton
SocialButton.defaultProps = {
  size: 'medium',
  color: 'facebook',
  iconOnly: false,
  circular: false,
};

// Typechecking props for the SocialButton
SocialButton.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.oneOf([
    'facebook',
    'twitter',
    'instagram',
    'linkedin',
    'pinterest',
    'youtube',
    'github',
    'vimeo',
    'slack',
    'dribbble',
    'reddit',
    'tumblr',
  ]),
  iconOnly: PropTypes.bool,
  circular: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default SocialButton;
