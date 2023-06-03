/*
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
import Box from "components/Box";
import Typography from "components/Typography";

function Features() {
  const data = [
    {
      icon: "credit_card",
      name: "Modular Components",
    },
    {
      icon: "history_edu",
      name: "Great Features",
    },
    {
      icon: "developer_mode",
      name: "Modern Frameworks",
    },
    {
      icon: "history",
      name: "24/7 Support",
    },
    {
      icon: "support",
      name: "Awesome Support",
    },
    {
      icon: "contacts",
      name: "Modern Interface",
    },
  ];

  return (
    <Box component="section" py={8}>
      <Container>
        <Grid container item xs={12} md={9} mx="auto">
          {data.map(({ icon, name }) => (
            <Grid key={name} item xs={12} md={4} my={2}>
              <Box p={2} textAlign="center" borderRadius="lg">
                <Typography variant="h3" color="info" mb={2} textGradient>
                  <Icon>{icon}</Icon>
                </Typography>
                <Typography variant="h6">{name}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Features;
