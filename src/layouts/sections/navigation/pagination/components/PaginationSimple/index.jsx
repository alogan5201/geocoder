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

function PaginationSimple() {
  return (
    <Container sx={{ height: "100%" }}>
      <Grid container item justifyContent="center" xs={12} lg={6} mx="auto" height="100%">
        <Pagination>
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
    </Container>
  );
}

export default PaginationSimple;
