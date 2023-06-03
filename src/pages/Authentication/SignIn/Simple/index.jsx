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

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Typography from "components/Typography";
import Input from "components/Input";
import Button from "components/Button";

// Authentication layout components
import SimpleLayout from "pages/Authentication/components/SimpleLayout";
import Separator from "pages/Authentication/components/Separator";
import Socials from "pages/Authentication/components/Socials";

function SignInSimple() {
  const [rememberMe, setRememberMe] = useState(true);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <SimpleLayout>
      <Card>
        <Box
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          pt={2.5}
          pb={2.875}
          px={2.5}
          textAlign="center"
          lineHeight={1}
        >
          <Typography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </Typography>
          <Typography variant="button" color="white">
            Welcome back
          </Typography>
        </Box>
        <Box p={3}>
          <Box component="form" role="form">
            <Box mb={2}>
              <Input type="email" label="Email" fullWidth />
            </Box>
            <Box mb={2}>
              <Input type="password" label="Password" fullWidth />
            </Box>
            <Box display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <Typography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </Typography>
            </Box>
            <Box mt={2} mb={1}>
              <Button variant="gradient" color="info" fullWidth>
                sign in
              </Button>
            </Box>
            <Separator />
            <Socials />
            <Box mt={3} textAlign="center">
              <Typography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <Typography
                  component={Link}
                  to="/authentication/sign-up/cover"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    </SimpleLayout>
  );
}

export default SignInSimple;
