/* eslint-disable no-param-reassign */

// @mui material components
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Box from 'components/Box';
import Input from 'components/Input';
import Button from 'components/Button';
import Typography from 'components/Typography';

function NewsletterOne() {
  return (
    <Box component="section" py={12}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={5} mr="auto">
            <Typography variant="h4" mb={1}>
              Get Tips &amp; Tricks every Week!
            </Typography>
            <Typography variant="body2" color="text">
              Join our newsletter and get news in your inbox every week!
            </Typography>
          </Grid>
          <Grid item xs={12} lg={6} flexDirection="column" justifyContent="center" ml="auto">
            <Box component="form" method="" action="">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={8}>
                  <Input label="Your Email..." fullWidth />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button variant="gradient" color="info" fullWidth sx={{ height: '100%' }}>
                    Subscribe
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default NewsletterOne;
