import Loading from "components/Loading";
import { collection, getDocs, query, where } from "firebase/firestore";
import BaseLayout from "layouts/sections/components/BaseLayout";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "util/firebase";
// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Button from "components/Button";

// import Stack from "@mui/material/Stack";
// Material Kit 2 PRO React components
import ColoredBackgroundCard from "examples/Cards/BackgroundCards/ColoredBackgroundCard";
import InfoBackgroundCard from "examples/Cards/BackgroundCards/InfoBackgroundCard";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Typography from "components/Typography";
function MovieDetailPage() {
  const { slug } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const color = "light"
  useEffect(() => {
    const fetchMovie = async () => {
      const moviesCollection = collection(db, "films");
      const q = query(moviesCollection, where("slug", "==", slug));
      const querySnapshot = await getDocs(q);
      
      // As 'slug' is unique, there should be at most one match
      querySnapshot.forEach((doc) => {
        if(!doc.exists()) {
          navigate("/404");
        }
        setMovie(doc.data());
      });
    };

    fetchMovie();
  }, [slug]);

  if (!movie) return <Loading/>;

  return (
    // Render movie details
    <BaseLayout>
      <Box component="section" py={{ xs: 2, sm: 6 }}>
        <Container>
          <Grid container item xs={12} lg={6} flexDirection="column" justifyContent="start" mb={2}>
            <Box sx={{ px: { xs: 0, md: 0 }, py: { xs: 2, md: 5 } }} textAlign="left">
              <Typography
                variant="h4"
                mb={3}
                sx={({ breakpoints, typography: { size } }) => ({
                  [breakpoints.down("md")]: {
                    fontSize: size["3xl"],
                  },
                })}
              >
                {movie.title}
              </Typography>
            </Box>
          </Grid>
          <Grid container spacing={3} mb={6}>
            <Grid container spacing={3} item xs={12} md={6} lg={8}>
              <Grid item xs={12} md={12}>
                <Typography
                  variant="body2"
                  color="dark"
                  fontWeight="light"
                  mb={2}
           
                >
                  {movie.plot}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Card
                sx={({
                  palette: { gradients },
                  functions: { rgba, linearGradient },
                  borders: { borderRadius },
                }) => ({
                  backgroundImage: `url(${movie.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: borderRadius.xl,
                  height: "100%",
                  display: "grid",
                  placeItems: "center",
                })}
              ></Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </BaseLayout>
  );
}

export default MovieDetailPage;
