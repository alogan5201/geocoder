// react-router-dom components
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Icon from '@mui/material/Icon';
import Divider from '@mui/material/Divider';

import Box from 'components/Box';
import Typography from 'components/Typography';
import Button from 'components/Button';

function SimplePricingCard({ variant, color, title, description, price, specifications, action }) {
  let titleColor = 'white';
  let priceColor = 'white';
  let buttonColor = 'white';

  if (variant === 'contained') {
    titleColor = color;
    priceColor = color;
    buttonColor = color;
  } else if (variant === 'gradient' && color === 'light') {
    titleColor = 'dark';
    priceColor = 'dark';
    buttonColor = 'dark';
  }

  const renderSpecifications = specifications.map((specification) => (
    <Box key={specification} display="flex" alignItems="center" pb={2}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="1.5rem"
        height="1.5rem"
        mr={2}
        mt={-0.125}
        lineHeight={0}
      >
        <Typography variant="body1" color={titleColor} sx={{ lineHeight: 0 }}>
          <Icon>done</Icon>
        </Typography>
      </Box>
      <Typography
        variant="button"
        color={variant === 'contained' || (variant === 'gradient' && color === 'light') ? 'text' : 'white'}
        fontWeight="regular"
      >
        {specification}
      </Typography>
    </Box>
  ));

  return (
    <Card sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <Box variant={variant} bgColor={variant === 'gradient' ? color : 'white'} height="100%">
        <Box p={3} lineHeight={1}>
          <Typography variant="h5" fontWeight="bold" color={titleColor} mb={0.5}>
            {title}
          </Typography>
          <Typography
            variant="button"
            color={variant === 'contained' || (variant === 'gradient' && color === 'light') ? 'text' : 'white'}
            mb={2}
          >
            {description}
          </Typography>
          <Typography variant="h3" color={priceColor} mt={2} mb={1}>
            {price.value}&nbsp;
            {price.type && (
              <Typography
                display="inline"
                component="small"
                variant="h6"
                color={variant === 'contained' || (variant === 'gradient' && color === 'light') ? 'secondary' : 'white'}
                sx={{
                  fontFamily: ({ typography: { h1 } }) => h1.fontFamily,
                }}
              >
                / {price.type}
              </Typography>
            )}
          </Typography>
          {action.type === 'internal' ? (
            <Box mt={3}>
              <Button
                component={Link}
                to={action.route}
                variant={variant === 'gradient' ? 'contained' : 'gradient'}
                size="small"
                color={buttonColor}
                fullWidth
              >
                {action.label}
              </Button>
            </Box>
          ) : (
            <Box mt={3}>
              <Button
                component="a"
                href={action.route}
                target="_blank"
                rel="noreferrer"
                variant={variant === 'gradient' ? 'contained' : 'gradient'}
                size="small"
                color={buttonColor}
                fullWidth
              >
                {action.label}
              </Button>
            </Box>
          )}
        </Box>
        <Divider
          light={variant === 'gradient' || (variant === 'gradient' && color === 'light')}
          sx={{ my: 0, opacity: variant === 'gradient' ? 0.5 : 0.25 }}
        />
        <Box p={3}>{renderSpecifications}</Box>
      </Box>
    </Card>
  );
}

// Setting default props for the SimplePricingCard
SimplePricingCard.defaultProps = {
  color: 'dark',
  variant: 'contained',
};

// Typechecking props for the SimplePricingCard
SimplePricingCard.propTypes = {
  variant: PropTypes.oneOf(['contained', 'gradient']),
  color: PropTypes.oneOf(['primary', 'secondary', 'info', 'success', 'warning', 'error', 'light', 'dark']),
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.string,
  }).isRequired,
  specifications: PropTypes.arrayOf(PropTypes.string).isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(['external', 'internal']).isRequired,
    route: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default SimplePricingCard;
