import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, orderBy, query, startAfter,limit } from "firebase/firestore";
import Box from "components/Box";
import DefaultFooter from "examples/Footers/DefaultFooter";
import BaseLayout from "layouts/sections/components/BaseLayout";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import DefaultBlogCard from "examples/Cards/BlogCards/DefaultBlogCard";
import footerRoutes from "footer.routes";
import Stack from "@mui/material/Stack";
import Button from "components/Button";
import Pagination from "@mui/material/Pagination";
import Typography from "components/Typography";
import {db} from "util/firebase";
const ITEMS_PER_PAGE = 15;

function MoviesPage() {
    const { slug } = useParams();

    const [movies, setMovies] = useState([]);
    const [lastDoc, setLastDoc] = useState(null);
  useEffect(() => {
    const fetchMovies = async () => {
      let movieQuery = query(collection(db, "films"), orderBy("title"), limit(ITEMS_PER_PAGE));
      if (lastDoc) {
        console.log(lastDoc)
 /*        movieQuery = query(
          collection(db, "films"),
          orderBy("title"),
          startAfter(lastDoc),
          limit(ITEMS_PER_PAGE)
        ); */
      }
    const movieSnapshot = await getDocs(movieQuery);
    const movieData = movieSnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
setMovies(movieData)
console.log(movieData)
      //const lastVisible = movieSnapshot.docs[movieSnapshot.docs.length - 1];
      //setLastDoc(lastVisible);
      //setMovies(movieSnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    };

    fetchMovies();
  }, []);
  return (
    <>
      <BaseLayout>
        <Box component="section" py={{ xs: 2, sm: 6 }} position="relative">
          <Box
            display="flex"
            alignItems="center"
            sx={{ px: { xs: 0, md: 3 }, py: { xs: 2, md: 5 } }}
          >
            <Container>
              <Grid
                container
                item
                xs={12}
                md={7}
                lg={6}
                flexDirection="column"
                justifyContent="center"
              >
                <Typography
                  variant="h4"
                  mb={3}
                  sx={({ breakpoints, typography: { size } }) => ({
                    [breakpoints.down("md")]: {
                      fontSize: size["3xl"],
                    },
                  })}
                >
                  Movies Locations
                </Typography>
                <Typography variant="body2" opacity={0.8} pr={6} mr={6}>
                  Movie locations with a map, and a list of their latitude and logitude coordinates
                </Typography>
                <Stack direction="row" spacing={1} mt={3}>
                  <Button type="button" variant="gradient" color="info">
                    Import JSON
                  </Button>
                  <Button>Get Started</Button>
                  <Button variant="text">Read more</Button>
                </Stack>
              </Grid>
            </Container>
          </Box>
        </Box>
        <Grid container justifyContent="center" spacing={6}>
 {/*          {movies.map(({ id, data }) => (
            <Grid key={id} item sx={{ px: { xs: 0, md: 7 } }}>
              <Link to={`/movies/${data.slug}`}>
                <DefaultBlogCard
                  maxWidth={500}
                  maxHeight={400}
                  image={data.image}
                  title={data.title}
                  action={{ type: "internal", route: `/movies/${data.slug}` }}
                />
              </Link>
            </Grid>
          ))} */}
          {/*           {movies.map((item, index) => {
            const key = Object.keys(item)[0];
            const { title, image } = item[key];
            return (
              <Grid key={key} item sx={{ px: { xs: 0, md: 7 } }}>
                <DefaultBlogCard
                  maxWidth={500}
                  maxHeight={400}
                  image={image}
                  title={title}
                  action={{
                    type: "internal",
                    route: "/pages/blogs/single-article",
                  }}
                />
              </Grid>
            );
          })} */}
        </Grid>
        <Box pt={6} px={1} mt={6}>
          <Grid container justifyContent="center">
            <Pagination count={10} shape="rounded" />
          </Grid>
        </Box>
        <Box pt={6} px={1} mt={6}>
          <DefaultFooter content={footerRoutes} />
        </Box>
      </BaseLayout>
    </>
  );
}
export default MoviesPage;
