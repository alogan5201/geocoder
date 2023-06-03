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
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Typography from "components/Typography";

function TodoCard() {
  return (
    <Box bgColor="dark" variant="gradient" borderRadius="xl" shadow="lg">
      <Box p={3}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h5" color="white">
            To Do
          </Typography>
          <Box textAlign="center" lineHeight={1}>
            <Typography variant="h1" color="white" fontWeight="bold">
              7
            </Typography>
            <Typography variant="button" color="white" fontWeight="regular">
              items
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2" color="white" fontWeight="regular">
          Shopping
        </Typography>
        <Typography variant="body2" color="white" fontWeight="regular">
          Meeting
        </Typography>
      </Box>
      <Tooltip title="Show More" placement="top" sx={{ cursor: "pointer" }}>
        <Box textAlign="center" color="white" py={0.5} lineHeight={0}>
          <Icon sx={{ fontWeight: "bold" }} color="inherit" fontSize="default">
            keyboard_arrow_down
          </Icon>
        </Box>
      </Tooltip>
    </Box>
  );
}

export default TodoCard;
