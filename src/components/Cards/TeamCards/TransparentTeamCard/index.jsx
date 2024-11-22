// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';

import Box from 'components/Box';
import Avatar from 'components/Avatar';
import Typography from 'components/Typography';

function TransparentTeamCard({ image, name, position, description, socials }) {
  return (
    <Box display="flex" flexDirection="column">
      <Box position="relative" width="max-content">
        <Avatar
          variant="rounded"
          size="xxl"
          src={image}
          alt={name}
          sx={{
            borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl,
            position: 'relative',
            zIndex: 2,
          }}
        />
        <Box
          borderRadius="lg"
          shadow="md"
          width="100%"
          height="100%"
          position="absolute"
          left={0}
          top="3%"
          zIndex={1}
          sx={{
            backgroundImage: `url(${image})`,
            transform: 'scale(0.87)',
            filter: 'blur(12px)',
            backgroundSize: 'cover',
          }}
        />
      </Box>
      <Box py={2}>
        <Typography variant="h5">{name}</Typography>
        <Typography variant="body2" color="text" mb={2}>
          {position}
        </Typography>
        <Typography variant="body2" color="text" mb={2}>
          {description}
        </Typography>
        <Stack direction="row" spacing={4} mt={3}>
          {socials}
        </Stack>
      </Box>
    </Box>
  );
}

// Setting default props for the TransparentTeamCard
TransparentTeamCard.defaultProps = {
  description: '',
  socials: '',
};

// Typechecking props for the TransparentTeamCard
TransparentTeamCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  description: PropTypes.string,
  socials: PropTypes.node,
};

export default TransparentTeamCard;
