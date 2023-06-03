/*
=========================================================
* Material Kit 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
// import Stack from "@mui/material/Stack";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Typography from "components/Typography";

function Testimonials() {
  const image =
    "https://images.unsplash.com/photo-1521668576204-57ae3afee860?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80";

  return (
    <Box component="section" position="relative" py={6}>
      <Container sx={{ maxWidth: "100% !important" }}>
        <Grid container item xs={10} sx={{ mx: "auto" }}>
          <Box variant="gradient" bgColor="dark" borderRadius="lg" width="100%" py={6}>
            <Grid container>
              <Grid item xs={12} md={6} xl={4} sx={{ position: "relative", px: 6 }}>
                <Box
                  component="img"
                  src={image}
                  alt="image"
                  borderRadius="md"
                  maxWidth="300px"
                  width="100%"
                  position="relative"
                  mt={-12}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={5}
                xl={4}
                sx={{
                  position: "relative",
                  px: { xs: 6, md: 2 },
                  mt: { xs: 3, md: 0 },
                  my: { xs: 0, md: "auto" },
                  color: ({ palette: { white } }) => white.main,
                }}
              >
                <Icon fontSize="large">format_quote</Icon>
                <Typography
                  variant="body2"
                  color="white"
                  fontWeight="light"
                  mb={2}
                  sx={{ fontSize: "1.125rem" }}
                >
                  Decisions: If you can&apos;t decide, the answer is no. If two equally difficult
                  paths, choose the one more painful in the short term (pain avoidance is creating
                  an illusion of equality). Choose the path that leaves you more equanimous in the
                  long term.
                </Typography>
                <Typography variant="button" fontWeight="bold" color="white">
                  Michael -{" "}
                  <Typography variant="caption" color="white">
                    Writter
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={1} />
              <Grid
                item
                xs={12}
                xl={2}
                sx={{ px: { xs: 6, xl: 0 }, my: { xs: 0, xl: "auto" }, lineHeight: 1 }}
              >
                <Typography variant="h3" color="white" mt={{ xs: 6, xl: 0 }} mb={1}>
                  1,679,700 +
                </Typography>
                <Typography component="p" variant="button" color="white" opacity={0.8} mb={2}>
                  Developers and Companies around the world using our products.
                </Typography>
                <Typography
                  component="a"
                  href="#"
                  variant="button"
                  color="white"
                  fontWeight="regular"
                  sx={{
                    width: "max-content",
                    display: "flex",
                    alignItems: "center",

                    "& .material-icons-round": {
                      fontSize: "1.125rem",
                      transform: `translateX(3px)`,
                      transition: "transform 0.2s cubic-bezier(0.34, 1.61, 0.7, 1.3)",
                    },

                    "&:hover .material-icons-round, &:focus .material-icons-round": {
                      transform: `translateX(6px)`,
                    },
                  }}
                >
                  See all products
                  <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}

export default Testimonials;
