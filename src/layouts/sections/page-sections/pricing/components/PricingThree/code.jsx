const featuresThreeCode = `// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Button from "components/Button";
import Typography from "components/Typography";

function PricingThree() {
  return (
    <Box component="section" py={{ xs: 12, lg: 18 }}>
      <Container>
        <Grid
          container
          item
          xs={12}
          md={6}
          justifyContent="center"
          sx={{ mx: "auto", mb: 8, textAlign: "center" }}
        >
          <Typography variant="h2" mb={1}>
            Best no-tricks pricing
          </Typography>
          <Typography variant="body1" color="text">
            If you&apos;re not satisfied, contact us within the first 30 days and we&apos;ll send
            you a full refund.
          </Typography>
        </Grid>
        <Grid container item xs={12}>
          <Card sx={{ width: "100%" }}>
            <Grid container alignItems="center">
              <Grid item xs={12} lg={8}>
                <Box py={3} px={4}>
                  <Typography variant="h3" mb={1}>
                    Lifetime Membership
                  </Typography>
                  <Typography variant="body2" color="text" fontWeight="regular">
                    You have Free Unlimited Updates and Premium Support on each package. You also
                    have 30 days to request a refund.
                  </Typography>
                  <Grid container item xs={12} lg={3} sx={{ mt: 6, mb: 1 }}>
                    <Typography variant="h6">What&apos;s included</Typography>
                  </Grid>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Box display="flex" py={1} pr={1} lineHeight={0}>
                        <Typography variant="body1" color="dark">
                          <Icon sx={{ fontWeight: "bold" }}>done</Icon>
                        </Typography>
                        <Typography variant="body2" color="text" fontWeight="regular" pl={1}>
                          Private code access
                        </Typography>
                      </Box>
                      <Box display="flex" py={1} pr={1} lineHeight={0}>
                        <Typography variant="body1" color="dark">
                          <Icon sx={{ fontWeight: "bold" }}>done</Icon>
                        </Typography>
                        <Typography variant="body2" color="text" fontWeight="regular" pl={1}>
                          Free entry to all repositories
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box display="flex" py={1} pr={1} lineHeight={0}>
                        <Typography variant="body1" color="dark">
                          <Icon sx={{ fontWeight: "bold" }}>done</Icon>
                        </Typography>
                        <Typography variant="body2" color="text" fontWeight="regular" pl={1}>
                          Pro member accounts
                        </Typography>
                      </Box>
                      <Box display="flex" py={1} pr={1} lineHeight={0}>
                        <Typography variant="body1" color="dark">
                          <Icon sx={{ fontWeight: "bold" }}>done</Icon>
                        </Typography>
                        <Typography variant="body2" color="text" fontWeight="regular" pl={1}>
                          Support team full assist
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12} lg={4}>
                <Box p={3} textAlign="center">
                  <Typography variant="h6" mt={{ xs: 0, sm: 3 }}>
                    Pay once, own it forever
                  </Typography>
                  <Typography variant="h1">
                    <Box component="small">$</Box>399
                  </Typography>
                  <Button variant="gradient" color="error" size="large" sx={{ my: 2 }}>
                    Get Access
                  </Button>
                  <Typography display="block" variant="button" color="text" fontWeight="regular">
                    Get a free sample (20MB)
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Container>
    </Box>
  );
}

export default PricingThree;`;

export default featuresThreeCode;
