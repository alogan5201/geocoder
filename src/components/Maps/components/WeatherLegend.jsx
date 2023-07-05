import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useLeafletContext } from "@react-leaflet/core";
import { useEffect } from "react";
import ReactDOM from "react-dom/client";
import useStore from "store/mapStore";
import Stack from "@mui/material/Stack";
import WeatherImage from "components/WeatherImage";
import weatherIconImg from 'assets/images/weather/01.png';
import Divider from "@mui/material/Divider";
import Box from "components/Box";
const LegendContent = ({ content }) => (
  <Card sx={{ minWidth: 180 }}>
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
function WeatherLegend({ L }) {

  const { setWeather, weather } = useStore((state) => ({
    setWeather: state.setWeather,
    weather: state.weather,
  }));
  const context = useLeafletContext();

  useEffect(() => {
    const legendControl = L.control({ position: "bottomright" });
    if (weather) {
      console.log(weather);

      legendControl.onAdd = () => {
        const div = L.DomUtil.create("div", "info legend");

        // Use createRoot API for rendering
        const root = ReactDOM.createRoot(div);
        root.render(
          <div>
            <LegendContent content={weather} />
          </div>
        );

        return div;
      };

      // Add the control to the leaflet map
      legendControl.addTo(context.map);
    }
    // Create a leaflet control object

    // Cleanup
    return () => {
      legendControl.remove();
    };
  }, [L, context.map, weather]);

  return null;
}

export default WeatherLegend;
