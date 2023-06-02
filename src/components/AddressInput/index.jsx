import Grid from "@mui/material/Grid";
import MKInput from "components/MKInput";

function AddressInput({handleAddressChange}){
    const func = () => {
        console.log("child function");
      };
  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
    <Grid item xs={12} sx={{ my: 1 }}>
    <MKInput fullWidth type="search" label="Search" defaultValue="Atlanta, GA" onChange={() => handleAddressChange(func)}/>
    </Grid>
  </Grid>
  )  
}

export default AddressInput