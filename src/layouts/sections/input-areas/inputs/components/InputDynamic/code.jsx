const inputDynamicCode = `// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Input from "components/Input";

function InputDynamic() {
  return (
    <Box component="section" py={12}>
      <Container>
        <Grid container item xs={12} lg={4} py={1} mx="auto">
          <Input variant="standard" label="Regular" fullWidth />
        </Grid>
      </Container>
    </Box>
  );
}

export default InputDynamic;`;

export default inputDynamicCode;
