const typographyCode = `// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";


import Box from "components/Box";
import Typography from "components/Typography";

function Typography() {
  return (
    <Box component="section" py={8}>
      <Container>
        <Typography variant="h2" mb={6}>
          Typography - Font Family Roboto
        </Typography>
        <Grid container alignItems="center" py={2}>
          <Grid item xs={12} sm={3}>
            <Typography variant="button" color="text" fontWeight="bold" textTransform="uppercase">
              Heading 1
            </Typography>
          </Grid>

          <Grid item xs={12} sm={9}>
            <Typography variant="h1">H1 Material Kit</Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="center" py={2}>
          <Grid item xs={12} sm={3}>
            <Typography variant="button" color="text" fontWeight="bold" textTransform="uppercase">
              Heading 2
            </Typography>
          </Grid>

          <Grid item xs={12} sm={9}>
            <Typography variant="h2">H2 Material Kit</Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="center" py={2}>
          <Grid item xs={12} sm={3}>
            <Typography variant="button" color="text" fontWeight="bold" textTransform="uppercase">
              Heading 3
            </Typography>
          </Grid>

          <Grid item xs={12} sm={9}>
            <Typography variant="h3">H3 Material Kit</Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="center" py={2}>
          <Grid item xs={12} sm={3}>
            <Typography variant="button" color="text" fontWeight="bold" textTransform="uppercase">
              Heading 4
            </Typography>
          </Grid>

          <Grid item xs={12} sm={9}>
            <Typography variant="h4">H4 Material Kit</Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="center" py={2}>
          <Grid item xs={12} sm={3}>
            <Typography variant="button" color="text" fontWeight="bold" textTransform="uppercase">
              Heading 5
            </Typography>
          </Grid>

          <Grid item xs={12} sm={9}>
            <Typography variant="h5">H5 Material Kit</Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="center" py={2}>
          <Grid item xs={12} sm={3}>
            <Typography variant="button" color="text" fontWeight="bold" textTransform="uppercase">
              Heading 6
            </Typography>
          </Grid>

          <Grid item xs={12} sm={9}>
            <Typography variant="h6">H6 Material Kit</Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="center" py={2}>
          <Grid item xs={12} sm={3}>
            <Typography variant="button" color="text" fontWeight="bold" textTransform="uppercase">
              Lead Text
            </Typography>
          </Grid>

          <Grid item xs={12} sm={9}>
            <Typography variant="body1" color="text">
              I will be the leader of a company that ends up being worth billions of dollars,
              because I got the answers. I understand culture. I am the nucleus. I think that&apos;s
              a responsibility that I have, to push possibilities, to show people, this is the level
              that things could be at.
            </Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="center" py={2}>
          <Grid item xs={12} sm={3}>
            <Typography variant="button" color="text" fontWeight="bold" textTransform="uppercase">
              Paragraph
            </Typography>
          </Grid>

          <Grid item xs={12} sm={9}>
            <Typography variant="body2" color="text">
              I will be the leader of a company that ends up being worth billions of dollars,
              because I got the answers. I understand culture. I am the nucleus. I think that&apos;s
              a responsibility that I have, to push possibilities, to show people, this is the level
              that things could be at.
            </Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="center" py={2}>
          <Grid item xs={12} sm={3}>
            <Typography variant="button" color="text" fontWeight="bold" textTransform="uppercase">
              Small
            </Typography>
          </Grid>

          <Grid item xs={12} sm={9} lineHeight={1}>
            <Typography variant="button" color="text">
              I will be the leader of a company that ends up being worth billions of dollars,
              because I got the answers. I understand culture. I am the nucleus. I think that&apos;s
              a responsibility that I have, to push possibilities, to show people, this is the level
              that things could be at.
            </Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="center" py={2}>
          <Grid item xs={12} sm={3}>
            <Typography variant="button" color="text" fontWeight="bold" textTransform="uppercase">
              Tiny
            </Typography>
          </Grid>

          <Grid item xs={12} sm={9} lineHeight={1}>
            <Typography variant="caption" color="text">
              I will be the leader of a company that ends up being worth billions of dollars,
              because I got the answers. I understand culture. I am the nucleus. I think that&apos;s
              a responsibility that I have, to push possibilities, to show people, this is the level
              that things could be at.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Typography;`;

export default typographyCode;
