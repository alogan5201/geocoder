import PropTypes from 'prop-types';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from 'components/Box';
import DefaultNavbar from 'components/Navbars/DefaultNavbar';
import CenteredFooter from 'components/Footers/CenteredFooter';
import GuestFooter from 'components/Footers/CenteredFooter/GuestFooter';
import routes from 'routes';

function BaseLayout({ children }) {
  return (
    <Box display="block" bgColor="white">
      <Box bgColor="white" shadow="sm" py={0.25}>
        <DefaultNavbar routes={routes} transparent relative />
      </Box>
      <main style={{marginBottom:"5em", overflowY:"hidden"}}>


      <Container maxWidth={false} px={2}>
        <Grid container item xs={12} flexDirection="column" justifyContent="center" mx="auto">
          {children}
        </Grid>
      </Container>
      </main>
     <GuestFooter/>
    </Box>
  );
}

BaseLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BaseLayout;
