

// @mui material components
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import Box from 'components/Box';
import Progress from 'components/Progress';

function ProgressSimple() {
  return (
    <Box component="section" bgColor="white" py={12}>
      <Container>
        <Grid container item xs={12} lg={6} justifyContent="center" mx="auto">
          <Stack spacing={2} width="100%">
            <Progress color="primary" value={50} />
            <Progress color="secondary" value={50} />
            <Progress color="success" value={50} />
            <Progress color="info" value={50} />
            <Progress color="warning" value={50} />
            <Progress color="error" value={50} />
            <Progress color="dark" value={50} />
          </Stack>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProgressSimple;
