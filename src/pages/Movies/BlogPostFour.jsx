// react-router-dom components
import { Link } from 'react-router-dom';

// @mui material components
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

// Otis Kit PRO components
import Box from 'components/Box';
import Typography from 'components/Typography';

// Otis Kit PRO examples
import BackgroundCard from 'components/BackgroundCard';

// Images
const post1 =
  'https://firebasestorage.googleapis.com/v0/b/geotools-bc75a.appspot.com/o/images%2Fmovie-images%2Feverything_everywhere_all_at_once.jpg?alt=media&token=e39e5693-ba7f-4a0e-93ef-3dbdcd4a521e';
const post2 =
  'https://firebasestorage.googleapis.com/v0/b/geotools-bc75a.appspot.com/o/images%2Fmovie-images%2Fthe_seventh_seal.jpg?alt=media&token=4a25aae0-167e-4ea0-a0f8-9d6281bb300b';
const post3 =
  'https://firebasestorage.googleapis.com/v0/b/geotools-bc75a.appspot.com/o/images%2Fmovie-images%2Fthe_seventh_seal.jpg?alt=media&token=4a25aae0-167e-4ea0-a0f8-9d6281bb300b';
function BlogPostFour() {
  return (
    <Box component="section" py={6}>
      <Container>
        <Grid container item xs={12} lg={6} flexDirection="column">
          <Typography variant="h3" mt={3} mb={1}>
            Movies Locations
          </Typography>
          <Typography variant="body2" color="text" mb={2}>
              Discover where you&apos;re favorite flicks were filmed and bookmark them for your next trip!

          </Typography>
        </Grid>
        <Grid container spacing={3} mt={3}>
          <Grid item xs={12} lg={4}>
            <Link to="/sections/page-sections/blog-posts">
          <img src={post1} alt="img" width={"100%"} height={"100%"}></img>
            </Link>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Link to="/sections/page-sections/blog-posts">
              <BackgroundCard
                image={post2}
                title="Last visits in US"
                description="Wealth creation is an evolutionarily recent positive-sum game. Status is an old
                    zero-sum game. Those attacking wealth creation are often just seeking status."
              />
            </Link>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Link to="/sections/page-sections/blog-posts">
              <BackgroundCard
                image={post3}
                title="Grow in a beautiful area"
                description="Free people make free choices. Free choices mean you get unequal outcomes. You
                    can have freedom, or you can have equal outcomes. You can't have both."
              />
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default BlogPostFour;
