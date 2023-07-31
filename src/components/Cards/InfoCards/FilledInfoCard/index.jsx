
import MuiLink from '@mui/material/Link';
import PropTypes from 'prop-types';

// react-router-dom components
import { Link } from 'react-router-dom';

// @mui material components

import Box from 'components/Box';
import Typography from 'components/Typography';

function FilledInfoCard({ variant, color, title, description, action }) {
  const buttonStyles = {
    width: 'max-content',
    display: 'flex',
    alignItems: 'center',

    '& .material-icons-round': {
      fontSize: '1.125rem',
      transform: `translateX(3px)`,
      transition: 'transform 0.2s cubic-bezier(0.34, 1.61, 0.7, 1.3)',
    },

    '&:hover .material-icons-round, &:focus .material-icons-round': {
      transform: `translateX(6px)`,
    },
  };




  return (
    <Box
      display={{ xs: 'block', md: 'flex' }}
      variant={variant}
      bgColor={variant === 'contained' ? 'white' : color}
      borderRadius="xl"
      py={2}
      px={0}
    >
      <Box pt={{ xs: 3, md: 0 }} pl={{ xs: 0, md: 0 }} lineHeight={1}>
        <Typography
          display="block"
          variant="5"
          color={variant === 'contained' || color === 'light' ? 'success' : 'white'}
          fontWeight="bold"
          mb={1}
          align="left"
        >
          {title}
        </Typography>
        <Typography
          display="block"
          variant="body2"
          color={variant === 'contained' || color === 'light' ? 'text' : 'white'}
          mb={2}
        >
          {description}
        </Typography>
        {action && action.type === 'external' ? (
          <Typography
            component={MuiLink}
            href={action.route}
            target="_blank"
            rel="noreferrer"
            display="block"
            variant="body1"
            color={variant === 'contained' || color === 'light' ? 'text' : 'white'}
            sx={buttonStyles}
          >
            {action.label}
            {action.iconComponent && action.iconComponent}
          </Typography>
        ) : null}
        {action && action.type === 'internal' ? (
          <Typography
            component={Link}
            to={action.route}
            display="block"
            variant="body1"
            color={variant === 'contained' || color === 'light' ? 'text' : 'white'}
            sx={buttonStyles}
          >
            {action.label}
            {action.iconComponent && action.iconComponent}
          </Typography>
        ) : null}
      </Box>
    </Box>
  );
}

// Setting default props for the FilledInfoCard
FilledInfoCard.defaultProps = {
  variant: 'contained',
  color: 'dark',
  action: false,
};

// Typechecking props for the FilledInfoCard
FilledInfoCard.propTypes = {
  variant: PropTypes.oneOf(['contained', 'gradient']),
  color: PropTypes.oneOf(['primary', 'secondary', 'info', 'success', 'warning', 'error', 'light', 'dark']),

  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      type: PropTypes.oneOf(['external', 'internal']).isRequired,
      route: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ]),
};

export default FilledInfoCard;
