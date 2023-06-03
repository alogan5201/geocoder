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
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Typography from "components/Typography";

function Emails() {
  return (
    <Card>
      <Box display="flex" justifyContent="space-between" p={3} lineHeight={1}>
        <Typography variant="body2" color="text">
          Emails (21)
        </Typography>
        <Tooltip title="Check your emails" placement="top">
          <Box component="a" href="#">
            <Typography variant="body2" fontWeight="regular">
              Check
            </Typography>
          </Box>
        </Tooltip>
      </Box>
    </Card>
  );
}

export default Emails;
