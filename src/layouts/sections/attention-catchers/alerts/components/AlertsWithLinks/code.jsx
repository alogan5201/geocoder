const alertsWithLinksCode = `// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Alert from "components/Alert";
import Typography from "components/Typography";

function AlertsWithLinks() {
  return (
    <Box component="section" py={6}>
      <Container>
        <Grid container item xs={12} lg={10} mx="auto">
          <Grid item xs={12}>
            <Alert color="primary">
              A simple primary alert with an&nbsp;
              <Typography component="a" href="#" variant="body2" fontWeight="bold" color="white">
                example link
              </Typography>
              . Give it a click if you like.
            </Alert>
          </Grid>
          <Grid item xs={12}>
            <Alert color="secondary">
              A simple secondary alert with an&nbsp;
              <Typography component="a" href="#" variant="body2" fontWeight="bold" color="white">
                example link
              </Typography>
              . Give it a click if you like.
            </Alert>
          </Grid>
          <Grid item xs={12}>
            <Alert color="success">
              A simple success alert with an&nbsp;
              <Typography component="a" href="#" variant="body2" fontWeight="bold" color="white">
                example link
              </Typography>
              . Give it a click if you like.
            </Alert>
          </Grid>
          <Grid item xs={12}>
            <Alert color="error">
              A simple error alert with an&nbsp;
              <Typography component="a" href="#" variant="body2" fontWeight="bold" color="white">
                example link
              </Typography>
              . Give it a click if you like.
            </Alert>
          </Grid>
          <Grid item xs={12}>
            <Alert color="warning">
              A simple warning alert with an&nbsp;
              <Typography component="a" href="#" variant="body2" fontWeight="bold" color="white">
                example link
              </Typography>
              . Give it a click if you like.
            </Alert>
          </Grid>
          <Grid item xs={12}>
            <Alert color="info">
              A simple info alert with an&nbsp;
              <Typography component="a" href="#" variant="body2" fontWeight="bold" color="white">
                example link
              </Typography>
              . Give it a click if you like.
            </Alert>
          </Grid>
          <Grid item xs={12}>
            <Alert color="light">
              A simple light alert with an&nbsp;
              <Typography component="a" href="#" variant="body2" fontWeight="bold" color="dark">
                example link
              </Typography>
              . Give it a click if you like.
            </Alert>
          </Grid>
          <Grid item xs={12}>
            <Alert color="dark">
              A simple dark alert with an&nbsp;
              <Typography component="a" href="#" variant="body2" fontWeight="bold" color="white">
                example link
              </Typography>
              . Give it a click if you like.
            </Alert>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default AlertsWithLinks;`;

export default alertsWithLinksCode;
