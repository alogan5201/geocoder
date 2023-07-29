/*
=========================================================
* Material Kit 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is library for typechecking of props
import PropTypes from 'prop-types';

import Box from 'components/Box';
import Avatar from 'components/Avatar';
import Typography from 'components/Typography';

function MiniReviewCard({ color, review, author }) {
  return (
    <Box
      variant={color === 'transparent' ? 'contained' : 'gradient'}
      bgColor={color}
      borderRadius="xl"
      coloredShadow={color === 'transparent' ? 'none' : color}
      p={3}
    >
      <Typography variant="body2" color={color === 'transparent' || color === 'light' ? 'text' : 'white'} my={2}>
        &quot;{review}&quot;
      </Typography>
      <Box display="flex" alignItems="center" mt={3}>
        <Avatar src={author.image} alt={author.name} shadow="md" />
        <Box pl={1.5} lineHeight={1}>
          <Typography
            display="block"
            variant="button"
            fontWeight="bold"
            color={color === 'transparent' || color === 'light' ? 'dark' : 'white'}
          >
            {author.name}
          </Typography>
          <Typography
            variant="caption"
            fontWeight="regular"
            color={color === 'transparent' || color === 'light' ? 'text' : 'white'}
          >
            {author.date}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

// Setting default values for the props of MiniReviewCard
MiniReviewCard.defaultProps = {
  color: 'transparent',
};

// Typechecking props for the MiniReviewCard
MiniReviewCard.propTypes = {
  color: PropTypes.oneOf([
    'transparent',
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
    'dark',
    'light',
  ]),
  review: PropTypes.string.isRequired,
  author: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};

export default MiniReviewCard;
