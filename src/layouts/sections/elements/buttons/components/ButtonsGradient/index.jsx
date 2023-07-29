/*
=========================================================
* Material Kit 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

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
