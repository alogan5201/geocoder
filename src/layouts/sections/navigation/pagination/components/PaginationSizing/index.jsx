/* eslint-disable no-param-reassign */
/**
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
import Icon from "@mui/material/Icon";

// Material Kit 2 PRO React components
import Pagination from "components/Pagination";

function PaginationSizing() {
  return (
    <Container sx={{ height: "100%" }}>
      <Grid container spacing={3} alignItems="center" mx="auto" height="100%">
        <Grid item xs={12}>
          <Pagination size="small" placement="center">
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
          <Pagination placement="center">
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
          <Pagination size="large" placement="center">
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

export default PaginationSizing;
