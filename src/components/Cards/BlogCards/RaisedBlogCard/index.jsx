

// react-router components
import { Link } from 'react-router-dom';

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Icon from '@mui/material/Icon';
import MuiLink from '@mui/material/Link';

import Box from 'components/Box';
import Typography from 'components/Typography';

function RaisedBlogCard({ image, title, description, action }) {
  const cardActionStyles = {
    display: 'flex',
    alignItems: 'center',

    '& .material-icons, .material-icons-round,': {
      transform: `translateX(2px)`,
      transition: 'transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)',
    },

    '&:hover .material-icons, &:focus .material-icons, &:hover .material-icons-round, &:focus .material-icons-round': {
      transform: `translateX(6px)`,
    },
  };

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
        <Typography display="inline" variant="h4" textTransform="capitalize">
          {title}
        </Typography>
        <Box mt={1} mb={3}>
          <Typography variant="body2" component="p" color="text">
            {description}
          </Typography>
        </Box>
        {action.type === 'external' ? (
          <Typography
            component={MuiLink}
            href={action.route}
            target="_blank"
            rel="noreferrer"
            variant="body2"
            fontWeight="regular"
            color={action.color ? action.color : 'dark'}
            sx={cardActionStyles}
          >
            {action.label}
            <Icon sx={{ fontWeight: 'bold' }}>arrow_forward</Icon>
          </Typography>
        ) : (
          <Typography
            component={Link}
            to={action.route}
            variant="body2"
            fontWeight="regular"
            color={action.color ? action.color : 'dark'}
            sx={cardActionStyles}
          >
            {action.label}
            <Icon sx={{ fontWeight: 'bold' }}>arrow_forward</Icon>
          </Typography>
        )}
      </Box>
    </Card>
  );
}

// Typechecking props for the RaisedBlogCard
RaisedBlogCard.propTypes = {
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

export default RaisedBlogCard;
