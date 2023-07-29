const socialButtonsCode = `// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";


import Box from "components/Box";
import SocialButton from "components/SocialButton";

function SocialButtons() {
  return (
    <Box component="section" py={12}>
      <Container>
        <Grid container justifyContent="center">
          <Box display="flex" flexWrap="wrap" justifyContent="center" gap={1}>
            <SocialButton color="facebook">
              <Box component="i" color="inherit" mr={0.5} className="fab fa-facebook" />
              facebook
            </SocialButton>
            <SocialButton color="twitter">
              <Box component="i" color="inherit" mr={0.5} className="fab fa-twitter" />
              twitter
            </SocialButton>
            <SocialButton color="instagram">
              <Box component="i" color="inherit" mr={0.5} className="fab fa-instagram" />
              instagram
            </SocialButton>
            <SocialButton color="github">
              <Box component="i" color="inherit" mr={0.5} className="fab fa-github" />
              github
            </SocialButton>
            <SocialButton color="pinterest">
              <Box component="i" color="inherit" mr={0.5} className="fab fa-pinterest" />
              pinterest
            </SocialButton>
            <SocialButton color="youtube">
              <Box component="i" color="inherit" mr={0.5} className="fab fa-youtube" />
              youtube
            </SocialButton>
            <SocialButton color="vimeo">
              <Box component="i" color="inherit" mr={0.5} className="fab fa-vimeo" />
              vimeo
            </SocialButton>
            <SocialButton color="slack">
              <Box component="i" color="inherit" mr={0.5} className="fab fa-slack" />
              slack
            </SocialButton>
            <SocialButton color="dribbble">
              <Box component="i" color="inherit" mr={0.5} className="fab fa-dribbble" />
              dribbble
            </SocialButton>
            <SocialButton color="reddit">
              <Box component="i" color="inherit" mr={0.5} className="fab fa-reddit" />
              reddit
            </SocialButton>
            <SocialButton color="tumblr">
              <Box component="i" color="inherit" mr={0.5} className="fab fa-tumblr" />
              tumblr
            </SocialButton>
            <SocialButton color="linkedin">
              <Box component="i" color="inherit" mr={0.5} className="fab fa-linkedin" />
              linkedin
            </SocialButton>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}

export default SocialButtons;`;

export default socialButtonsCode;
