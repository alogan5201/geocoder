const progressGradientCode = `// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";


import Box from "components/Box";
import Progress from "components/Progress";

function ProgressGradient() {
  return (
    <Box component="section" bgColor="white" py={12}>
      <Container>
        <Grid container item xs={12} lg={6} justifyContent="center" mx="auto">
          <Stack spacing={2} width="100%">
            <Progress variant="gradient" color="primary" value={50} />
            <Progress variant="gradient" color="secondary" value={50} />
            <Progress variant="gradient" color="success" value={50} />
            <Progress variant="gradient" color="info" value={50} />
            <Progress variant="gradient" color="warning" value={50} />
            <Progress variant="gradient" color="error" value={50} />
            <Progress variant="gradient" color="dark" value={50} />
          </Stack>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProgressGradient;`;

export default progressGradientCode;
