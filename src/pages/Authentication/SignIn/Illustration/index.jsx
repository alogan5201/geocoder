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
import Switch from "@mui/material/Switch";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Typography from "components/Typography";
import Input from "components/Input";
import Button from "components/Button";

// Authentication layout components
import IllustrationLayout from "pages/Authentication/components/IllustrationLayout";

// Image
import bgImage from "assets/images/illustrations/illustration-reset.jpg";

function Illustration() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <IllustrationLayout
      title="Sign In"
      description="Enter your email and password to sign in"
      illustration={bgImage}
    >
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
        <Box mt={4} mb={1}>
          <Button variant="gradient" color="info" size="large" fullWidth>
            sign in
          </Button>
        </Box>
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
    </IllustrationLayout>
  );
}

export default Illustration;
