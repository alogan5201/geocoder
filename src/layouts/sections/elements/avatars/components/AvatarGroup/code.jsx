const avatarGroupCode = `// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MuiAvatarGroup from "@mui/material/AvatarGroup";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Avatar from "components/Avatar";

// Images
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

function AvatarGroup() {
  return (
    <Box component="section" py={12}>
      <Container>
        <Grid container justifyContent="center">
          <MuiAvatarGroup spacing={12}>
            <Avatar src={team1} alt="team 1" size="lg" />
            <Avatar src={team2} alt="team 2" size="lg" />
            <Avatar src={team3} alt="team 3" size="lg" />
            <Avatar src={team4} alt="team 4" size="lg" />
          </MuiAvatarGroup>
        </Grid>
      </Container>
    </Box>
  );
}

export default AvatarGroup;`;

export default avatarGroupCode;
