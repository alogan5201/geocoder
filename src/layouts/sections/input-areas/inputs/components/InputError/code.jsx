const inputErrorCode = `// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";


import Box from "components/Box";
import Input from "components/Input";

function InputError() {
  return (
    <Box component="section" py={12}>
      <Container>
        <Grid container item xs={12} lg={4} py={1} mx="auto">
          <Input label="Error" fullWidth error />
        </Grid>
      </Container>
    </Box>
  );
}

export default InputError;`;

export default inputErrorCode;
