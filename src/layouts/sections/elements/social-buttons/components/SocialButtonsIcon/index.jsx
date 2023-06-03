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

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 PRO React components
import Box from "components/Box";
import SocialButton from "components/SocialButton";

function SocialButtonsIcon() {
  return (
    <Box component="section" py={12}>
      <Container>
        <Grid container justifyContent="center">
          <Box display="flex" flexWrap="wrap" justifyContent="center" gap={1}>
            <SocialButton color="facebook" iconOnly>
              <Box component="i" color="inherit" className="fab fa-facebook" />
            </SocialButton>
            <SocialButton color="twitter" iconOnly>
              <Box component="i" color="inherit" className="fab fa-twitter" />
            </SocialButton>
            <SocialButton color="instagram" iconOnly>
              <Box component="i" color="inherit" className="fab fa-instagram" />
            </SocialButton>
            <SocialButton color="github" iconOnly>
              <Box component="i" color="inherit" className="fab fa-github" />
            </SocialButton>
            <SocialButton color="pinterest" iconOnly>
              <Box component="i" color="inherit" className="fab fa-pinterest" />
            </SocialButton>
            <SocialButton color="youtube" iconOnly>
              <Box component="i" color="inherit" className="fab fa-youtube" />
            </SocialButton>
            <SocialButton color="vimeo" iconOnly>
              <Box component="i" color="inherit" className="fab fa-vimeo" />
            </SocialButton>
            <SocialButton color="slack" iconOnly>
              <Box component="i" color="inherit" className="fab fa-slack" />
            </SocialButton>
            <SocialButton color="dribbble" iconOnly>
              <Box component="i" color="inherit" className="fab fa-dribbble" />
            </SocialButton>
            <SocialButton color="reddit" iconOnly>
              <Box component="i" color="inherit" className="fab fa-reddit" />
            </SocialButton>
            <SocialButton color="tumblr" iconOnly>
              <Box component="i" color="inherit" className="fab fa-tumblr" />
            </SocialButton>
            <SocialButton color="linkedin" iconOnly>
              <Box component="i" color="inherit" className="fab fa-linkedin" />
            </SocialButton>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}

export default SocialButtonsIcon;
