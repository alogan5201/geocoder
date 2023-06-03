const toggleCode = `import { useState } from "react";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Typography from "components/Typography";

function Toggle() {
  const [checked, setChecked] = useState(false);

  const toggleSwitch = () => setChecked(!checked);

  return (
    <Box component="section" py={8}>
      <Container>
        <Grid container item xs={4} justifyContent="center" mx="auto">
          <Box display="flex" alignItems="center">
            <Switch checked={checked} onChange={toggleSwitch} />
            <Typography
              variant="button"
              color="text"
              fontWeight="regular"
              ml={1}
              sx={{ cursor: "pointer", userSelect: "none" }}
              onClick={toggleSwitch}
            >
              Remember me
            </Typography>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}

export default Toggle;`;

export default toggleCode;
