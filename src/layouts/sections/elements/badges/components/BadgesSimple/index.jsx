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
import Badge from 'components/Badge';

function BadgesSimple() {
  return (
    <Box component="section" py={12}>
      <Container>
        <Grid container justifyContent="center">
          <Stack direction="row" alignItems="flex-end" spacing={0.5}>
            <Badge badgeContent="primary" variant="contained" color="primary" container />
            <Badge badgeContent="secondary" variant="contained" color="secondary" container />
            <Badge badgeContent="success" variant="contained" color="success" container />
            <Badge badgeContent="error" variant="contained" color="error" container />
            <Badge badgeContent="warning" variant="contained" color="warning" container />
            <Badge badgeContent="info" variant="contained" color="info" container />
            <Badge badgeContent="light" variant="contained" color="light" container />
            <Badge badgeContent="dark" variant="contained" color="dark" container />
          </Stack>
        </Grid>
      </Container>
    </Box>
  );
}

export default BadgesSimple;
