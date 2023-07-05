import { useEffect } from "react";
import { useLeafletContext } from "@react-leaflet/core";
import ReactDOM from "react-dom/client";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const LegendContent = () => (
  <Card sx={{ minWidth: 275 }}>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Word of the Day
      </Typography>

      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        adjective
      </Typography>
      <Typography variant="body2">
        well meaning and kindly.
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </Card>
);

function Legend({ L }) {
  const context = useLeafletContext();

  useEffect(() => {
    // Create a leaflet control object
    const legendControl = L.control({ position: "bottomright" });

    legendControl.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend");

      // Use createRoot API for rendering
      const root = ReactDOM.createRoot(div);
      root.render(
        <div>
          <LegendContent />
        </div>
      );

      return div;
    };

    // Add the control to the leaflet map
    legendControl.addTo(context.map);

    // Cleanup
    return () => {
      legendControl.remove();
    };
  }, [L, context.map]);

  return null;
}

export default Legend;
