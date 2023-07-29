const inputStaticCode = `// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";


import Box from "components/Box";
import Input from "components/Input";

function InputStatic() {
  return (
    <Box component="section" py={12}>
      <Container>
        <Grid container item xs={12} lg={4} py={1} mx="auto">
          <Input
            variant="standard"
            label="Full Name"
            placeholder="eg. Thomas Shelby"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>
      </Container>
    </Box>
  );
}

export default InputStatic;`;

export default inputStaticCode;
