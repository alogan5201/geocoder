/**
=========================================================
* Material Kit 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Input from "components/Input";
import Button from "components/Button";
import Typography from "components/Typography";

function FormSimple() {
  const [checked, setChecked] = useState(true);

  const handleChecked = () => setChecked(!checked);

  return (
    <Box component="section" py={12}>
      <Container>
        <Grid container item justifyContent="center" xs={10} lg={7} mx="auto" textAlign="center">
          <Typography variant="h3" mb={1}>
            Contact Us
          </Typography>
        </Grid>
        <Grid container item xs={12} lg={7} sx={{ mx: "auto" }}>
          <Box width="100%" component="form" method="post" autoComplete="off">
            <Box p={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Input variant="standard" label="First Name" fullWidth />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input variant="standard" label="Last Name" fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <Input variant="standard" type="email" label="Email Address" fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <Input variant="standard" label="Your Message" multiline fullWidth rows={6} />
                </Grid>
                <Grid item xs={12} alignItems="center" ml={-1}>
                  <Switch checked={checked} onChange={handleChecked} />
                  <Typography
                    variant="button"
                    fontWeight="regular"
                    color="text"
                    ml={-1}
                    sx={{ cursor: "pointer", userSelect: "none" }}
                    onClick={handleChecked}
                  >
                    &nbsp;&nbsp;I agree the&nbsp;
                  </Typography>
                  <Typography
                    component="a"
                    href="#"
                    variant="button"
                    fontWeight="regular"
                    color="dark"
                  >
                    Terms and Conditions
                  </Typography>
                </Grid>
              </Grid>
              <Grid container item justifyContent="center" xs={12} my={2}>
                <Button type="submit" variant="gradient" color="dark" fullWidth>
                  Send Message
                </Button>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}

export default FormSimple;
