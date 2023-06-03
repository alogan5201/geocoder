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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Typography from "components/Typography";

function ExampleCard({ image, name, count, ...rest }) {
  return (
    <Box>
      <Box
        bgColor="white"
        borderRadius="xl"
        shadow="lg"
        minHeight="10rem"
        sx={{
          overflow: "hidden",
          transform: "perspective(999px) rotateX(0deg) translate3d(0, 0, 0)",
          transformOrigin: "50% 0",
          backfaceVisibility: "hidden",
          willChange: "transform, box-shadow",
          transition: "transform 200ms ease-out",

          "&:hover": {
            transform: "perspective(999px) rotateX(7deg) translate3d(0px, -4px, 5px)",
          },
        }}
        {...rest}
      >
        <Box component="img" src={image} alt={name} width="100%" my="auto" />
      </Box>
      {name || count > 0 ? (
        <Box mt={1} ml={1} lineHeight={1}>
          {name && (
            <Typography variant="h6" fontWeight="bold">
              {name}
            </Typography>
          )}
          {count > 0 && (
            <Typography variant="button" fontWeight="regular" color="secondary">
              {count} {count === 1 ? "Example" : "Examples"}
            </Typography>
          )}
        </Box>
      ) : null}
    </Box>
  );
}

// Setting default props for the ExampleCard
ExampleCard.defaultProps = {
  name: "",
  count: 0,
};

// Typechecking props for the ExampleCard
ExampleCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string,
  count: PropTypes.number,
};

export default ExampleCard;
