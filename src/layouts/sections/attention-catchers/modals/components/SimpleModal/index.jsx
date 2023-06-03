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

import { useState } from "react";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Slide from "@mui/material/Slide";

// @mui icons
import CloseIcon from "@mui/icons-material/Close";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Button from "components/Button";
import Typography from "components/Typography";

function SimpleModal() {
  const [show, setShow] = useState(false);
  const toggleModal = () => setShow(!show);

  return (
    <Box component="section" py={6}>
      <Container>
        <Grid container item xs={12} lg={10} justifyContent="center" mx="auto">
          <Button variant="gradient" color="info" onClick={toggleModal}>
            Launch Demo Modal
          </Button>
        </Grid>
        <Modal open={show} onClose={toggleModal} sx={{ display: "grid", placeItems: "center" }}>
          <Slide direction="down" in={show} timeout={500}>
            <Box
              position="relative"
              width="500px"
              display="flex"
              flexDirection="column"
              borderRadius="xl"
              bgColor="white"
              shadow="xl"
            >
              <Box display="flex" alginItems="center" justifyContent="space-between" p={2}>
                <Typography variant="h5">Your modal title</Typography>
                <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={toggleModal} />
              </Box>
              <Divider sx={{ my: 0 }} />
              <Box p={2}>
                <Typography variant="body2" color="secondary" fontWeight="regular">
                  Society has put up so many boundaries, so many limitations on what&apos;s right
                  and wrong that it&apos;s almost impossible to get a pure thought out.
                  <br />
                  <br />
                  It&apos;s like a little kid, a little boy, looking at colors, and no one told him
                  what colors are good, before somebody tells you you shouldn&apos;t like pink
                  because that&apos;s for girls, or you&apos;d instantly become a gay two-year-old.
                </Typography>
              </Box>
              <Divider sx={{ my: 0 }} />
              <Box display="flex" justifyContent="space-between" p={1.5}>
                <Button variant="gradient" color="dark" onClick={toggleModal}>
                  close
                </Button>
                <Button variant="gradient" color="info">
                  save changes
                </Button>
              </Box>
            </Box>
          </Slide>
        </Modal>
      </Container>
    </Box>
  );
}

export default SimpleModal;
