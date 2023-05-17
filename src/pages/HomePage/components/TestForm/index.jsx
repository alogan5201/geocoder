import {useState} from 'react'
// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import { useMap } from 'react-leaflet/hooks'
import {createGlobalState} from 'react-use'
// Maps
const useGlobalValue = createGlobalState(() => [])



import MapLocation from "components/Maps/MapLocation";
function UpdateState() {
  const [count, setCount] = useState(0)
  const handleClick = () => setCount(count + 1)

  return (
    <div>
      Count = {count} 
      <div>
      <MKButton variant="gradient" color="info" onClick={handleClick}>
                        Count +
                      </MKButton>
      </div>
    </div>
  )
}
function TestForm() {
  const [coords, setValue] = useGlobalValue()
  function handleSubmit(e){
    e.preventDefault()
    const inputOne = e.target[0].value
    const inputTwo = e.target[1].value
    const coords = {lat:inputOne,lng:inputTwo}
    setValue([coords])
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
                      Say Hi!
                    </MKTypography>
                    <MKTypography variant="body1" color="text" mb={2}>
                      We&apos;d like to talk with you.
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
                    >
                  
                    </Grid>
                  </MKBox>
                </MKBox>
              </Grid>
              <Grid
                item
                xs={12}
                lg={7}
                position="relative"
                px={0}
  
              >
                
           <MapLocation coords={coords}/>
              </Grid>
            </Grid>
          </MKBox>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default TestForm;