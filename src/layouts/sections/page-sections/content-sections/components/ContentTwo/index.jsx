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
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Badge from "components/Badge";
import Button from "components/Button";
import Avatar from "components/Avatar";
import Typography from "components/Typography";
import SocialButton from "components/SocialButton";

// Images
import profilePicture from "assets/images/team-2.jpg";

function ContentTwo() {
  return (
    <Box component="section" py={20}>
      <Container>
        <Grid container>
          <Grid item xs={12} lg={8} mx="auto">
            <Grid container justifyContent="space-betweeb" alignItems="center">
              <Grid item xs={12} md={6}>
                <Box ml={-1}>
                  <Badge badgeContent="Photography" variant="contained" color="info" />
                  <Badge badgeContent="Stories" variant="contained" color="info" />
                  <Badge badgeContent="Castle" variant="contained" color="info" />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <SocialButton color="facebook" size="small">
                    <Box className="fab fa-facebook" color="inherit" mr={1} /> 872
                  </SocialButton>
                  <SocialButton color="twitter" size="small">
                    <Box className="fab fa-twitter" color="inherit" mr={1} /> 910
                  </SocialButton>
                  <SocialButton color="pinterest" size="small">
                    <Box className="fab fa-pinterest" color="inherit" mr={1} /> 232
                  </SocialButton>
                </Stack>
              </Grid>
            </Grid>
            <Divider sx={{ mt: 1 }} />
            <Box display="flex" alignItems="center">
              <Avatar
                src={profilePicture}
                alt="Alec Thompson"
                size="xxl"
                variant="rounded"
                shadow="xl"
              />
              <Box ml={3}>
                <Typography variant="h5" mb={1}>
                  Alec Thompson
                </Typography>
                <Typography variant="button" color="text">
                  I&apos;ve been trying to figure out the bed design for the master bedroom at our
                  Hidden Hills compound...I like good music from Youtube.
                </Typography>
              </Box>
              <Box display={{ xs: "none", lg: "block" }} ml={1}>
                <Button color="dark">Follow</Button>
              </Box>
            </Box>
            <Box display={{ xs: "block", lg: "none" }} mt={1}>
              <Button color="dark">Follow</Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ContentTwo;
