// react-router components
import { useState, useEffect, lazy } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

// @mui material components
import Card from '@mui/material/Card';
import MuiLink from '@mui/material/Link';

import Box from 'components/Box';
import Typography from 'components/Typography';
import Avatar from 'components/Avatar';
import useStore from 'store/mapStore';
const { VITE_THE_MOVIE_DB_API_KEY } = import.meta.env;

function MovieCard({
  image,
  category,
  title,
  description,
  author,
  raised,
  action,
  maxWidth,
  maxHeight,
  allImagesLoaded,
}) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const { imagesLoaded, setImagesLoaded } = useStore((state) => ({
    imagesLoaded: state.imagesLoaded,
    setImagesLoaded: state.setImagesLoaded,
  }));

  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => {
      setIsImageLoaded(true);
      setImagesLoaded();
      setImageSrc(image);
    };
  }, [image]);

  const renderImage = () => (
    <Box
      component="img"
      src={imageSrc}
      alt={title}
      borderRadius="lg"
      shadow={raised ? 'md' : 'none'}
      width="100%"
      height={maxHeight}
      position="relative"
      zIndex={1}
      style={{ display: allImagesLoaded ? 'block' : 'none' }}
    />
  );

  const renderSkeleton = () => <Skeleton variant="rectangular" width={267} height={400} />;

  return (
    <Card sx={{ maxWidth: maxWidth }} p={0}>
      <Box position="relative" borderRadius="lg" mx={2} mt={raised ? -3 : 2}>
        {action.type === 'internal' ? (
          <Link to={action.route}>{allImagesLoaded ? renderImage() : renderSkeleton()}</Link>
        ) : (
          <MuiLink href={action.route} target="_blank" rel="noreferrer">
            {allImagesLoaded ? renderImage() : renderSkeleton()}
          </MuiLink>
        )}
      </Box>
      <Box p={2} align="center">
        {category && (
          <Typography
            variant="caption"
            color={category.color}
            textTransform="uppercase"
            fontWeight="medium"
            textGradient
            sx={{ display: 'block', fontWeight: 500 }}
          >
            {category.label}
          </Typography>
        )}
        {action.type === 'internal' ? (
          <Link to={action.route}>
            {allImagesLoaded ? (
              <Typography
                align="center"
                variant="caption"
                textTransform="capitalize"
                my={1}
                sx={{ display: 'inline-block', fontWeight: 500 }}
              >
                {title}
              </Typography>
            ) : (
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} width="50%" />
            )}
          </Link>
        ) : (
          <MuiLink href={action.route} target="_blank" rel="noreferrer">
            {allImagesLoaded ? (
              <Typography
                align="center"
                variant="caption"
                textTransform="capitalize"
                mt={2}
                mb={1}
                sx={{ display: 'inline-block' }}
              >
                {title}
              </Typography>
            ) : (
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} width="50%" />
            )}
          </MuiLink>
        )}
        {description && (
          <Typography variant="body2" component="p" color="text">
            {description}
          </Typography>
        )}
        {author && (
          <Box display="flex" alignItems="center" mt={3}>
            <Avatar src={author.image} alt={author.name} shadow="md" variant={raised ? 'circular' : 'rounded'} />
            <Box pl={2} lineHeight={0}>
              <Typography component="caption" variant="button" fontWeight="medium" gutterBottom>
                {author.name}
              </Typography>
              <Typography variant="caption" color="text">
                {author.date}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Card>
  );
}

// Setting default props for the MovieCard
MovieCard.defaultProps = {
  category: false,
  author: false,
  raised: true,
  maxWidth: '100%',
  maxHeight: 300,
};

// Typechecking props for the MovieCard
MovieCard.propTypes = {
  image: PropTypes.string.isRequired,
  category: PropTypes.oneOfType([
    PropTypes.shape({
      color: PropTypes.oneOf(['primary', 'secondary', 'info', 'success', 'warning', 'error', 'dark']).isRequired,
      label: PropTypes.string.isRequired,
    }),
    PropTypes.bool,
  ]),
  title: PropTypes.string.isRequired,
  author: PropTypes.oneOfType([
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      date: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    }),
    PropTypes.bool,
  ]),
  raised: PropTypes.bool,
  action: PropTypes.shape({
    type: PropTypes.oneOf(['external', 'internal']).isRequired,
    route: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieCard;
