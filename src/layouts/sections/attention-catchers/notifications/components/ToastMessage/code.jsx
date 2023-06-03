const toastMessageCode = `import { useState } from "react";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";

// @mui icons
import CloseIcon from "@mui/icons-material/Close";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Button from "components/Button";

function ToastMessage() {
  const [show, setShow] = useState(false);
  const toggleSnackbar = () => setShow(!show);

  const toastStyles = ({
    palette: { info },
    borders: { borderRadius },
    typography: { size },
    boxShadows: { lg },
  }) => ({
    "& .MuiPaper-root": {
      backgroundColor: info.main,
      borderRadius: borderRadius.lg,
      fontSize: size.sm,
      fontWeight: 400,
      boxShadow: lg,
      px: 2,
      py: 0.5,
    },
  });

  const toastTemplate = (
    <Box display="flex" justifyContent="space-between" alignItems="center" color="white">
      Hello, world! This is a notification message.
      <CloseIcon
        fontSize="medium"
        sx={{ ml: 4, mr: -1, cursor: "pointer" }}
        onClick={toggleSnackbar}
      />
    </Box>
  );

  return (
    <Box component="section" py={6}>
      <Container>
        <Grid container item xs={12} lg={10} justifyContent="center" mx="auto">
          <Button variant="gradient" color="info" onClick={toggleSnackbar}>
            Show Snackbar
          </Button>
        </Grid>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={show}
          autoHideDuration={3000}
          onClose={toggleSnackbar}
          message={toastTemplate}
          action={toggleSnackbar}
          sx={toastStyles}
        />
      </Container>
    </Box>
  );
}

export default ToastMessage;`;

export default toastMessageCode;
