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
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Typography from "components/Typography";

function TodoList() {
  return (
    <Card sx={{ height: "100%", overflow: "hidden" }}>
      <Box p={3}>
        <Box display="flex" lineHeight={1}>
          <Box mr={2}>
            <Typography variant="h6" fontWeight="medium">
              08:00
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="medium">
              Synk up with Mark
            </Typography>
            <Typography variant="button" fontWeight="regular" color="secondary">
              Hangouts
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box display="flex" lineHeight={0}>
          <Box mr={2}>
            <Typography variant="h6" fontWeight="medium">
              09:30
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="medium">
              Gym
            </Typography>
            <Typography variant="button" fontWeight="regular" color="secondary">
              World Class
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box display="flex" lineHeight={1}>
          <Box mr={2}>
            <Typography variant="h6" fontWeight="medium">
              11:00
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="medium">
              Design Review
            </Typography>
            <Typography variant="button" fontWeight="regular" color="secondary">
              Zoom
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box bgColor="grey-100" mt="auto">
        <Tooltip title="Show More" placement="top" sx={{ cursor: "pointer" }}>
          <Box textAlign="center" py={0.5} color="info" lineHeight={0}>
            <Icon sx={{ fontWeight: "bold" }} color="inherit" fontSize="default">
              keyboard_arrow_down
            </Icon>
          </Box>
        </Tooltip>
      </Box>
    </Card>
  );
}

export default TodoList;
