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

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Typography from "components/Typography";
import Input from "components/Input";
// import DatePicker from "components/DatePicker";
import Button from "components/Button";

function Search() {
  return (
    <Box component="section">
      <Container>
        <Grid container spacing={{ xs: 0, lg: 3 }} sx={{ pt: 2, pb: 3, px: 2, mx: "auto" }}>
          <Grid item xs={12} lg={3} sx={{ mt: 2 }}>
            <Typography display="block" variant="button" fontWeight="regular" color="text" mb={1}>
              Leave From
            </Typography>
            <Autocomplete
              defaultValue="Bucharest"
              options={["Brazil", "Bucharest", "London", "USA"]}
              renderInput={(params) => <Input {...params} variant="standard" />}
            />
          </Grid>
          <Grid item xs={12} lg={3} sx={{ mt: 2 }}>
            <Typography display="block" variant="button" fontWeight="regular" color="text" mb={1}>
              To
            </Typography>
            <Autocomplete
              defaultValue="Italy"
              options={["Denmark", "Italy", "Poland", "Spain"]}
              renderInput={(params) => <Input {...params} variant="standard" />}
            />
          </Grid>
          <Grid item xs={12} lg={3} sx={{ mt: 2 }}>
            <Typography display="block" variant="button" fontWeight="regular" color="text" mb={1}>
              Depart
            </Typography>
            <Input type="date" variant="standard" placeholder="Please select date" fullWidth />
          </Grid>
          <Grid item xs={12} lg={3} sx={{ mt: 4 }}>
            <Button variant="gradient" color="info" fullWidth>
              search
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Search;
