import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Icon from '@mui/material/Icon';

import Box from 'components/Box';
import Typography from 'components/Typography';

function InfoBackgroundCard({ image, icon, title, label }) {
  return (
    <Card
      sx={({ functions: { rgba, linearGradient }, palette: { gradients }, borders: { borderRadius } }) => ({
        backgroundImage: `${linearGradient(
          rgba(gradients.dark.main, 0.8),
          rgba(gradients.dark.state, 0.8)
        )}, url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: borderRadius.xl,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      })}
    >
      <Box width="100%" p={3}>
        <Typography variant="h3" color="white">
          {typeof icon === 'string' ? <Icon>{icon}</Icon> : icon}
        </Typography>
      </Box>
      <Box width="100%" pt={1} pb={2} px={3} lineHeight={1}>
        <Typography variant="h4" color="white">
          {title}
        </Typography>
        {label && (
          <Typography variant="caption" textTransform="uppercase" fontWeight="bold" color="white" opacity={0.7}>
            {label}
          </Typography>
        )}
      </Box>
    </Card>
  );
}

// Setting default values for the props of InfoBackgroundCard
InfoBackgroundCard.defaultProps = {
  label: '',
};

// Typechecking props for the InfoBackgroundCard
InfoBackgroundCard.propTypes = {
  image: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default InfoBackgroundCard;
