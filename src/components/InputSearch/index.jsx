// @mui material components
import InputAdornment from '@mui/material/InputAdornment';

// @mui icons
import SearchIcon from '@mui/icons-material/Search';

import Input from 'components/Input';

function InputSearch() {
  return (
    <Input
      variant="standard"
      placeholder="Search"
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="small" />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default InputSearch;
