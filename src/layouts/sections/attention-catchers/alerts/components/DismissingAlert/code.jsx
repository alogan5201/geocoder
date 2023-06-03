const dismissingAlertCode = `// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Alert from "components/Alert";

function DismissingAlert() {
  return (
    <Box component="section" py={6}>
      <Container>
        <Grid container item xs={12} lg={10} mx="auto">
          <Grid item xs={12}>
            <Alert color="warning" dismissible>
              <strong>Holy molly!</strong>&nbsp; You should check in on some of those fields below.
            </Alert>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default DismissingAlert;`;

export default dismissingAlertCode;
