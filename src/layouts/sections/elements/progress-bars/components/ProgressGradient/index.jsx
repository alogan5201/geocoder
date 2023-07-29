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
import Progress from 'components/Progress';

function ProgressGradient() {
  return (
    <Box component="section" bgColor="white" py={12}>
      <Container>
        <Grid container item xs={12} lg={6} justifyContent="center" mx="auto">
          <Stack spacing={2} width="100%">
            <Progress variant="gradient" color="primary" value={50} />
            <Progress variant="gradient" color="secondary" value={50} />
            <Progress variant="gradient" color="success" value={50} />
            <Progress variant="gradient" color="info" value={50} />
            <Progress variant="gradient" color="warning" value={50} />
            <Progress variant="gradient" color="error" value={50} />
            <Progress variant="gradient" color="dark" value={50} />
          </Stack>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProgressGradient;
