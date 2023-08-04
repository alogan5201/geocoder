
import Box from "components/Box";

import Grid from "@mui/material/Grid";
import { PuffLoader } from "react-spinners";

import Container from '@mui/material/Container';
import DefaultNavbar from 'components/Navbars/DefaultNavbar';
import routes from 'routes';
function Loading() {
  return (
    <>
    
        <Box display="block" bgColor="white">
          <Box bgColor="white" shadow="sm" py={0.25}>
            <DefaultNavbar routes={routes} transparent relative />
          </Box>
          <main style={{ marginBottom: '3em', overflowY: 'hidden' }}>
            <Container maxWidth={false} px={2}>
              <Box component="section" py={{ xs: 2, sm: 6 }} sx={{ overflow: 'hidden' }}>
                <Grid container item px={0}>
                  <Box width="100%" bgColor="white" mt={4} mb={6} sx={{ overflow: 'hidden' }}>
                    <Grid container spacing={0}>
                      <Box
                        px={{ xs: 1, sm: 3 }}
                        py={{ xs: 0, sm: 0 }}
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: '100%',
                          minHeight: '50vh',
                          overflowY: 'hidden',
                        }}
                      >
                        <PuffLoader color="#1A73E8" />
                      </Box>
                    </Grid>
                  </Box>
                </Grid>
              </Box>
            </Container>
          </main>
        
        </Box>
     
    </>
  );
}
export default Loading;
