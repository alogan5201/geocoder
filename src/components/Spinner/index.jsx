
import Box from "@mui/material/Box";
import { PuffLoader } from 'react-spinners';

 function Spinner() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <PuffLoader color="#1A73E8" />
    </Box>
  );
}

export default Spinner