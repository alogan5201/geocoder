const buttonsIconRightCode = `// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Icon from "@mui/material/Icon";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Button from "components/Button";

function ButtonsIconRight() {
  return (
    <Box component="section" py={12}>
      <Container>
        <Grid container justifyContent="center">
          <Stack direction="row" alignItems="center" spacing={1}>
            <Button color="info" size="small">
              small
              <Icon sx={{ ml: 1 }}>favorite</Icon>
            </Button>
            <Button color="info">
              default
              <Icon sx={{ ml: 1 }}>favorite</Icon>
            </Button>
            <Button color="info" size="large">
              large
              <Icon sx={{ ml: 1 }}>favorite</Icon>
            </Button>
          </Stack>
        </Grid>
      </Container>
    </Box>
  );
}

export default ButtonsIconRight;`;

export default buttonsIconRightCode;
