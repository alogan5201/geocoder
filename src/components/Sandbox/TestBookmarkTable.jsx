// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Badge from "components/Badge";
import Avatar from "components/Avatar";
import Typography from "components/Typography";

// Material Kit 2 PRO React examples
import Table from "examples/Tables/Table";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";



function Role({ job, org }) {
  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="caption" fontWeight="medium" color="text">
        {job}
      </Typography>
      <Typography variant="caption" color="secondary">
        {org}
      </Typography>
    </Box>
  );
}

// Typechecking props for the Role
Role.propTypes = {
  job: PropTypes.string.isRequired,
  org: PropTypes.string.isRequired,
};

function TestBookmarkTable() {
  const { columns, rows } = {
    columns: [
      { name: "address", align: "left" },
      { name: "latitude", align: "left" },
      { name: "longitude", align: "left" },
    ],

    rows: [
      {
        address: (
          <Typography variant="button" color="secondary">
            Atlanta, GA
          </Typography>
        ),
        latitude: <Role job="Manager" org="Organization" />,
        longitude: (
          <Badge variant="contained" badgeContent="online" color="success" size="xs" container />
        ),
      },
      {
        address: (
          <Typography variant="button" color="secondary">
            Atlanta, GA
          </Typography>
        ),
        latitude: <Role job="Programator" org="Developer" />,
        longitude: (
          <Badge variant="contained" badgeContent="offline" color="secondary" size="xs" container />
        ),
      },
      {
        address: (
          <Typography variant="button" color="secondary">
            Atlanta, GA
          </Typography>
        ),
        latitude: <Role job="Executive" org="Projects" />,
        longitude: (
          <Badge variant="contained" badgeContent="online" color="success" size="xs" container />
        ),
      },
      {
        address: (
          <Typography variant="button" color="secondary">
            Atlanta, GA
          </Typography>
        ),
        latitude: <Role job="Programator" org="Developer" />,
        longitude: (
          <Badge variant="contained" badgeContent="online" color="success" size="xs" container />
        ),
      },
      {
        address: (
          <Typography variant="button" color="secondary">
            Atlanta, GA
          </Typography>
        ),
        latitude: <Role job="Manager" org="Executive" />,
        longitude: (
          <Badge variant="contained" badgeContent="offline" color="secondary" size="xs" container />
        ),
      },
      {
        address: (
          <Typography variant="button" color="secondary">
            Atlanta, GA
          </Typography>
        ),
        latitude: <Role job="Programtor" org="Developer" />,
        longitude: (
          <Badge variant="contained" badgeContent="offline" color="secondary" size="xs" container />
        ),
      },
    ],
  };

  return (
    <Box component="section" py={12}>
      <Container>
        <Grid container item xs={12} lg={10} mx="auto">
          <Table columns={columns} rows={rows} />
        </Grid>
      </Container>
    </Box>
  );
}

export default TestBookmarkTable;
