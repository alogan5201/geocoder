
import NavigationIcon from '@mui/icons-material/Navigation';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from 'components/Box'
const ScrollTopButton = () => {
    const mobileScrollTo = (offset) => {
        window.scrollTo({ top: offset, behavior: 'smooth' });
    }

    return (
      <Fab
        aria-label="scroll-back-to-top"
        onClick={() => mobileScrollTo(0)}
        size="small"
        style={{
          backgroundColor: '#d5e8eb',
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 2000, // a large number to ensure the button is not covered by other elements
        }}
      >
        <Box sx={{ fontSize: '25px', maxHeight: '29px' }}>
          <KeyboardArrowUpIcon style={{ color: 'rgba(33, 118, 174,0.8)' }} />
        </Box>
      </Fab>
    );
};

export default ScrollTopButton