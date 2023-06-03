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

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Typography from "components/Typography";
import Input from "components/Input";
import Button from "components/Button";

// Authentication layout components
import CoverLayout from "pages/Authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

function Cover() {
  return (
    <CoverLayout image={bgImage}>
      <Card>
        <Box
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <Typography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </Typography>
          <Typography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </Typography>
        </Box>
        <Box p={3}>
          <Box component="form" role="form">
            <Box mb={2}>
              <Input type="text" label="Name" fullWidth />
            </Box>
            <Box mb={2}>
              <Input type="email" label="Email" fullWidth />
            </Box>
            <Box mb={2}>
              <Input type="password" label="Password" fullWidth />
            </Box>
            <Box display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <Typography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </Typography>
              <Typography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </Typography>
            </Box>
            <Box mt={3} mb={1}>
              <Button variant="gradient" color="info" fullWidth>
                sign in
              </Button>
            </Box>
            <Box mt={3} mb={1} textAlign="center">
              <Typography variant="button" color="text">
                Already have an account?{" "}
                <Typography
                  component={Link}
                  to="/authentication/sign-in/cover"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
