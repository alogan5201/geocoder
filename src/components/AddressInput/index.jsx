import Grid from "@mui/material/Grid";
import Input from "components/Input";
// @mui material components
import InputAdornment from "@mui/material/InputAdornment";
import useStore from "store/mapStore";

// @mui icons
import SearchIcon from "@mui/icons-material/Search";

// Material Kit 2 PRO React components
function AddressInput(props){
  const clearMapInputs = useStore((state) => state.clearMapInputs);
  const setMapInputState = useStore((state) => state.setMapInputState);
      function handleChange(e) {
        let val = e.target.value;
   
        if (val.length === 0 && props.readOnly === false) {
          console.log("clearing map inputs")
          setMapInputState(true);
        }
      }
  return (
    <Grid item xs={12} pr={1} mb={3}>
      <Input
      onChange={handleChange}
        fullWidth
     type="text"
        label="Search"
        defaultValue="Atlanta, GA"
      
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