import PropTypes from 'prop-types';

import Container from '@mui/material/Container';
import Box from 'components/Box';
import GuestFooter from 'components/Footers/CenteredFooter/GuestFooter';
import DefaultNavbar from 'components/Navbars/DefaultNavbar';
import routes from 'routes';

function BaseLayout({ children }) {
  return (
    <Box display="block" bgColor="white">
      <Box bgColor="white" shadow="sm" py={0.25}>
        <DefaultNavbar routes={routes} transparent relative />
      </Box>
      <main style={{marginBottom:"3em", overflowY:"hidden"}}>


      <Container maxWidth={false} px={2}>
          {children}
     
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
