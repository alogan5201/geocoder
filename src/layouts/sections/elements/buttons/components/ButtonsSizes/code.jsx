const buttonsSizesCode = `// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";


import Box from "components/Box";
import Button from "components/Button";

function ButtonsSizes() {
  return (
    <Box component="section" py={12}>
      <Container>
        <Grid container justifyContent="center">
          <Stack direction="row" alignItems="center" spacing={1}>
            <Button color="info" size="small">
              small
            </Button>
            <Button color="info">default</Button>
            <Button color="info" size="large">
              large
            </Button>
          </Stack>
        </Grid>
      </Container>
    </Box>
  );
}

export default ButtonsSizes;`;

export default buttonsSizesCode;
