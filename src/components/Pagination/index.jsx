import { forwardRef, createContext, useContext } from 'react';

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

import Box from 'components/Box';

// Custom styles for Pagination
import MKPaginationItemRoot from 'components/Pagination/MKPaginationItemRoot';

// The Pagination main context
const Context = createContext();

const Pagination = forwardRef(({ item, variant, color, size, active, children, placement, ...rest }, ref) => {
  const context = item ? useContext(Context) : null;
  const paginationSize = context ? context.size : null;
  let placementValue = 'flex-end';

  if (placement === 'left') {
    placementValue = 'flex-start';
  } else if (placement === 'center') {
    placementValue = 'center';
  }

  return (
    <Context.Provider value={{ variant, color, size }}>
      {item ? (
        <MKPaginationItemRoot
          {...rest}
          ref={ref}
          variant={active ? context.variant : 'outlined'}
          color={active ? context.color : 'secondary'}
          iconOnly
          circular
          ownerState={{ variant, active, paginationSize }}
        >
          {children}
        </MKPaginationItemRoot>
      ) : (
        <Box display="flex" justifyContent={placementValue} alignItems="center" sx={{ listStyle: 'none' }}>
          {children}
        </Box>
      )}
    </Context.Provider>
  );
});

// Setting default values for the props of Pagination
Pagination.defaultProps = {
  item: false,
  variant: 'gradient',
  color: 'info',
  size: 'medium',
  active: false,
  placement: 'right',
};

// Typechecking props for the Pagination
Pagination.propTypes = {
  item: PropTypes.bool,
  variant: PropTypes.oneOf(['gradient', 'contained']),
  color: PropTypes.oneOf(['white', 'primary', 'secondary', 'info', 'success', 'warning', 'error', 'light', 'dark']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  active: PropTypes.bool,
  children: PropTypes.node.isRequired,
  placement: PropTypes.oneOf(['left', 'right', 'center']),
};

export default Pagination;
