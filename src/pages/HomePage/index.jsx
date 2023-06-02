
// Material Kit 2 PRO React components
import MKBox from "components/MKBox";

// Material Kit 2 PRO React components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
import MapExternal from "components/Maps/MapExternal";
import { useRef } from "react";
import { extractWords } from "util/helpers";
import { useGlobalGeoData, useGlobalValue } from "util/mapState";
// Material Kit 2 PRO React components

// Material Kit 2 PRO React examples
import DefaultFooter from "examples/Footers/DefaultFooter";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
// Coworking page sections

// Routes
import Form from "components/Form";
import footerRoutes from "footer.routes";
import routes from "routes";
import FormChildren from "./components/FormChildren";
// Images


function HomePage() {
  const actionProps = {
    type: "internal",
    route: "/pages/landing-pages/coworking",
    color: "dark",
    label: "find more",
  };
  return (
    <>
      <DefaultNavbar
        routes={routes}
        action={{
          type: "external",
          route: "https://www.creative-tim.com/product/material-kit-pro-react",
          label: "buy now",
          color: "info",
        }}
        sticky
      />
      <MKBox
        py={8}
        width="100%"
        sx={{
          display: "grid",
          placeItems: "center",
        }}
      ></MKBox>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <Form
          name="Address to Latitude & Longitude"
          description="To pinpoint a location, you can type in the name of a place, city, state, or address, or click the location on the map to get the coordinates."
          children={<FormChildren/>}
        />
      </Card>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default HomePage;
