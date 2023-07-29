

// @mui material components
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import Box from 'components/Box';
import Badge from 'components/Badge';

function BadgesGradient() {
  return (
    <Box component="section" py={12}>
      <Container>
        <Grid container justifyContent="center">
          <Stack direction="row" alignItems="flex-end" spacing={0.5}>
            <Badge badgeContent="primary" color="primary" container />
            <Badge badgeContent="secondary" color="secondary" container />
            <Badge badgeContent="success" color="success" container />
            <Badge badgeContent="error" color="error" container />
            <Badge badgeContent="warning" color="warning" container />
            <Badge badgeContent="info" color="info" container />
            <Badge badgeContent="light" color="light" container />
            <Badge badgeContent="dark" color="dark" container />
          </Stack>
        </Grid>
      </Container>
    </Box>
  );
}

export default BadgesGradient;
