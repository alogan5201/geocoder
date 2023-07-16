// Loading Kit 2 PRO React components
import Box from "components/Box";
// Material Kit 2 PRO React components
// Material Kit 2 PRO React components
// Material Kit 2 PRO React examples
// Coworking page sections
import BaseLayout from "layouts/sections/components/BaseLayout";
// Routes
import Grid from "@mui/material/Grid";
import Spinner from "components/Spinner";
import { formStyles } from "src/styles";
import CircularProgress from "@mui/material/CircularProgress";

function Loading() {
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
        <Box component="section" py={{ xs: 2, sm: 6 }}>
          <Grid container item px={0}>
            <Box width="100%" bgColor="white" mb={6} sx={{ overflow: "hidden" }}>
              <Grid container spacing={0}>
                <Box
                  px={{ xs: 1, sm: 3 }}
                  py={{ xs: 0, sm: 6 }}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    minHeight: "80vh",
                  }}
                >
                  <CircularProgress color="secondary" />
                </Box>
              </Grid>
            </Box>
          </Grid>
        </Box>
      </BaseLayout>
    </>
  );
}
export default Loading;
