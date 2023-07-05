import { useState, useEffect } from "react";

// @mui material components
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";

// @mui icons
import CloseIcon from "@mui/icons-material/Close";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Button from "components/Button";

function NoLocationFound({ toggle }) {
  const [show, setShow] = useState(false);
  const toggleSnackbar = () => setShow(!show);

  const toastStyles = ({
    palette: { error },
    borders: { borderRadius },
    typography: { size },
    boxShadows: { lg },
  }) => ({
    "& .MuiPaper-root": {
      backgroundColor: error.main,
      borderRadius: borderRadius.lg,
      fontSize: size.sm,
      fontWeight: 400,
      boxShadow: lg,
      px: 2,
      py: 0.5,
    },
  });

  useEffect(() => {
    if (toggle) {
      toggleSnackbar();
    }
  }, [toggle]);

  const toastTemplate = (
    <Box display="flex" justifyContent="space-between" alignItems="center" color="white">
      Sorry, No Location was found.
    </Box>
  );

  const action = (
    <IconButton size="small" aria-label="close" color="inherit" onClick={toggleSnackbar}>
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <Box component="section" >
      <Container>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={show}
          autoHideDuration={3000}
          onClose={toggleSnackbar}
          message={toastTemplate}
          action={action} // Here we pass an element, not a function
          sx={toastStyles}
        />
      </Container>
    </Box>
  );
}

export default NoLocationFound;
