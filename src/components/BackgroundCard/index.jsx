/**
=========================================================
* Material Kit 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Typography from "components/Typography";

function BackgroundCard({ image, title, description }) {
  return (
    <Card
      sx={({
        functions: { rgba, linearGradient },
        palette: { black },
        borders: { borderRadius },
      }) => ({
        backgroundImage: `${linearGradient(
          rgba(black.main, 0.5),
          rgba(black.main, 0.5)
        )}, url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: borderRadius.xl,
        height: "100%",
        display: "grid",
        justifyContent: "end",
      })}
    >
      <Box pt={32} pb={3} px={3}>
      
      </Box>
    </Card>
  );
}

// Typechecking props for the BackgroundCard
BackgroundCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.node.isRequired,
};

export default BackgroundCard;
