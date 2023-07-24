import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Box from 'components/Box';
import Loading from 'components/Loading';
import MovieCard from 'components/MovieCard';
import Typography from 'components/Typography';
import { collection, getDocs, query, where } from 'firebase/firestore';
import BaseLayout from 'layouts/sections/components/BaseLayout';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useStore from 'store/mapStore';
import { db } from 'util/firebase';
import { generateRanges, getMovieListLength, isInPaginationPosition }from 'util/helpers';
import BlogCard from 'components/BlogCard';
import LazyImage from './LazyImage';
import BlogPostFour from './BlogPostFour';
import { Link } from 'react-router-dom';

const ITEMS_PER_PAGE = 15;

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
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const { imagesLoaded, setImagesLoaded } = useStore((state) => ({
    imagesLoaded: state.imagesLoaded,
    setImagesLoaded: state.setImagesLoaded,
  }));
  const handlePagination = (e, page) => {
    navigate(`/movies/${page}`);
    setLoading(true);
  };
  useEffect(() => {
    if (imagesLoaded > movies.length - 2) {
      setAllImagesLoaded(true);
    } else {
      setAllImagesLoaded(false);
    }
  }, [imagesLoaded, movies]);

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
    const fetchMovie = async () => {
      const moviesCollection = collection(db, 'films');
      const q = query(moviesCollection, where('slug', '==', slug));
      const querySnapshot = await getDocs(q);

      // As 'slug' is unique, there should be at most one match
      querySnapshot.forEach((doc) => {
        setMovies(doc.data());
      });
    };
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

            setLoading(false);
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
  if (loading) {
    return <Loading />;
  } else {
    return (
      <>
        <BaseLayout>
          <Box component="section" py={6} sx={{ px: { xs: 0, lg: 20 } }}>
            <Container>
              <Grid container item xs={12} lg={6} flexDirection="column">
                <Typography variant="h3" mt={3} mb={1}>
                  Movies Locations
                </Typography>
                <Typography variant="body2" color="text" mb={2}>
                  Discover where you're favorite flicks were filmed and bookmark them for your next trip!
                </Typography>
              </Grid>
              <Grid container spacing={5} mt={3}>
                {movies.map((data) => (
                  <Grid key={data.id} item xs={12} lg={4}>
                    <Link to={`/location/${data.slug}`}>
                      <img src={data.image} alt={`${data.title} movie poster`} width={'100%'} height={'100%'}></img>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>
        </BaseLayout>
      </>
    );
  }
}
export default MoviesPage;
