// react-router components
import PropTypes from 'prop-types';

// prop-types is a library for typechecking of props

import Card from '@mui/material/Card';
import MuiLink from '@mui/material/Link';
import Box from 'components/Box';
import Typography from 'components/Typography';
import { Link } from 'react-router-dom';

function BlogCard({ image,  title,   raised, action, maxWidth, maxHeight, onLoad }) {
  
  const imageTemplate = (
    <>
      <img
        src={image}
        onLoad={onLoad}
        alt={title}
        style={{
          borderRadius: 'lg',
          shadow: 'none',
          width: '100%',
          color: '#23262d',
          maxWidth: maxWidth,
          maxHeight: maxHeight,
          position: 'relative',
          zIndex: '1',

          boxShadow:
            '0rem 0.25rem 0.375rem -0.0625rem rgba(0, 0, 0, 0.1), 0rem 0.125rem 0.25rem -0.0625rem rgba(0, 0, 0, 0.06)',
        }}
      ></img>
      <div
        style={{
          borderRadius: 'lg',
          shadow: 'none',
          width: '100%',
          height: '100%',
          maxWidth: maxWidth,
          maxHeight: maxHeight,
          position: 'absolute',
          left: '0',
          top: '0',
          background: 'transparent',
          color: '#23262d',

          filter: 'blur(12px)',
          boxShadow:
            '0rem 0.25rem 0.375rem -0.0625rem rgba(0, 0, 0, 0.1), 0rem 0.125rem 0.25rem -0.0625rem rgba(0, 0, 0, 0.06)',
        }}
      ></div>
    </>
  );

  return (
    <Card>
      <Box position="relative" borderRadius="lg" mx={2} mt={raised ? -3 : 2}>
        {action.type === 'internal' ? (
          <Link to={action.route}>{imageTemplate}</Link>
        ) : (
          <MuiLink href={action.route} target="_blank" rel="noreferrer">
            {imageTemplate}
          </MuiLink>
        )}
      </Box>
      <Box p={1} sx={{ textAlign: 'center' }}>
        {action.type === 'internal' ? (
          <Link to={action.route}>
            <Typography variant="caption" textTransform="capitalize" my={1} sx={{ display: 'inline-block' }}>
              {title}
            </Typography>
          </Link>
        ) : (
          <MuiLink href={action.route} target="_blank" rel="noreferrer">
            <Typography variant="caption" textTransform="capitalize" mt={2} mb={1} sx={{ display: 'inline-block' }}>
              {title}
            </Typography>
          </MuiLink>
        )}
      </Box>
    </Card>
  );
}

// Setting default props for the BlogCard
BlogCard.defaultProps = {
  category: false,
  author: false,
  raised: true,
};

// Typechecking props for the BlogCard
BlogCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,

  raised: PropTypes.bool,
  action: PropTypes.shape({
    type: PropTypes.oneOf(['external', 'internal']).isRequired,
    route: PropTypes.string.isRequired,
  }).isRequired,
};

export default BlogCard;
