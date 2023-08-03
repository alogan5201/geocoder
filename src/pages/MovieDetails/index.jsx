import { useEffect, useState, lazy } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "util/firebase";
const AddIcon = lazy(() => import('@mui/icons-material/Add'));
const Grid = lazy(() => import('@mui/material/Grid'));
const Box = lazy(() => import('components/Box'));
const Button = lazy(() => import('components/Button'));
const Loading = lazy(() => import('components/Loading'));
const MapExternal = lazy(() => import('components/Maps/MapExternal'));
const Typography = lazy(() => import('components/Typography'));
const BaseLayout = lazy(() => import('layouts/sections/components/BaseLayout'));
const LocationsTable = lazy(() => import('./components/LocationsTable'));
function MovieDetailPage() {
  const [showMore, setShowMore] = useState(false);
  const { slug } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMovie = async () => {
      const moviesCollection = collection(db, "films");
      const q = query(moviesCollection, where("slug", "==", slug));
      const querySnapshot = await getDocs(q);

      // As 'slug' is unique, there should be at most one match
      querySnapshot.forEach((doc) => {
        if (!doc.exists()) {
          navigate("/404");
        }

        setMovie(doc.data());
      });
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
