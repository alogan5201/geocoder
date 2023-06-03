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

// Material Kit 2 PRO React components
import Box from "components/Box";
import Typography from "components/Typography";

// Material Kit 2 PRO React examples
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

function SocialAnalytics() {
  return (
    <Box component="section" py={6}>
      <Container>
        <Grid
          container
          item
          justifyContent="center"
          xs={12}
          lg={6}
          sx={{ mx: "auto", pb: 3, textAlign: "center" }}
        >
          <Typography variant="h4" color="info" textGradient>
            Social Analytics
          </Typography>
          <Typography variant="h2" my={1}>
            Turn your idea into a startup
          </Typography>
          <Typography variant="body1" color="text">
            We&apos;re constantly trying to express ourselves and actualize our dreams. If you have
            the opportunity to play
          </Typography>
        </Grid>
        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12} md={6} lg={4}>
            <DefaultInfoCard
              icon="groups"
              title="Check our team"
              description="We get insulted by others, lose trust for those others. We get back here to follow
                my dreams"
              direction="center"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <DefaultInfoCard
              icon="support_agent"
              title="Support 24/7"
              description="We get insulted by others, lose trust for those others. We get back here to follow
                my dreams"
              direction="center"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4} sx={{ mx: "auto" }}>
            <DefaultInfoCard
              icon="update"
              title="Unlimited revisions"
              description="We get insulted by others, lose trust for those others. We get back here to follow
                my dreams"
              direction="center"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default SocialAnalytics;
