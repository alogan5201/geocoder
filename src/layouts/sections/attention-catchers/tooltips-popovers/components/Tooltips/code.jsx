const tooltipsCode = `// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Button from "components/Button";

function Tooltips() {
  return (
    <Box component="section" py={12}>
      <Container>
        <Grid container justifyContent="center">
          <Stack direction="row" spacing={1}>
            <Tooltip title="Tooltip on top" placement="top">
              <Button variant="gradient" color="info">
                tooltip on top
              </Button>
            </Tooltip>
            <Tooltip title="Tooltip on right" placement="right">
              <Button variant="gradient" color="info">
                tooltip on right
              </Button>
            </Tooltip>
            <Tooltip title="Tooltip on bottom" placement="bottom">
              <Button variant="gradient" color="info">
                tooltip on bottom
              </Button>
            </Tooltip>
            <Tooltip title="Tooltip on left" placement="left">
              <Button variant="gradient" color="info">
                tooltip on left
              </Button>
            </Tooltip>
          </Stack>
        </Grid>
      </Container>
    </Box>
  );
}

export default Tooltips;`;

export default tooltipsCode;
