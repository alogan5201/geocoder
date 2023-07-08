// Material Kit 2 PRO React components
import Box from "components/Box";
// Material Kit 2 PRO React components
// Material Kit 2 PRO React components
// Material Kit 2 PRO React examples
import DefaultFooter from "examples/Footers/DefaultFooter";
// Coworking page sections
import BaseLayout from "layouts/sections/components/BaseLayout";
// Routes
import FormWrapper from "components/FormWrapper";
import footerRoutes from "footer.routes";
import { formStyles } from "src/styles";
import Form from "./components/Form";
import DefaultBlogCard from "examples/Cards/BlogCards/DefaultBlogCard";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
// Images
import Stack from "@mui/material/Stack";
import Button from "components/Button";

import author1 from "assets/images/team-2.jpg";
import author2 from "assets/images/ivana-squares.jpg";
import author3 from "assets/images/marie.jpg";
import Typography from "components/Typography";

function MoviesPage() {
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
  return (
    <>
      <BaseLayout>
        <Box component="header" position="relative">
          <Box display="flex" alignItems="center" minHeight="40vh">
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
                  variant="h3"
                  mb={3}
                  sx={({ breakpoints, typography: { size } }) => ({
                    [breakpoints.down("md")]: {
                      fontSize: size["3xl"],
                    },
                  })}
                >
                  Movies Locations
                </Typography>
                <Typography variant="body1" opacity={0.8} pr={6} mr={6}>
                  Movie locations with a map, and a list of their latitude and logitude coordinates
                </Typography>
                <Stack direction="row" spacing={1} mt={3}>
                  <Button>Get Started</Button>
                  <Button variant="text">Read more</Button>
                </Stack>
              </Grid>
            </Container>
          </Box>
        </Box>
        <Box component="section" py={7}>
          <Container>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={4} mb={{ xs: 3, lg: 0 }}>
                <DefaultBlogCard
                  image={post1}
                  category={{ color: "primary", label: "house" }}
                  title="Shared Coworking"
                  description="Use border utilities to quickly style the border and border-radius of an element. Great for images, buttons."
                  author={{
                    image: author1,
                    name: "Mathew Glock",
                    date: "Posted on 28 February",
                  }}
                  action={{ type: "internal", route: "/pages/blogs/single-article" }}
                />
              </Grid>
              <Grid item xs={12} lg={4} mb={{ xs: 3, lg: 0 }}>
                <DefaultBlogCard
                  image={post2}
                  category={{ color: "info", label: "house" }}
                  title="Really Housekeeping"
                  description="Use border utilities to quickly style the border and border-radius of an element. Great for images, buttons."
                  author={{
                    image: author2,
                    name: "Mathew Glock",
                    date: "Posted on 28 February",
                  }}
                  action={{ type: "internal", route: "/pages/blogs/single-article" }}
                />
              </Grid>
              <Grid item xs={12} lg={4} mb={{ xs: 3, lg: 0 }}>
                <DefaultBlogCard
                  image={post3}
                  category={{ color: "warning", label: "house" }}
                  title="Shared Coworking"
                  description="Use border utilities to quickly style the border and border-radius of an element. Great for images, buttons."
                  author={{
                    image: author3,
                    name: "Mathew Glock",
                    date: "Posted on 28 February",
                  }}
                  action={{ type: "internal", route: "/pages/blogs/single-article" }}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Box pt={6} px={1} mt={6}>
          <DefaultFooter content={footerRoutes} />
        </Box>
      </BaseLayout>
    </>
  );
}
export default MoviesPage;
