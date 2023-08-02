import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';

import Box from 'components/Box';
import Typography from 'components/Typography';

function DefaultNavbarDropdown({ name, icon, children, collapseStatus, light, href, route, collapse, ...rest }) {
  const [linkProps, setLinkProps] = useState({});

  useEffect(() => {
    if (route) {
      setLinkProps({
        component: Link,
        to: route,
      });
    } else if (href) {
      setLinkProps({
        component: 'a',
        href,
        target: '_blank',
        rel: 'noreferrer',
      });
    }
  }, [href, route]);

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
        {...linkProps}
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
        <Collapse in={collapseStatus} timeout={400} unmountOnExit>
          {children}
        </Collapse>
      )}
    </>
  );
}

DefaultNavbarDropdown.defaultProps = {
  children: false,
  collapseStatus: false,
  light: false,
  href: '',
  route: '',
};

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
