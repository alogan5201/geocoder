import PropTypes from 'prop-types';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from 'components/Box';
import DefaultNavbar from 'components/Navbars/DefaultNavbar';
import CenteredFooter from 'components/Footers/CenteredFooter';

import routes from 'routes';

function BaseLayout({ children }) {
  return (
    <Box display="flex" flexDirection="column" bgColor="white" minHeight="100vh">
      <Box bgColor="white" shadow="sm" py={0.25}>
        <DefaultNavbar routes={routes} transparent relative />
      </Box>
      <Container maxWidth="sm" px={{ xs: 0, sm: 4 }}>
        <Grid container item xs={12} flexDirection="column" justifyContent="center" mx="auto">
          {children}
        </Grid>
      </Container>
      <Box mt={30}>
        <CenteredFooter />
      </Box>
    </Box>
  );
}

BaseLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BaseLayout;
