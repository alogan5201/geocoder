import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { httpsCallable, getFunctions} from 'firebase/functions';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';
import Box from 'components/Box';
import Button from 'components/Button';
import Loading from 'components/Loading';
import MapExternal from 'components/Maps/MapExternal';
import Typography from 'components/Typography';
import BaseLayout from 'layouts/sections/components/BaseLayout';
import LocationsTable from './components/LocationsTable';

function MovieDetailPage() {
  const [showMore, setShowMore] = useState(false);
  const { slug } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMovie = async () => {
      const functions = getFunctions()
      const getMoviesWithSlug = httpsCallable(functions, 'getMoviesWithSlug');
      try {
        console.log("🚀 ~ fetchMovie ~ slug:", slug)
        const result = await getMoviesWithSlug({ slug });
        const movies = result.data;
        if (movies.length === 0) {
          navigate('/404');
        } else {
          setMovie(movies[0]);
        }
      } catch (error) {
        console.error('Error calling getMoviesWithSlug function', error);
        navigate('/404');
      }
    };
    fetchMovie();
  }, [slug]);

  const handleShowMore = (e) => {
    e.preventDefault();
    setShowMore(!showMore);
  };
  if (!movie) return <Loading />;

  return (
    // Render movie details
    <BaseLayout>
      <Box component="section" py={{ xs: 2, sm: 6 }} sx={{ maxWidth: '100%' }}>
        <Box px={{ xs: 0, sm: 3 }} py={{ xs: 2, sm: 3 }}>
          <Grid container spacing={2} px={{ xs: 0, sm: 5 }}>
            <Grid item xs={12} xl={7} ml="auto">
              <Box px={{ xs: 0, sm: 5 }}>
                <Box px={{ xs: 0, sm: 3 }} py={{ xs: 2, sm: 3 }}>
                  <Typography variant="h4" mb={1}>
                    {movie.title}
                  </Typography>
                </Box>
                <Box px={{ xs: 0, sm: 3 }} py={{ xs: 2, sm: 1 }}>
                  {/* ============ Content ============ */}
                  <Typography variant="body2" color="dark" fontWeight="light" mb={2}>
                    {movie.plot.length > 751 && !showMore ? movie.plot.substring(0, 750) + '...' : movie.plot}
                  </Typography>
                  {/* ============ Submit ============ */}
                  <Grid item xs={12} pr={1} mb={2}>
                    <Button type="button" variant="text" color="info" onClick={handleShowMore}>
                      <AddIcon />
                      &nbsp; Show More
                    </Button>
                  </Grid>
                  {/* ============ AddressInput ============ */}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} xl={5} position="relative">
              <Box
                component="img"
                src={movie.image}
                alt="image"
                maxWidth="18.75rem"
                width="100%"
                borderRadius="lg"
                shadow="xl"
                display={{ xs: 'none', lg: 'block' }}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <Box px={{ xs: 0, sm: 5 }}>
            <Box px={{ xs: 0, sm: 5 }} py={{ xs: 2, sm: 3 }}>
              <div className="map-container">
                <MapExternal />
              </div>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} lg={12}>
          <Box px={{ xs: 0, sm: 5 }}>
            <Box px={{ xs: 0, sm: 5 }} py={{ xs: 2, sm: 3 }}>
            <LocationsTable locations={movie.locations} />
              
             </Box>
            {/* <LocationsTable data={movie.locations} /> */}
          </Box>
        </Grid>
      </Grid>
    </BaseLayout>
  );
}

export default MovieDetailPage;
