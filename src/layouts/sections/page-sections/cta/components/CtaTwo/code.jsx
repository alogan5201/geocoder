const ctaTwoCode = `// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Typography from "components/Typography";
import SocialButton from "components/SocialButton";

function CtaTwo() {
  return (
    <Box component="section" mt={6} py={{ xs: 0, lg: 6 }}>
      <Container>
        <Grid container alignItems="center">
          <Grid item xs={12} lg={6} mb={{ xs: 3, lg: 0 }}>
            <Typography variant="h4" mb={0.5}>
              Thank you for your support!
            </Typography>
            <Typography variant="body1" color="text">
              Delivering the best products
            </Typography>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={1.5}
              flexWrap="wrap"
              justifyContent={{ xs: "flex-start", lg: "flex-end" }}
            >
              <SocialButton color="twitter">
                <i className="fab fa-twitter" />
                &nbsp; twitter
              </SocialButton>
              <SocialButton color="facebook">
                <i className="fab fa-facebook" />
                &nbsp; facebook
              </SocialButton>
              <SocialButton color="tumblr">
                <i className="fab fa-tumblr" />
                &nbsp; tumblr
              </SocialButton>
              <SocialButton color="dribbble">
                <i className="fab fa-dribbble" />
                &nbsp; dribbble
              </SocialButton>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default CtaTwo;`;

export default ctaTwoCode;
