const slidersCode = `// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";

// Material Kit 2 PRO React components
import Box from "components/Box";

function Sliders() {
  return (
    <Box component="section" bgColor="white" py={12}>
      <Container>
        <Grid container item xs={12} lg={6} justifyContent="center" mx="auto">
          <Stack spacing={2} width="100%">
            <Slider defaultValue={50} />
            <Slider defaultValue={[25, 75]} />
          </Stack>
        </Grid>
      </Container>
    </Box>
  );
}

export default Sliders;`;

export default slidersCode;
