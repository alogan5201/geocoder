import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
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
import { db } from "util/firebase";
import {
  isFirstItemOf15Subset,
  getMovieListLength,
  isInPaginationPosition,
  generateRanges,
} from "util/helpers";
import Loading from "components/Loading";
const ITEMS_PER_PAGE = 15;
function getRangeForNumber(n, num) {
  const ranges = generateRanges(n);
  return ranges.find((range) => num >= range[0] && num <= range[1]);
}
function getRangeForPage(n, pageIndex) {
  const ranges = generateRanges(n);
  return ranges[pageIndex - 1];
}
function MoviesPage() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [movies, setMovies] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pagIndex, setPagIndex] = useState(null);
  const [paginationLength, setPaginationLength] = useState(null);
  const handlePagination = (e, page) => {
    navigate(`/movies/${page}`);
    setLoading(true);
  };
  async function fetchMoviesInRange(start, end) {
    // Define the range of indexes

    // Create a query against the collection
    const moviesCollection = collection(db, "films");
    const q = query(moviesCollection, where("index", ">=", start), where("index", "<=", end));

    const querySnapshot = await getDocs(q);
    const movies = querySnapshot.docs.map((doc) => doc.data());

    return movies;
  }
  useEffect(() => {
    const fetchMovie = async () => {
      const moviesCollection = collection(db, "films");
      const q = query(moviesCollection, where("slug", "==", slug));
      const querySnapshot = await getDocs(q);

      // As 'slug' is unique, there should be at most one match
      querySnapshot.forEach((doc) => {
        setMovies(doc.data());
      });
    };
    const fetchMovies = async () => {
      if (!slug) {
        navigate("/movies/1");
      } else if (isNaN(Number(slug))) {
        navigate("/404");
      } else {
        const movieLength = await getMovieListLength();
        // const movies = await fetchMoviesInRange(Number(slug));
        const inRange = isInPaginationPosition(movieLength, Number(slug));

        if (inRange) {
          const rangeForNum = getRangeForPage(Number(movieLength), Number(slug));
          //

          const moviesInRange = await fetchMoviesInRange(rangeForNum[0], rangeForNum[1]);
          if (moviesInRange) {
            setPagIndex(Number(slug));
            setPaginationLength(generateRanges(movieLength).length);
            setMovies(moviesInRange);
            setLoading(false);
          } else {
            navigate("/404");
          }
        } else {
          navigate("/404");
        }
      }
    };
    fetchMovies();
  }, [navigate, slug]);
  if (loading) {
    return <Loading />;
  } else {
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
                    Movie locations with a map, and a list of their latitude and logitude
                    coordinates
                  </Typography>
            
                </Grid>
              </Container>
            </Box>
          </Box>
          <Grid container justifyContent="center" spacing={6}>
            {movies.map((data) => (
              <Grid key={data.id} item sx={{ px: { xs: 0, md: 7 } }}>
                <DefaultBlogCard
                  maxWidth={500}
                  maxHeight={400}
                  image={data.image}
                  title={data.title}
                  action={{ type: "internal", route: `/location/${data.slug}` }}
                />
              </Grid>
            ))}
          </Grid>
          <Box pt={6} px={1} mt={6}>
            <Grid container justifyContent="center">
              {paginationLength && pagIndex && (
                <Pagination
                  page={pagIndex}
                  count={paginationLength}
                  shape="rounded"
                  onChange={handlePagination}
                />
              )}
            </Grid>
          </Box>
  
        </BaseLayout>
      </>
    );
  }
}
export default MoviesPage;
