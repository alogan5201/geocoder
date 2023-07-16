
import Box from "components/Box";

import Grid from "@mui/material/Grid";
import BaseLayout from "layouts/sections/components/BaseLayout";
import { PuffLoader } from "react-spinners";
function Loading() {
  return (
    <>
      <BaseLayout>
        <Box component="section" py={{ xs: 2, sm: 6 }}>
          <Grid container item px={0}>
            <Box width="100%" bgColor="white" mb={6} sx={{ overflow: 'hidden' }}>
              <Grid container spacing={0}>
                <Box
                  px={{ xs: 1, sm: 3 }}
                  py={{ xs: 0, sm: 6 }}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    minHeight: '70vh',
                  }}
                >
                  <PuffLoader color="#1A73E8" />
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
