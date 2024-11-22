// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

// @mui icons

import Box from 'components/Box';
import Typography from 'components/Typography';

function CenteredFooter({ links, light }) {
  const year = new Date().getFullYear();

  const renderLinks = links.map((link) => (
    <Typography
      key={link.name}
      component={Link}
      href={link.href}
      variant="body2"
      color={light ? 'white' : 'secondary'}
      fontWeight="regular"
    >
      {link.name}
    </Typography>
  ));

  return (
    <Box component="footer" py={6} sx={{ position: 'absolute', bottom: 0, width: '100%' }}>
      <Grid container justifyContent="center">
        <Grid item xs={10} lg={8}>
          <Stack direction="row" flexWrap="wrap" justifyContent="center" spacing={{ xs: 2, lg: 3, xl: 6 }} mb={3}>
            {renderLinks}
          </Stack>
        </Grid>

        <Grid item xs={12} lg={8} sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color={light ? 'white' : 'secondary'}>
            Copyright &copy; {year} Geotools
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

// Setting default values for the props of CenteredFooter
CenteredFooter.defaultProps = {
  company: { href: 'https://www.creative-tim.com/', name: 'Creative Tim' },
  links: [
    { href: '/', name: 'Geotools' },
    { href: '/address-to-lat-lng', name: 'Address to Latitude & Longitude' },
    { href: '/lat-lng-to-address', name: 'Latitude & Longtidue to Address' },
    { href: '/bookmarks', name: 'Bookmarks' },
    { href: '/movies/1', name: 'Movies' },
  ],
  light: false,
};

// Typechecking props for the CenteredFooter
CenteredFooter.propTypes = {
  company: PropTypes.objectOf(PropTypes.string),
  links: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
  socials: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
  light: PropTypes.bool,
};

export default CenteredFooter;
