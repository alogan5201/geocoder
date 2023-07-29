/*
=========================================================
* Material Kit 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

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
