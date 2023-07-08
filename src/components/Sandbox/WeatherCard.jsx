import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Avatar from "@mui/material/Avatar";

const WeatherCard = ({ content, loading }) => {
    const cardStyles = {
      minWidth: 180,
      transform: "rotate(180deg)",
    };
  if (loading) {
    return (
      <Card sx={{ minWidth: 180 }}>
        <CardContent>
          <Stack direction="row" spacing={5}>
            <Stack spacing={0}>
              <Typography sx={{ fontSize: 14 }} variant="body2" gutterBottom>
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={40} height={10} />
              </Typography>
              <Typography sx={{ fontSize: 14 }} variant="body2" gutterBottom>
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={25} height={10} />
              </Typography>
            </Stack>

            <Skeleton variant="circular">
              <Avatar />
            </Skeleton>
          </Stack>
          <Divider sx={{ my: 2 }} />
          <Stack direction="row" spacing={5}>
            <Stack spacing={0}>
              <Typography sx={{ fontSize: 14 }} variant="body2" gutterBottom>
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={40} height={10} />
              </Typography>
              <Typography sx={{ fontSize: 14 }} variant="body2" gutterBottom>
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={25} height={10} />
              </Typography>
            </Stack>

            <Skeleton variant="circular">
              <Avatar />
            </Skeleton>
          </Stack>
        </CardContent>
      </Card>
    );
  } else {
    return (
      <Card sx={cardStyles}>
        <CardContent>
          <Stack direction="row" spacing={5}>
            <Typography sx={{ fontSize: 14 }} variant="body2" gutterBottom>
              {content.origin.address} <br />
              {Math.round(content.origin.temp)}°F
            </Typography>
            <img
              src={`/src/${content.origin.icon}`}
              loading="lazy"
              style={{ marginLeft: "auto", maxWidth: "50px" }}
            />
          </Stack>
          <Divider sx={{ my: 2 }} />
          <Stack direction="row" spacing={5}>
            <Typography sx={{ fontSize: 14 }} variant="body2" gutterBottom>
              {content.destination.address} <br />
              {Math.round(content.destination.temp)}°F
            </Typography>
            <img
              src={`/src/${content.destination.icon}`}
              loading="lazy"
              style={{ marginLeft: "auto", maxWidth: "50px" }}
            />
          </Stack>
        </CardContent>
      </Card>
    );
  }
};

export default WeatherCard;
