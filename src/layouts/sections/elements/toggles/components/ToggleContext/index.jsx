
import { useState } from 'react';

// @mui material components
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';

import Box from 'components/Box';
import Typography from 'components/Typography';

function ToggleContext() {
  const [checked, setChecked] = useState(false);

  const toggleSwitch = () => setChecked(!checked);

  return (
    <Box component="section" py={8}>
      <Container>
        <Grid container item xs={4} justifyContent="center" mx="auto">
          <Box display="flex" alignItems="center">
            <Switch checked={checked} onChange={toggleSwitch} />
            <Box ml={2} lineHeight={0.5}>
              <Typography display="block" variant="button" fontWeight="bold">
                Remember me
              </Typography>
              <Typography variant="caption" color="text" fontWeight="regular">
                Be sure that you will always be logged in.
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}

export default ToggleContext;
