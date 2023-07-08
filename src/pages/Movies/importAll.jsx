import Box from "components/Box";
import { useState } from "react";
// Material Kit 2 PRO React components
// Material Kit 2 PRO React components
// Material Kit 2 PRO React examples
import DefaultFooter from "examples/Footers/DefaultFooter";
// Coworking page sections
import BaseLayout from "layouts/sections/components/BaseLayout";
// Routes
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import DefaultBlogCard from "examples/Cards/BlogCards/DefaultBlogCard";
import footerRoutes from "footer.routes";
import { formStyles } from "src/styles";
// Images
import Stack from "@mui/material/Stack";
import Button from "components/Button";

import Typography from "components/Typography";
import { moviesAndImages, allFilmData } from "./movies-and-images";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
function MoviesPage() {

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const [movies, setMovies] = useState(moviesAndImages.slice(0, 15));
    const post1 =
      "https://images.unsplash.com/photo-1592489637182-8c172d6d7826?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2300&q=80";
    const post2 =
      "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2300&q=80";
    const post3 =
      "https://images.unsplash.com/photo-1444877466744-dc2f2af2b931?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2300&q=80";
  const formWrapperStyles = formStyles.mapForm.formWrapper;
  const formWrapperProps = {
    styles: formWrapperStyles,
    name: "Address to Latitude & Longitude",
    description:
      "To pinpoint a location, you can type in the name of a place, city, state, or address, or click the location on the map to get the coordinates.",
    map: true,
  };

  // formStyles.formWrapper
  const actionProps = {
    type: "internal",
    route: "/pages/landing-pages/coworking",
    color: "dark",
    label: "find more",
  };
  const addFilmsToFirestore = async (films) => {
    for (let key in films) {
      const film = films[key];
      try {
        const docRef = await addDoc(collection(db, "films"), film);
//        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    
    }
      console.log("done")
  };
const handleImportClick = async(e) => {
  e.preventDefault()
  if(allFilmData && allFilmData.films){
    // Get the first 2 films using Object.entries and slicing the first 2 entries
    const lessMovies = Object.entries(allFilmData.films).slice(0, 2).reduce((obj, [key, val]) => {
      obj[key] = val;
      return obj;
    }, {});
    const allMovies = Object.entries(allFilmData.films).reduce((obj, [key, val]) => {
      obj[key] = val;
      return obj;
    }, {});

  await addFilmsToFirestore(allMovies);
  }
}
  return (
    <>
      <BaseLayout>
        <Box component="section" py={{ xs: 2, sm: 6 }} position="relative" >
          <Box display="flex" alignItems="center"  sx={{ px: { xs: 0, md: 3}, py:{xs:2, md:5}}}>
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
                  <Button type="button" variant="gradient" color="info" onClick={handleImportClick}>
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
       
            {movies.map((item, index) => {
              const key = Object.keys(item)[0];
              const { title, image } = item[key];
              return (
                <Grid key={key} item  sx={{ px: { xs: 0, md: 7}}}>
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
            })}
     
        </Grid>
        <Box pt={6} px={1} mt={6}>
          <DefaultFooter content={footerRoutes} />
        </Box>
      </BaseLayout>
    </>
  );
}
export default MoviesPage;
