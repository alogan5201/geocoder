/* eslint-disable no-param-reassign */

// @mui material components
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';

import Pagination from 'components/Pagination';

function PaginationVariants() {
  return (
    <Container sx={{ height: '100%' }}>
      <Grid container spacing={3} alignItems="center" mx="auto" height="100%">
        <Grid item xs={12}>
          <Pagination color="primary" placement="center">
            <Pagination item>
              <Icon>keyboard_arrow_left</Icon>
            </Pagination>
            <Pagination item active>
              1
            </Pagination>
            <Pagination item>2</Pagination>
            <Pagination item>3</Pagination>
            <Pagination item>4</Pagination>
            <Pagination item>5</Pagination>
            <Pagination item>
              <Icon>keyboard_arrow_right</Icon>
            </Pagination>
          </Pagination>
        </Grid>
        <Grid item xs={12}>
          <Pagination color="info" placement="center">
            <Pagination item>
              <Icon>keyboard_arrow_left</Icon>
            </Pagination>
            <Pagination item active>
              1
            </Pagination>
            <Pagination item>2</Pagination>
            <Pagination item>3</Pagination>
            <Pagination item>4</Pagination>
            <Pagination item>5</Pagination>
            <Pagination item>
              <Icon>keyboard_arrow_right</Icon>
            </Pagination>
          </Pagination>
        </Grid>
        <Grid item xs={12}>
          <Pagination color="success" placement="center">
            <Pagination item>
              <Icon>keyboard_arrow_left</Icon>
            </Pagination>
            <Pagination item active>
              1
            </Pagination>
            <Pagination item>2</Pagination>
            <Pagination item>3</Pagination>
            <Pagination item>4</Pagination>
            <Pagination item>5</Pagination>
            <Pagination item>
              <Icon>keyboard_arrow_right</Icon>
            </Pagination>
          </Pagination>
        </Grid>
        <Grid item xs={12}>
          <Pagination color="warning" placement="center">
            <Pagination item>
              <Icon>keyboard_arrow_left</Icon>
            </Pagination>
            <Pagination item active>
              1
            </Pagination>
            <Pagination item>2</Pagination>
            <Pagination item>3</Pagination>
            <Pagination item>4</Pagination>
            <Pagination item>5</Pagination>
            <Pagination item>
              <Icon>keyboard_arrow_right</Icon>
            </Pagination>
          </Pagination>
        </Grid>
        <Grid item xs={12}>
          <Pagination color="error" placement="center">
            <Pagination item>
              <Icon>keyboard_arrow_left</Icon>
            </Pagination>
            <Pagination item active>
              1
            </Pagination>
            <Pagination item>2</Pagination>
            <Pagination item>3</Pagination>
            <Pagination item>4</Pagination>
            <Pagination item>5</Pagination>
            <Pagination item>
              <Icon>keyboard_arrow_right</Icon>
            </Pagination>
          </Pagination>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PaginationVariants;
