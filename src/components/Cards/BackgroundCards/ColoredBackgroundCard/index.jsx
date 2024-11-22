// react-router-dom components
import { Link } from 'react-router-dom';

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';

import Box from 'components/Box';
import Button from 'components/Button';
import Typography from 'components/Typography';

function ColoredBackgroundCard({ color, image, label, title, description, action }) {
  return (
    <Card
      sx={({ palette: { gradients }, functions: { rgba, linearGradient }, borders: { borderRadius } }) => ({
        backgroundImage: `${linearGradient(
          rgba(gradients[color] ? gradients[color].main : gradients.info.main, 0.9),
          rgba(gradients[color] ? gradients[color].state : gradients.info.state, 0.9)
        )}, url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: borderRadius.xl,
        height: '100%',
        display: 'grid',
        placeItems: 'center',
      })}
    >
      <Box textAlign="center" p={3} my={12}>
        {label && (
          <Typography
            display="block"
            variant="caption"
            color={color === 'light' ? 'text' : 'white'}
            textTransform="uppercase"
            opacity={0.8}
            fontWeight="bold"
            mb={2}
          >
            {label}
          </Typography>
        )}
        <Typography variant="h4" color={color === 'light' ? 'dark' : 'white'}>
          {title}
        </Typography>
        <Typography variant="body2" color={color === 'light' ? 'text' : 'white'} opacity={0.8} mb={3}>
          {description}
        </Typography>
        {action.type === 'internal' ? (
          <Button
            component={Link}
            to={action.route}
            variant={color === 'light' ? 'gradient' : 'contained'}
            color={color === 'light' ? 'dark' : 'white'}
            size="small"
          >
            {action.label}
          </Button>
        ) : (
          <Button
            component="a"
            href={action.route}
            target="_blank"
            rel="noreferrer"
            variant={color === 'light' ? 'gradient' : 'contained'}
            color={color === 'light' ? 'dark' : 'white'}
            size="small"
          >
            {action.label}
          </Button>
        )}
      </Box>
    </Card>
  );
}

// Setting default values for the props of ColoredBackgroundCard
ColoredBackgroundCard.defaultProps = {
  color: 'info',
  label: '',
};

// Typechecking props for the ColoredBackgroundCard
ColoredBackgroundCard.propTypes = {
  color: PropTypes.oneOf(['primary', 'secondary', 'info', 'success', 'warning', 'error', 'dark', 'light']),
  image: PropTypes.string.isRequired,
  label: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.node.isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(['external', 'internal']).isRequired,
    route: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default ColoredBackgroundCard;
