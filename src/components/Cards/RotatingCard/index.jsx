import { useState } from 'react';

// prop-types is a library for typechecking of props.
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';

import Box from 'components/Box';

function RotatingCard({ children }) {
  const [rotate, setRotate] = useState(false);

  const rotate0 = () => setRotate(false);
  const rotate180 = () => setRotate(true);

  return (
    <Box sx={{ perspective: '50rem' }} onMouseEnter={rotate180} onMouseLeave={rotate0}>
      <Card
        sx={{
          backgroundColor: 'transparent',
          boxShadow: 'none',
          position: 'relative',
          transform: rotate ? 'rotateY(180deg)' : 'rotateY(0)',
          transformStyle: 'preserve-3d',
          transition: 'all 0.8s cubic-bezier(0.34, 1.45, 0.7, 1)',
        }}
      >
        {children}
      </Card>
    </Box>
  );
}

// Typechecking props for the RotatingCard
RotatingCard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RotatingCard;
