
// @mui material components
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';

import Box from 'components/Box';
import Input from 'components/Input';

function SelectPicker() {
  return (
    <Box component="section" py={12}>
      <Container>
        <Grid container justifyContent="center">
          <Autocomplete
            defaultValue="Washington"
            options={['Brazil', 'Bucharest', 'London', 'Washington']}
            sx={{ width: 300 }}
            renderInput={(params) => <Input {...params} variant="standard" />}
          />
        </Grid>
      </Container>
    </Box>
  );
}

export default SelectPicker;
