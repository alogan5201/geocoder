const alertWithContentCode = `// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Alert from "components/Alert";
import Typography from "components/Typography";

function AlertWithContent() {
  return (
    <Box component="section" py={6}>
      <Container>
        <Grid container item xs={12} lg={10} mx="auto">
          <Grid item xs={12}>
            <Alert color="success">
              <Box>
                <Typography variant="h4" color="white" mb={1}>
                  Good job!
                </Typography>
                <Typography variant="body2" color="white">
                  That&apos;s the main thing people are controlled by! Thoughts- their perception of
                  themselves! They&apos;re slowed down by their perception of themselves. If
                  you&apos;re taught you can&apos;t do anything, you won&apos;t do anything. I was
                  taught I could do everything.
                </Typography>
                <Divider light />
                <Typography variant="body2" color="white">
                  What else could rust the heart more over time? Blackgold.
                </Typography>
              </Box>
            </Alert>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default AlertWithContent;`;

export default alertWithContentCode;
