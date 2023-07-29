import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

// @mui icons

export default function GuestFooter({ links, light }) {
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
    <Paper sx={{ marginTop: 'calc(5% + 60px)', bottom: 0, pt: 3 }} component="footer" square variant="outlined">
      <Container maxWidth="lg">
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: 'center',
            display: 'flex',
            my: 1,
          }}
        >
          <Stack direction="row" flexWrap="wrap" justifyContent="center" spacing={{ xs: 2, lg: 3, xl: 6 }} mb={3}>
            {renderLinks}
          </Stack>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            justifyContent: 'center',
            display: 'flex',
            mb: 2,
          }}
        >
          <Typography variant="body2" color={light ? 'white' : 'secondary'}>
            Copyright &copy; {year} Geotools
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
}
// Setting default values for the props of GuestFooter
GuestFooter.defaultProps = {
  company: { href: 'https://www.creative-tim.com/', name: 'Creative Tim' },
  links: [
    { href: '/', name: 'Geotools' },
    { href: '/address-to-lat-lng', name: 'Address to Latitude & Longitude' },
    { href: '/lat-lng-to-address', name: 'Latitude & Longtidue to Address' },
    { href: '/route-planner', name: 'Route Planner' },
    { href: '/bookmarks', name: 'Bookmarks' },
    { href: '/movies/1', name: 'Movies' },
  ],
  light: false,
};

// Typechecking props for the GuestFooter
GuestFooter.propTypes = {
  company: PropTypes.objectOf(PropTypes.string),
  links: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
  socials: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
  light: PropTypes.bool,
};
