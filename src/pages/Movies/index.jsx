import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { generateRanges, getMovieListLength, isInPaginationPosition } from 'util/helpers';
import { httpsCallable, getFunctions } from 'firebase/functions';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Skeleton from '@mui/material/Skeleton';
import Box from 'components/Box';
import BaseLayout from 'layouts/sections/components/BaseLayout';
import Loading from 'components/Loading';
import Typography from 'components/Typography';
import LazyLoad from 'react-lazyload';

function getRangeForPage(n, pageIndex) {
  const ranges = generateRanges(n);
  return ranges[pageIndex - 1];
}
function MoviesPage() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imagesLoading, setImagesLoading] = useState(true);
  const [pagIndex, setPagIndex] = useState(null);
  const [paginationLength, setPaginationLength] = useState(null);
  const [allImagesLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const functions = getFunctions();
  const fetchMoviesInRange = httpsCallable(functions, 'fetchMoviesInRange');

  const handlePagination = (e, page) => {
    navigate(`/movies/${page}`);
    setImagesLoaded(0)
    if (!loading) {
      setLoading(true);
    }
  };

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [loading]);
  useEffect(() => {
    console.log('🚀 ~ MoviesPage ~ imagesLoaded:', imagesLoaded);
  }, [imagesLoaded]);
  async function getMoviesInRange(start, end) {
    try {
      const result = await fetchMoviesInRange({ start: start, end: end });

      // Read result of the Cloud Function.
      const movies = result.data;
      return movies;
    } catch (error) {
      // Getting the Error details.
    }
  }
  useEffect(() => {
    const fetchMovies = async () => {
      if (!slug) {
        navigate('/movies/1');
      } else if (isNaN(Number(slug))) {
        navigate('/404');
      } else {
        const movieLength = await getMovieListLength();
        // const movies = await fetchMoviesInRange(Number(slug));
        const inRange = isInPaginationPosition(movieLength, Number(slug));

        if (inRange) {
          const rangeForNum = getRangeForPage(Number(movieLength), Number(slug));
          //

          const moviesInRange = await getMoviesInRange(rangeForNum[0], rangeForNum[1]);
          if (moviesInRange) {
            setPagIndex(Number(slug));
            setPaginationLength(generateRanges(movieLength).length);
            setMovies(moviesInRange);
          } else {
            navigate('/404');
          }
        } else {
          navigate('/404');
        }
      }
    };
    fetchMovies();
  }, [navigate, slug]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <BaseLayout>
          <Box component="section" py={6} sx={{ px: { xs: 0, lg: 20 } }}>
            <Container>
              <Grid container item xs={12} lg={6} flexDirection="column">
                <Typography variant="h3" mt={3} mb={1}>
                  Movies Locations
                </Typography>
                <Typography variant="body2" color="text" mb={2}>
                  Discover where you&apos;re favorite flicks were filmed and bookmark them for your next trip!
                </Typography>
              </Grid>

              <Grid container spacing={5} mt={3}>
                {movies.map((data, index) => (
                  <Grid key={data.id} item xs={12} lg={4}>
                    <Link to={`/location/${data.slug}`}>
                      <div style={{ paddingTop: '150%', position: 'relative' }}>
                        {index < 6 ? (
                          <>
                            {imagesLoaded <= index ? (
                              <Skeleton
                                animation="wave"
                                variant="rectangular"
                                sx={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  width: '100%',
                                  height: '100%',
                                  borderRadius: '8px',
                                }}
                              />
                            ) : null}
                            <img
                              src={data.image}
                              alt={`${data.title} movie poster`}
                              onLoad={handleImageLoad}
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                              }}
                            />
                          </>
                        ) : (
                          <LazyLoad
                            height={200}
                            offset={100}
                            placeholder={
                              <Skeleton
                                animation="wave"
                                variant="rectangular"
                                sx={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  width: '100%',
                                  height: '100%',
                                  borderRadius: '8px',
                                }}
                              />
                            }
                          >
                            <img
                              src={data.image}
                              alt={`${data.title} movie poster`}
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                              }}
                            />
                          </LazyLoad>
                        )}
                      </div>
                      {/* Caption Underneath Image */}
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="caption" align="center">
                          {data.title}
                        </Typography>
                      </Box>
                    </Link>
                  </Grid>
                ))}
              </Grid>
              <Box pt={6} px={1} mt={6}>
                <Grid container justifyContent="center">
                  {paginationLength && pagIndex && (
                    <Pagination page={pagIndex} count={paginationLength} shape="rounded" onChange={handlePagination} />
                  )}
                </Grid>
              </Box>
            </Container>
          </Box>
        </BaseLayout>
      )}
    </>
  );
}
export default MoviesPage;
