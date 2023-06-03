const logoAreaOneCode = `// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Typography from "components/Typography";

// Images
import coinbase from "assets/images/logos/gray-logos/logo-coinbase.svg";
import nasa from "assets/images/logos/gray-logos/logo-nasa.svg";
import netflix from "assets/images/logos/gray-logos/logo-netflix.svg";
import pinterest from "assets/images/logos/gray-logos/logo-pinterest.svg";
import spotify from "assets/images/logos/gray-logos/logo-spotify.svg";
import vodafone from "assets/images/logos/gray-logos/logo-vodafone.svg";

function LogoAreaOne() {
  return (
    <Box py={6}>
      <Container>
        <Grid
          container
          item
          justifyContent="center"
          xs={8}
          sx={{ mx: "auto", textAlign: "center" }}
        >
          <Typography variant="h6" opacity={0.5}>
            More than 50+ brands trust Material
          </Typography>
        </Grid>
        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={6} md={4} lg={2}>
            <Box component="img" src={coinbase} alt="coinbase" width="100%" opacity={0.9} />
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <Box component="img" src={nasa} alt="nasa" width="100%" opacity={0.9} />
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <Box component="img" src={netflix} alt="netflix" width="100%" opacity={0.9} />
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <Box component="img" src={pinterest} alt="pinterest" width="100%" opacity={0.9} />
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <Box component="img" src={spotify} alt="spotify" width="100%" opacity={0.9} />
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <Box component="img" src={vodafone} alt="vodafone" width="100%" opacity={0.9} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default LogoAreaOne;`;

export default logoAreaOneCode;
