// @mui material components
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Box from 'components/Box';
import Input from 'components/Input';
import Button from 'components/Button';
import Typography from 'components/Typography';

function Wrapper({ children, name }) {
  return (
    <Box component="section" py={12}>
      <Container>
        <Typography variant="h4" mb={6}>
          {name}
        </Typography>
        <Grid container spacing={3}>
          {children}
        </Grid>
      </Container>
    </Box>
  );
}

export default Wrapper;
