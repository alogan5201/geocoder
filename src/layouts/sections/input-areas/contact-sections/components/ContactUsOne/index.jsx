// @mui material components
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Box from 'components/Box';
import Input from 'components/Input';
import Button from 'components/Button';
import Typography from 'components/Typography';

function ContactUsOne() {
  return (
    <Box component="section" py={12}>
      <Container>
        <Grid container item justifyContent="center" xs={10} lg={7} mx="auto" mb={{ xs: 0, md: 6 }} textAlign="center">
          <Typography variant="h3" mb={1}>
            Contact Us
          </Typography>
          <Typography variant="body2" color="text">
            For further questions, including partnership opportunities, please email hello@creative-tim.com or contact
            using our contact form.
          </Typography>
        </Grid>
        <Grid container item xs={12} lg={8} sx={{ mx: 'auto' }}>
          <Box width="100%" component="form" method="post" autoComplete="off">
            <Box p={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Input label="Full Name" fullWidth />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input type="email" label="Email" fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <Input label="What can we help you?" multiline fullWidth rows={6} />
                </Grid>
              </Grid>
              <Grid container item justifyContent="center" xs={12} my={6}>
                <Button type="submit" variant="gradient" color="info">
                  Send Message
                </Button>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}

export default ContactUsOne;
