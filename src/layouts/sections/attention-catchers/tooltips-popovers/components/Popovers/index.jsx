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
import Stack from "@mui/material/Stack";
import Popover from "@mui/material/Popover";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Button from "components/Button";
import Typography from "components/Typography";

function Popovers() {
  const [popover, setPopover] = useState(null);
  const [popoverOrigin, setPopoverOrigin] = useState({
    anchorOrigin: {
      vertical: "top",
      horizontal: "center",
    },
    transformOrigin: {
      vertical: "bottom",
      horizontal: "center",
    },
  });

  const togglePopover = ({ currentTarget }) => setPopover(currentTarget);
  const closePopover = () => setPopover(null);

  const popoverTemplate = (
    <Popover open={Boolean(popover)} anchorEl={popover} onClose={closePopover} {...popoverOrigin}>
      <Box bgColor="white" py={1.5} px={2} lineHeight={0.8}>
        <Typography variant="caption" color="text">
          That&apos;s the main thing people are controlled
          <br /> by! Thoughts- their perception of themselves!
        </Typography>
      </Box>
    </Popover>
  );

  return (
    <Box component="section" py={12}>
      <Container>
        <Grid container justifyContent="center">
          <Stack direction="row" spacing={1}>
            <Button
              variant="gradient"
              color="info"
              onClick={(event) => {
                togglePopover(event);
                setPopoverOrigin({
                  anchorOrigin: {
                    vertical: "top",
                    horizontal: "center",
                  },
                  transformOrigin: {
                    vertical: "bottom",
                    horizontal: "center",
                  },
                });
              }}
            >
              popover on top
            </Button>
            <Button
              variant="gradient"
              color="info"
              onClick={(event) => {
                togglePopover(event);
                setPopoverOrigin({
                  anchorOrigin: {
                    vertical: "center",
                    horizontal: "right",
                  },
                  transformOrigin: {
                    vertical: "center",
                    horizontal: "left",
                  },
                });
              }}
            >
              popover on right
            </Button>
            <Button
              variant="gradient"
              color="info"
              onClick={(event) => {
                togglePopover(event);
                setPopoverOrigin({
                  anchorOrigin: {
                    vertical: "center",
                    horizontal: "left",
                  },
                  transformOrigin: {
                    vertical: "center",
                    horizontal: "right",
                  },
                });
              }}
            >
              popover on left
            </Button>
            <Button
              variant="gradient"
              color="info"
              onClick={(event) => {
                togglePopover(event);
                setPopoverOrigin({
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "center",
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "center",
                  },
                });
              }}
            >
              popover on bottom
            </Button>
          </Stack>
        </Grid>
        {popoverTemplate}
      </Container>
    </Box>
  );
}

export default Popovers;
