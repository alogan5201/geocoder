import Grid from "@mui/material/Grid";
import MKInput from "components/MKInput";
// @mui material components
import InputAdornment from "@mui/material/InputAdornment";

// @mui icons
import SearchIcon from "@mui/icons-material/Search";

// Material Kit 2 PRO React components
function AddressInput({handleAddressChange}){
    const func = () => {
        console.log("child function");
      };
  return (
    <Grid item xs={12} pr={1} mb={3}>
      <MKInput
        fullWidth
     type="text"
        label="Search"
        defaultValue="Atlanta, GA"
        onChange={() => handleAddressChange(func)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  );  
}

export default AddressInput