const buttonsContainedCode = `// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Button from "components/Button";

function ButtonsContained() {
  return (
    <Box component="section" py={12}>
      <Container>
        <Grid container justifyContent="center">
          <Stack direction="row" alignItems="flex-end" spacing={1}>
            <Button color="primary">primary</Button>
            <Button color="secondary">secondary</Button>
            <Button color="info">info</Button>
            <Button color="success">success</Button>
            <Button color="warning">warning</Button>
            <Button color="error">error</Button>
            <Button color="light">light</Button>
            <Button color="dark">dark</Button>
            <Button color="white">White</Button>
          </Stack>
        </Grid>
      </Container>
    </Box>
  );
}

export default ButtonsContained;`;

export default buttonsContainedCode;
