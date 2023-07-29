

// @mui material components
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import Box from 'components/Box';
import Button from 'components/Button';

function ButtonsGradient() {
  return (
    <Box component="section" py={12}>
      <Container>
        <Grid container justifyContent="center">
          <Stack direction="row" alignItems="flex-end" spacing={1}>
            <Button variant="gradient" color="primary">
              primary
            </Button>
            <Button variant="gradient" color="secondary">
              secondary
            </Button>
            <Button variant="gradient" color="info">
              info
            </Button>
            <Button variant="gradient" color="success">
              success
            </Button>
            <Button variant="gradient" color="warning">
              warning
            </Button>
            <Button variant="gradient" color="error">
              error
            </Button>
            <Button variant="gradient" color="light">
              light
            </Button>
            <Button variant="gradient" color="dark">
              dark
            </Button>
            <Button variant="gradient" color="white">
              White
            </Button>
          </Stack>
        </Grid>
      </Container>
    </Box>
  );
}

export default ButtonsGradient;
