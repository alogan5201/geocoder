const buttonsOutlinedCode = `// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";


import Box from "components/Box";
import Button from "components/Button";

function ButtonsOutlined() {
  return (
    <Box component="section" py={12}>
      <Container>
        <Grid container justifyContent="center">
          <Stack direction="row" alignItems="flex-end" spacing={1}>
            <Button variant="outlined" color="primary">
              primary
            </Button>
            <Button variant="outlined" color="secondary">
              secondary
            </Button>
            <Button variant="outlined" color="info">
              info
            </Button>
            <Button variant="outlined" color="success">
              success
            </Button>
            <Button variant="outlined" color="warning">
              warning
            </Button>
            <Button variant="outlined" color="error">
              error
            </Button>
            <Button variant="outlined" color="light">
              light
            </Button>
            <Button variant="outlined" color="dark">
              dark
            </Button>
            <Button variant="outlined" color="white">
              White
            </Button>
          </Stack>
        </Grid>
      </Container>
    </Box>
  );
}

export default ButtonsOutlined;`;

export default buttonsOutlinedCode;
