import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { useIsScrolledToBottom } from 'hooks/mobileHooks';
import { useEffect, useState } from 'react';
import { useWindowSize } from 'react-use';
import { mobileScrollToTop } from 'util/helpers';

const MobileScrollTopButton = () => {
  const { width } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);
  const isAtBottom = useIsScrolledToBottom(300);
  const handleScrollClick = () => { 
    
   mobileScrollToTop();
  }
  useEffect(() => {
    if (width) {
      if (width < 992) {
        setIsMobile(true);
      } else if (isMobile) {
        setIsMobile(false);
      }
    }
    return () => {
      if (isMobile) {
        setIsMobile(false);
      }
    };
  }, [width]);

  return isMobile && isAtBottom ? (
    <Fab
      aria-label="scroll-back-to-top"
      onClick={handleScrollClick}
      size="small"
      style={{
        backgroundColor: '#d5e8eb',
        position: 'fixed',
        bottom: '1em',
        right: '20px',
        zIndex: 2000, // a large number to ensure the button is not covered by other elements
      }}
    >
      <Box sx={{ fontSize: '25px', maxHeight: '29px' }}>
        <KeyboardArrowUpIcon style={{ color: 'rgba(33, 118, 174,0.8)' }} />
      </Box>
    </Fab>
  ) : null;
};

export default MobileScrollTopButton;
