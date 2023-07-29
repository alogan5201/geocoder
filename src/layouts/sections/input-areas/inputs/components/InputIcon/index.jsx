/* eslint-disable no-param-reassign */

// @mui material components
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';

// @mui icons
import SearchIcon from '@mui/icons-material/Search';

import Box from 'components/Box';
import Input from 'components/Input';

function InputIcon() {
  return (
    <Box component="section" py={12}>
      <Container>
        <Grid container item xs={12} lg={4} py={1} mx="auto">
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
        </Grid>
      </Container>
    </Box>
  );
}

export default InputIcon;
