const inputDisabledCode = `// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";


import Box from "components/Box";
import Input from "components/Input";

function InputDisabled() {
  return (
    <Box component="section" py={12}>
      <Container>
        <Grid container item xs={12} lg={4} py={1} mx="auto">
          <Input label="Disabled" fullWidth disabled />
        </Grid>
      </Container>
    </Box>
  );
}

export default InputDisabled;`;

export default inputDisabledCode;
