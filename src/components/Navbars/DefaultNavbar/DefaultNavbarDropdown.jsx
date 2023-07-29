// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';
// react-router-dom components
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// @mui material components
import Collapse from '@mui/material/Collapse';

import Box from 'components/Box';
import Typography from 'components/Typography';

function DefaultNavbarDropdown({ name, icon, children, collapseStatus, light, href, route, collapse, ...rest }) {
  const linkComponent = {
    component: 'a',
    href,
    target: '_blank',
    rel: 'noreferrer',
  };

  const routeComponent = {
    component: Link,
    to: route,
  };

  return (
    <>
      <Box
        className="DefaultNavbarDropdown"
        {...rest}
        mx={1}
        p={1}
        display="flex"
        alignItems="baseline"
        color={light ? 'white' : 'dark'}
        opacity={light ? 1 : 0.6}
        sx={{ cursor: 'pointer', userSelect: 'none' }}
        {...(route && routeComponent)}
        {...(href && linkComponent)}
      >
        <Typography
          variant="body2"
          lineHeight={1}
          color="inherit"
          sx={{ alignSelf: 'center', '& *': { verticalAlign: 'middle' } }}
        >
          {icon}
        </Typography>
        <Typography
          variant="button"
          fontWeight="regular"
          textTransform="capitalize"
          color={light ? 'white' : 'dark'}
          sx={{ fontWeight: '100%', ml: 1, mr: 0.25 }}
        >
          {name}
        </Typography>
        {collapse && (
          <Typography variant="body2" color={light ? 'white' : 'dark'} ml="auto">
            <ExpandMoreIcon sx={{ fontWeight: 'normal', verticalAlign: 'middle' }} />
          </Typography>
        )}
      </Box>
      {children && collapse && (
        <Collapse in={Boolean(collapseStatus)} timeout={400} unmountOnExit>
          {children}
        </Collapse>
      )}
    </>
  );
}

// Setting default values for the props of DefaultNavbarDropdown
DefaultNavbarDropdown.defaultProps = {
  children: false,
  collapseStatus: false,
  light: false,
  href: '',
  route: '',
};

// Typechecking props for the DefaultNavbarDropdown
DefaultNavbarDropdown.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  children: PropTypes.node,
  collapseStatus: PropTypes.bool,
  light: PropTypes.bool,
  href: PropTypes.string,
  route: PropTypes.string,
  collapse: PropTypes.bool.isRequired,
};

export default DefaultNavbarDropdown;
