/**
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
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Input from "components/Input";
import Button from "components/Button";
import Typography from "components/Typography";

function ContactUs() {
  return (
    <Box component="section" py={12}>
      <Container>
        <Grid
          container
          item
          justifyContent="center"
          xs={10}
          lg={6}
          sx={{ mx: "auto", mb: { xs: 0, md: 6 }, textAlign: "center" }}
        >
          <Typography variant="h3" mb={1}>
            We are here for you
          </Typography>
          <Typography variant="body2" color="text">
            For further questions, including partnership opportunities
          </Typography>
        </Grid>
        <Grid container item xs={12} lg={8} sx={{ mx: "auto" }}>
          <Box width="100%" component="form" method="post" autoComplete="off">
            <Box p={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Input
                    variant="standard"
                    label="Full Name"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    type="email"
                    variant="standard"
                    label="Email"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Input
                    variant="standard"
                    label="What can we help you?"
                    placeholder="Describe your problem in at least 250 characters"
                    InputLabelProps={{ shrink: true }}
                    multiline
                    fullWidth
                    rows={6}
                  />
                </Grid>
              </Grid>
              <Grid container item justifyContent="center" xs={12} my={6}>
                <Button type="submit" variant="gradient" color="dark">
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

export default ContactUs;
