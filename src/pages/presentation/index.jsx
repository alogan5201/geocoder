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
import Card from "@mui/material/Card";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Badge from "components/Badge";
import Typography from "components/Typography";
import SocialButton from "components/SocialButton";

// Material Kit 2 PRO React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import FilledInfoCard from "examples/Cards/InfoCards/FilledInfoCard";

// Presentation page sections
import Counters from "pages/presentation/sections/Counters";
import Information from "pages/presentation/sections/Information";
import DesignBlocks from "pages/presentation/sections/DesignBlocks";
import AuthPages from "pages/presentation/sections/AuthPages";
import Pages from "pages/presentation/sections/Pages";
import Testimonials from "pages/presentation/sections/Testimonials";
import Pricing from "pages/presentation/sections/Pricing";

// Presentation page components
import BuiltByDevelopers from "pages/presentation/components/BuiltByDevelopers";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";

// Images
import bgImage from "assets/images/bg-presentation.jpg";

function Presentation() {
  return (
    <>
      <DefaultNavbar
        routes={routes}
        action={{
          type: "external",
          route: "https://www.creative-tim.com/product/material-kit-pro-react",
          label: "buy now",
          color: "info",
        }}
        sticky
      />
      <Box
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
            <Typography
              variant="h1"
              color="white"
              mt={-6}
              mb={1}
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              Material Kit 2 React{" "}
              <Badge
                badgeContent="pro"
                size="lg"
                variant="contained"
                color="white"
                container
                sx={{ mt: -4 }}
              />
            </Typography>
            <Typography variant="body1" color="white" textAlign="center" px={6} mt={1}>
              Start the Development with a ReactJS & MUI Design System inspired by Material Design.
            </Typography>
          </Grid>
        </Container>
      </Box>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <Counters />
        <Information />
        <DesignBlocks />
        <AuthPages />
        <Pages />
        <Container sx={{ mt: 6 }}>
          <BuiltByDevelopers />
        </Container>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={4}>
              <FilledInfoCard
                variant="gradient"
                color="info"
                icon="flag"
                title="Getting Started"
                description="Check the possible ways of working with our product and the necessary files for building your own project."
                action={{
                  type: "external",
                  route: "https://www.creative-tim.com/learning-lab/react/overview/material-kit/",
                  label: "Let's start",
                }}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <FilledInfoCard
                color="info"
                icon="precision_manufacturing"
                title="Plugins"
                description="Get inspiration and have an overview about the plugins that we used to create the Material Kit."
                action={{
                  type: "external",
                  route: "https://www.creative-tim.com/learning-lab/react/datepicker/material-kit/",
                  label: "Read more",
                }}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <FilledInfoCard
                color="info"
                icon="apps"
                title="Components"
                description="Material Kit is giving you a lot of pre-made components, that will help you to build UI's faster."
                action={{
                  type: "external",
                  route: "https://www.creative-tim.com/learning-lab/react/alerts/material-kit/",
                  label: "Read more",
                }}
              />
            </Grid>
          </Grid>
        </Container>
        <Testimonials />
        <Pricing />
        <Box pt={18} pb={6}>
          <Container>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={5} ml="auto" sx={{ textAlign: { xs: "center", lg: "left" } }}>
                <Typography variant="h4" fontWeight="bold" mb={0.5}>
                  Thank you for your support!
                </Typography>
                <Typography variant="body1" color="text">
                  We deliver the best web products
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                lg={5}
                my={{ xs: 5, lg: "auto" }}
                mr={{ xs: 0, lg: "auto" }}
                sx={{ textAlign: { xs: "center", lg: "right" } }}
              >
                <SocialButton
                  component="a"
                  href="https://twitter.com/intent/tweet?text=Check%20Material%20Design%20System%20made%20by%20%40CreativeTim%20%23webdesign%20%23designsystem%20%23bootstrap5&amp;url=https%3A%2F%2Fwww.creative-tim.com%2Fproduct%2Fmaterial-design-system-pro"
                  target="_blank"
                  color="twitter"
                  sx={{ mr: 1 }}
                >
                  <i className="fab fa-twitter" />
                  &nbsp;Tweet
                </SocialButton>
                <SocialButton
                  component="a"
                  href="https://www.facebook.com/sharer/sharer.php?u=https://www.creative-tim.com/product/material-design-system-pro"
                  target="_blank"
                  color="facebook"
                  sx={{ mr: 1 }}
                >
                  <i className="fab fa-facebook" />
                  &nbsp;Share
                </SocialButton>
                <SocialButton
                  component="a"
                  href="https://www.pinterest.com/pin/create/button/?url=https://www.creative-tim.com/product/material-design-system-pro"
                  target="_blank"
                  color="pinterest"
                >
                  <i className="fab fa-pinterest" />
                  &nbsp;Pin it
                </SocialButton>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Card>
      <Box pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </Box>
    </>
  );
}

export default Presentation;
