/* eslint-disable no-param-reassign */

// @mui material components
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';

import Box from 'components/Box';
import Input from 'components/Input';
import Button from 'components/Button';
import Typography from 'components/Typography';

function NewsletterTwo() {
  return (
    <Box component="section" py={20}>
      <Container>
        <Grid container item xs={12} lg={4} flexDirection="column" justifyContent="center" textAlign="center" mx="auto">
          <Box
            width="3rem"
            height="3rem"
            display="flex"
            alignItems="center"
            justifyContent="center"
            variant="gradient"
            bgColor="warning"
            color="white"
            borderRadius="lg"
            coloredShadow="warning"
            mx="auto"
            mb={3}
          >
            <Icon>person</Icon>
          </Box>
          <Typography variant="h3" mb={1}>
            Subscribe
          </Typography>
          <Typography variant="body2" color="text">
            This is the paragraph where you can write more details about your product.
          </Typography>
        </Grid>
        <Grid container item xs={12} lg={6} flexDirection="column" justifyContent="center" mx="auto" mt={6}>
          <Box component="form" method="" action="">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
                <Input label="Your Email..." fullWidth />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button variant="gradient" color="warning" fullWidth sx={{ height: '100%' }}>
                  Subscribe
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}

export default NewsletterTwo;
