import { useState } from "react";
// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
import MKTypography from "components/MKTypography";
// Maps
import { useGlobalValue } from "util/mapState";
import { extractWords } from "util/helpers";
import MapExternal from "components/Maps/MapExternal";

function FormAddressToLatLng() {
  const [coords, setValue] = useGlobalValue();
  async function handleSubmit(e) {
    e.preventDefault();
 
    const inputOne = e.target[0].value;
    const inputTwo = e.target[1].value;
    const inputThree = e.target[2].value;
  if(inputThree){
    let extracted = extractWords(inputThree);
    console.log(extracted)
  let withPlus = extracted.join("+");
  console.log(withPlus)
       const response = await fetch(
         `https://nominatim.openstreetmap.org/?addressdetails=1&q=${withPlus}&format=json&limit=1`
       );
       const data = await response.json();
       if(data && data.length > 0){
            let lat = data[0].lat;
            let lng = data[0].lon;
            const coords = { lat: lat, lng: lng };
            setValue([coords]);
       }
  }
    else if(inputOne && inputThree){
        const coords = { lat: inputOne, lng: inputTwo };
        setValue([coords]);

    }
  }
  return (
    <MKBox component="section" py={{ xs: 0, lg: 6 }}>
      <Container>
        <Grid container item px={6}>
          <MKBox
            width="100%"
            bgColor="white"
            borderRadius="xl"
            shadow="xl"
            mb={6}
            sx={{ overflow: "hidden" }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} lg={5}>
                <MKBox component="form" p={2} method="post" onSubmit={handleSubmit}>
                  <MKBox px={3} py={{ xs: 2, sm: 6 }}>
                    <MKTypography variant="h2" mb={1}>
                      Geocoder
                    </MKTypography>
                    <MKTypography variant="body1" color="text" mb={2}>
                    foo bar
                    </MKTypography>
                  </MKBox>
                  <MKBox pt={0.5} pb={3} px={3}>
                    <Grid container>
                      <Grid item xs={12} pr={1} mb={3}>
                        <MKInput
                          variant="standard"
                          label="Latitude"
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} pr={1} mb={3}>
                        <MKInput
                          variant="standard"
                          label="Longitude"
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} pr={1} mb={3}>
                        <MKInput
                          variant="standard"
                          label="Address"
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      item
                      xs={12}
                      md={6}
                      justifyContent="flex-end"
                      textAlign="right"
                      ml="auto"
                    >
                      <MKButton variant="gradient" color="info" type="submit">
                        Submit
                      </MKButton>
                    </Grid>
                    <Grid
                      container
                      item
                      xs={12}
                      md={6}
                      justifyContent="flex-end"
                      textAlign="right"
                      ml="auto"
                    ></Grid>
                  </MKBox>
                </MKBox>
              </Grid>
              <Grid item xs={12} lg={7} position="relative" px={0}>
                <MapExternal coords={coords} />
              </Grid>
            </Grid>
          </MKBox>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default FormAddressToLatLng;
