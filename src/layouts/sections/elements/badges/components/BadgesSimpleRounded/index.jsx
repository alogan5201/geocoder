
// @mui material components
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import Box from 'components/Box';
import Badge from 'components/Badge';

function BadgesSimpleRounded() {
  return (
    <Box component="section" py={12}>
      <Container>
        <Grid container justifyContent="center">
          <Stack direction="row" alignItems="flex-end" spacing={0.5}>
            <Badge badgeContent="primary" variant="contained" color="primary" container circular />
            <Badge badgeContent="secondary" variant="contained" color="secondary" container circular />
            <Badge badgeContent="success" variant="contained" color="success" container circular />
            <Badge badgeContent="error" variant="contained" color="error" container circular />
            <Badge badgeContent="warning" variant="contained" color="warning" container circular />
            <Badge badgeContent="info" variant="contained" color="info" container circular />
            <Badge badgeContent="light" variant="contained" color="light" container circular />
            <Badge badgeContent="dark" variant="contained" color="dark" container circular />
          </Stack>
        </Grid>
      </Container>
    </Box>
  );
}

export default BadgesSimpleRounded;
