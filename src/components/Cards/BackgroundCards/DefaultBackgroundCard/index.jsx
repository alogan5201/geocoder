import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import Box from 'components/Box';
import Button from 'components/Button';
import Typography from 'components/Typography';

function DefaultBackgroundCard({ image, label, title, description, action }) {
  return (
    <Card
      sx={({ functions: { rgba, linearGradient }, palette: { black }, borders: { borderRadius } }) => ({
        backgroundImage: `${linearGradient(rgba(black.main, 0.5), rgba(black.main, 0.5))}, url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: borderRadius.xl,
      })}
    >
      <Box textAlign="center" pt={12} pb={3} px={3}>
        {label && (
          <Typography variant="body2" color="white" textTransform="uppercase" mb={2}>
            {label}
          </Typography>
        )}
        <Typography variant="h3" color="white">
          {title}
        </Typography>
        <Typography variant="body2" color="white" opacity={0.8} mb={2}>
          {description}
        </Typography>
        {action.type === 'internal' ? (
          <Button component={Link} to={action.route} color="white" size="small" sx={{ my: 2 }}>
            {action.label}
          </Button>
        ) : (
          <Button
            component="a"
            href={action.route}
            target="_blank"
            rel="noreferrer"
            color="white"
            size="small"
            sx={{ my: 2 }}
          >
            {action.label}
          </Button>
        )}
      </Box>
    </Card>
  );
}

// Setting default values for the props of DefaultBackgroundCard
DefaultBackgroundCard.defaultProps = {
  label: '',
};

// Typechecking props for the DefaultBackgroundCard
DefaultBackgroundCard.propTypes = {
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

export default DefaultBackgroundCard;
