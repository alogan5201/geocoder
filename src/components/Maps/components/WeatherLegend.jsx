import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useLeafletContext } from '@react-leaflet/core';
import { useEffect, useState, useRef, Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import useStore from 'store/mapStore';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';

function stringToHtml(input) {
  // Split the input string into an array of words
  if (input && input.includes(' ')) {
    var words = input.split(' ');

    // Map over the words and return each word as a text and add a <br/> if not the last word
    var html = words.map((word, index) => (
      <Fragment key={index}>
        {word}
        {index !== words.length - 1 && <br />}
      </Fragment>
    ));
    return html;
  } else {
    return input;
  }
}
const LegendContent = ({ content, handleClose }) => {
  const spring = {
    type: 'spring',
    stiffness: 260,
    damping: 20,
  };
  const [weatherContentStyles, setWeatherContentStyles] = useState({
    minWidth: 180,
    backgroundColor: 'rgba(255,255,255,0.9)',
    visibility: 'visible',
    // transform: "rotate(180deg)",
  });

  useEffect(() => {
    if (content) {
      setWeatherContentStyles({
        minWidth: 180,
        backgroundColor: 'rgba(255,255,255,0.9)',
        visibility: 'visible',
      });
    }
  }, [content]);
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ ...spring, delay: 1.75 }}
    >
      <Card sx={weatherContentStyles} className="weatherLegendCard">
        <CardHeader
          sx={{ position: 'relative', padding: '3px' }}
          action={
            <IconButton
              aria-label="close"
              sx={{ position: 'absolute', top: 0, right: 0, padding: '7px', opacity: 0.8 }}
              onClick={handleClose}
            >
              <CloseIcon sx={{ fontSize: 15, color: '#333' }} />
            </IconButton>
          }
        />
        <CardContent>
          <Stack direction="column" spacing={0} alignItems="center">
            <Stack
              direction="row"
              spacing={0}
              sx={{ width: '100%' }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography sx={{ fontSize: 14 }} variant="body2" gutterBottom>
                {stringToHtml(content.origin.address)} <br />
                <span style={{ fontWeight: 500 }}>{Math.round(content.origin.temp)}°F</span>
              </Typography>
              <img alt="origin-weather-icon" src={content.origin.icon} loading="lazy" style={{ maxWidth: '40px' }} />
            </Stack>
            <Divider sx={{ my: 0.5, width: '100%', color: 'red', opacity: 0.9 }} />
            <Stack
              direction="row"
              spacing={5}
              sx={{ flexGrow: 1, width: '100%' }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography sx={{ fontSize: 14 }} variant="body2" gutterBottom>
                {stringToHtml(content.destination.address)} <br />
                <span style={{ fontWeight: 500 }}>{Math.round(content.destination.temp)}°F</span>
              </Typography>
              <img
                alt="destination-weather-icon"
                src={content.destination.icon}
                loading="lazy"
                style={{ maxWidth: '40px' }}
              />
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </motion.div>
  );
};

function WeatherLegend({ L }) {
  const weather = useStore((state) => state.weather);
  const routeData = useStore((state) => state.routeData);
  const [currentLegend, setCurrentLegend] = useState(null);
  const [closeWeatherContent, setCloseWeatherContent] = useState(false);
  const setLoading = useStore((state) => state.setLoading);
  const context = useLeafletContext();
  const handleCloseClick = (e) => {
    e.preventDefault();
    setCloseWeatherContent(true);
  };
  const legendControl = useRef(null);

  useEffect(() => {
    if (closeWeatherContent) {
      const legend = legendControl.current ? legendControl.current : currentLegend ? currentLegend.control : null;

      if (legend) {
        legend.remove();
      }
    } else if (weather) {
      setLoading(false);
      if (legendControl.current) {
        legendControl.current.remove();
      }
      legendControl.current = L.control({ position: 'bottomright' });

      legendControl.current.onAdd = () => {
        const div = L.DomUtil.create('div', 'info legend');

        // Use createRoot API for rendering
        const root = ReactDOM.createRoot(div);
        root.render(
          <div>
            <LegendContent content={weather} handleClose={handleCloseClick} />
          </div>
        );

        return div;
      };

      // Add the control to the leaflet map
      // legendControl.current.getContainer().style.opacity = '0';

      setTimeout(() => {
        setCurrentLegend(legendControl);

        legendControl.current.addTo(context.map);
      }, 1750);
    }
    // Create a leaflet control object

    // Cleanup
    return () => {
      if (legendControl.current) {
        legendControl.current.remove();
        setCurrentLegend(null);
      }
      if (closeWeatherContent) {
        setCloseWeatherContent(false);
      }
    };
  }, [context.map, weather, closeWeatherContent, routeData]);

  return null;
}

export default WeatherLegend;
