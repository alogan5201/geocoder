// react-router components
import { Link } from 'react-router-dom';

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

// @mui material components
import Card from '@mui/material/Card';
import MuiLink from '@mui/material/Link';

import Box from 'components/Box';
import Typography from 'components/Typography';
import Button from 'components/Button';

function SimpleBlogCard({ image, title, description, action }) {
  return (
    <Card>
      <Box position="relative" borderRadius="lg" mx={2} mt={-3}>
        <Box
          component="img"
          src={image}
          alt={title}
          borderRadius="lg"
          shadow="md"
          width="100%"
          position="relative"
          zIndex={1}
        />
        <Box
          borderRadius="lg"
          shadow="md"
          width="100%"
          height="100%"
          position="absolute"
          left={0}
          top={0}
          sx={{
            backgroundImage: `url(${image})`,
            transform: 'scale(0.94)',
            filter: 'blur(12px)',
            backgroundSize: 'cover',
          }}
        />
      </Box>
      <Box p={3} mt={-2}>
        <Typography display="inline" variant="h5" textTransform="capitalize" fontWeight="regular">
          {title}
        </Typography>
        <Box mt={1} mb={3}>
          <Typography variant="body2" component="p" color="text">
            {description}
          </Typography>
        </Box>
        {action.type === 'external' ? (
          <Button
            component={MuiLink}
            href={action.route}
            target="_blank"
            rel="noreferrer"
            variant="outlined"
            size="small"
            color={action.color ? action.color : 'dark'}
          >
            {action.label}
          </Button>
        ) : (
          <Button
            component={Link}
            to={action.route}
            variant="outlined"
            size="small"
            color={action.color ? action.color : 'dark'}
          >
            {action.label}
          </Button>
        )}
      </Box>
    </Card>
  );
}

// Typechecking props for the SimpleBlogCard
SimpleBlogCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(['external', 'internal']).isRequired,
    route: PropTypes.string.isRequired,
    color: PropTypes.oneOf(['primary', 'secondary', 'info', 'success', 'warning', 'error', 'dark', 'light']),
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default SimpleBlogCard;
