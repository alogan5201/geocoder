import { useEffect, useState , lazy} from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { db } from 'util/firebase';
import { generateRanges, getMovieListLength, isInPaginationPosition } from 'util/helpers';
const Container = lazy(() => import('@mui/material/Container'));
const Grid = lazy(() => import('@mui/material/Grid'));
const Pagination = lazy(() => import('@mui/material/Pagination'));
const Skeleton = lazy(() => import('@mui/material/Skeleton'));
const Box = lazy(() => import('components/Box'));
const BaseLayout = lazy(() => import('layouts/sections/components/BaseLayout'));
const Loading = lazy(() => import('components/Loading'));
const Typography = lazy(() => import('components/Typography'));

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
  const [allImagesLoaded, ] = useState(false);
const [imagesLoaded, setImagesLoaded] = useState(0);

  const handlePagination = (e, page) => {
    navigate(`/movies/${page}`);
    setImagesLoading(true);
    setLoading(true)

  };
  useEffect(() => {
    if (imagesLoaded > 0 && movies.length > 0) {
      if (imagesLoaded === movies.length) {
        console.log("🚀 ~ useEffect ~ movies:", movies.length)
        setTimeout(() => {
          
          //setAllImagesLoaded(true);
        }, 2000);
        
      }
    } 
      return () => {
        setImagesLoaded((imagesLoaded) => (imagesLoaded = 0));
      };
  }, [imagesLoaded, movies]);


  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000);
     setTimeout(() => {
       setImagesLoading(false);
     }, 4000);
      return () => {
        setImagesLoaded((imagesLoaded) => (imagesLoaded = 0));
      };
  }, [loading, allImagesLoaded]);
  
  useEffect(() => {
    console.log("🚀 ~ MoviesPage ~ [loading, imagesLoaded,allImagesLoaded]:", [loading, imagesLoaded,allImagesLoaded,movies.length, imagesLoading])
  }, [loading, imagesLoaded,allImagesLoaded,movies.length, imagesLoading]);
  async function fetchMoviesInRange(start, end) {
    // Define the range of indexes

    // Create a query against the collection
    const moviesCollection = collection(db, 'films');
    const q = query(moviesCollection, where('index', '>=', start), where('index', '<=', end));

    const querySnapshot = await getDocs(q);
    const movies = querySnapshot.docs.map((doc) => doc.data());

    return movies;
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

          const moviesInRange = await fetchMoviesInRange(rangeForNum[0], rangeForNum[1]);
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
              {imagesLoading && (
                <Grid container spacing={5} mt={3}>
                  {Array.from({ length: 15 }).map((_, index) => (
                    <Grid key={index} item xs={12} lg={4}>
                      <div style={{ paddingTop: '150%', position: 'relative' }}>
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
                      </div>
                    </Grid>
                  ))}
                </Grid>
              )}

              <Grid
                container
                spacing={5}
                mt={3}
                sx={imagesLoading ? { visibility: 'hidden' } : { visibility: 'visible' }}
              >
                {movies.map((data) => (
                  <Grid key={data.id} item xs={12} lg={4}>
                    <Link to={`/location/${data.slug}`}>
                      <div style={{ paddingTop: '150%', position: 'relative' }}>
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
                          onLoad={() => setImagesLoaded((imagesLoaded) => imagesLoaded + 1)}
                        />
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
