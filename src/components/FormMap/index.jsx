import { useState } from "react";
// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
// Maps
import Stack from "@mui/material/Stack";
import { extractWords } from "util/helpers";
import { useGlobalValue } from "util/mapState";

// Material Kit 2 PRO React components
import MKTypography from "components/MKTypography";

// Material Kit 2 PRO React components

// Material Kit 2 PRO React components

// Material Kit 2 PRO React examples
import SimpleInfoCard from "examples/Cards/InfoCards/SimpleInfoCard";
function FormMap({name, description}) {
  const [formName, setFormName] = useState("")
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
    <>
      <MKBox component="section" py={3}>
        <Container>
          <Grid
            container
            item
            flexDirection="column"
            alignItems="center"
            xs={12}
            lg={6}
            sx={{ textAlign: "center", mx: "auto" }}
          >
       
            <MKTypography variant="h2" mb={1}>
              Explore our places in London{" "}
            </MKTypography>
            <MKTypography variant="body2" color="text">
              If you can&apos;t decide, the answer is no. If two equally difficult paths, choose the
              one more painful in the short term (pain avoidance is creating an illusion of
              equality).
            </MKTypography>
          </Grid>
      
        </Container>
      </MKBox>
      <MKBox component="section" py={{ xs: 6, md: 12 }}>
        <Container>
          <Grid container item xs={12} justifyContent="center">
            <Grid
              item
              xs={12}
              md={4}
              sx={{ ml: { xs: 0, md: "auto" }, mr: { xs: 0, md: 6 }, mb: { xs: 4, md: 0 } }}
            >
              <Stack spacing={{ xs: 4, md: 8 }}>
                <SimpleInfoCard
                  icon="payment"
                  title="Modular Components"
                  description="The Arctic Ocean freezes every winter and much of the sea-ice then thaws every summer, and that process will continue whatever."
                />
                <SimpleInfoCard
                  icon="insights"
                  title="Great Features"
                  description="People are so scared to lose that they don't even try. Like, one thing people can't say is that I'm not trying, and I'm not trying my hardest."
                />
              </Stack>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              sx={{ mr: { xs: 0, md: "auto" }, ml: { xs: 0, md: 6 }, mb: { xs: 4, md: 0 } }}
            >
              <Stack spacing={{ xs: 4, md: 8 }}>
                <SimpleInfoCard
                  icon="access_alarms"
                  title="Awesome Support"
                  description="The time is now for it to be okay to be great. People in this world shun people for being great. For being a bright color. What else could rust?"
                />
                <SimpleInfoCard
                  icon="sentiment_satisfied"
                  title="Modern Interface"
                  description="If everything I did failed - which it doesn't, it actually succeeds - just the fact that I'm willing to fail is an inspiration."
                />
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </MKBox>
    </>
  );
}
FormMap.defaultProps = {
  name: "Geocoder",
};
export default FormMap;
