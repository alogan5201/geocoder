const paginationSizingCode = `// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";


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

export default PaginationSizing;`;

export default paginationSizingCode;
