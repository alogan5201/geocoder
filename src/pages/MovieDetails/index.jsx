import AddIcon from "@mui/icons-material/Add";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "components/Button";
import Loading from "components/Loading";
import MapExternal from "components/Maps/MapExternal";
import { collection, getDocs, query, where } from "firebase/firestore";
import BaseLayout from "layouts/sections/components/BaseLayout";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "util/firebase";

import Box from "components/Box";
import Typography from "components/Typography";
import LocationsTable from "./components/LocationsTable";
function MovieDetailPage() {
  const [showMore, setShowMore] = useState(false);
  const { slug } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const color = "light";
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
      <Box component="section" py={{ xs: 2, sm: 6, height: "550px" }}>
        <Grid container item px={0} justifyContent="center" mx={"auto"}>
          <Box
            width="100%"
            bgColor="white"
            borderRadius="xl"
            shadow="xl"
            mb={6}
            sx={{ overflow: "hidden" }}
          >
            <Grid container spacing={3} mb={6}>
              {/*================= LEFT COLUMN  =================*/}
              <Grid item xs={12} lg={7}>
                <Box p={2}>
                  <Box px={{ xs: 0, sm: 3 }} py={{ xs: 2, sm: 3 }}>
                    <Typography variant="h4" mb={1}>
                      {movie.title}
                    </Typography>
                  </Box>
                  <Box px={{ xs: 0, sm: 3 }} py={{ xs: 2, sm: 1 }}>
                    <Grid container>
                      {/* ============ Content ============ */}
                      <Typography variant="body2" color="dark" fontWeight="light" mb={2}>
                        {movie.plot.length > 751 && !showMore
                          ? movie.plot.substring(0, 750) + "..."
                          : movie.plot}
                      </Typography>
                      {/* ============ Submit ============ */}
                      <Grid item xs={12} pr={1} mb={2}>
                        <Button type="button" variant="text" color="info" onClick={handleShowMore}>
                          <AddIcon />
                          &nbsp; Show More
                        </Button>
                      </Grid>
                      {/* ============ AddressInput ============ */}
                    </Grid>
                  </Box>
                </Box>
              </Grid>
              {/*================= RIGHT COLUMN - MAP ================= */}
              <Grid
                item
                xs={12}
                md={6}
                lg={4}
                sx={{ border: "none", boxShadow: "none", height: "550px" }}
              >
                <Card
                  sx={{
                    backgroundImage: `url(${movie.image})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    border: "none",
                    boxShadow: "none",
                    borderRadius: "none",
                    height: "100%",
                    display: "grid",
                    placeItems: "center",
                  }}
                ></Card>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Box>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12} position="relative" px={0}>
          <Box px={{ xs: 1, sm: 3 }} py={{ xs: 0, sm: 6 }} sx={{ height: 600 }} id="map-external">
            <MapExternal />
          </Box>
        </Grid>
        <Grid item xs={12} lg={12} position="relative" px={0}>
          <Box px={{ xs: 1, sm: 3 }} py={{ xs: 0, sm: 6 }}>
            {/* <LocationsTable data={movie.locations} /> */}
            <LocationsTable locations={movie.locations} />
          </Box>
        </Grid>
      </Grid>


    </BaseLayout>
  );
}

export default MovieDetailPage;
