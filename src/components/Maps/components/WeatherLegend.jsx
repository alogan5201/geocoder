import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useLeafletContext } from '@react-leaflet/core';
import { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import useStore from 'store/mapStore';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close'
  import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';

const LegendContent = ({ content, handleClose }) => {
  
  const [weatherContentStyles, setWeatherContentStyles] = useState({
    minWidth: 180,
    backgroundColor: 'rgba(255,255,255,0.9)',
    visibility:"visible"
    // transform: "rotate(180deg)",
  })
  

  useEffect(() => {

    if (content) {
      setWeatherContentStyles({
        minWidth: 180,
        backgroundColor: 'rgba(255,255,255,0.9)',
        visibility:"visible",
      })
      
    }
  }, [content])
  return (
    <Card sx={weatherContentStyles}>
      <CardHeader
        sx={{ position: 'relative', padding: "3px" }}
        action={
          <IconButton aria-label="close" sx={{ position: 'absolute', top: 0, right: 0, padding:"7px", opacity:0.8 }} onClick={handleClose}>
            <CloseIcon sx={{ fontSize: 15, color: '#333' }} />
          </IconButton>
        }
      />
      <CardContent>
        <Stack direction="column" spacing={0} alignItems="center">
          <Stack direction="row" spacing={0} sx={{ width: '100%' }} justifyContent="space-between" alignItems="center">
            <Typography sx={{ fontSize: 14 }} variant="body2" gutterBottom>
              {content.origin.address} <br />
              {Math.round(content.origin.temp)}°F
            </Typography>
            <motion.div
              className="box animatedWeatherIcon"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                ease: [0, 0.71, 0.2, 1.01],
                scale: {
                  type: 'spring',
                  damping: 15,
                  stiffness: 100,
                  restDelta: 0.001,
                },
              }}
            >
              <img alt="origin-weather-icon" src={content.origin.icon} loading="lazy" style={{ maxWidth: '40px' }} />
            </motion.div>
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
              {content.destination.address} <br />
              {Math.round(content.destination.temp)}°F
            </Typography>
            <motion.div
              className="box animatedWeatherIcon"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                ease: [0, 0.71, 0.2, 1.01],
                scale: {
                  type: 'spring',
                  damping: 15,
                  stiffness: 100,
                  restDelta: 0.001,
                },
              }}
            >
              <img
                alt="destination-weather-icon"
                src={content.destination.icon}
                loading="lazy"
                style={{ maxWidth: '40px' }}
              />
            </motion.div>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
function WeatherLegend({ L }) {
  const weather = useStore((state) => state.weather);

const [closeWeatherContent,setCloseWeatherContent]= useState(false)
  const setLoading = useStore((state) => state.setLoading);
  const context = useLeafletContext();
  const handleCloseClick = (e) => {
    e.preventDefault();
    setCloseWeatherContent(true)
  };
    const legendControl = useRef(null);
useEffect(() => {
  console.log("closeWeatherContent", closeWeatherContent)
}, [closeWeatherContent]);
  useEffect(() => {
    if (weather) {
      setLoading(false);
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
      legendControl.current.addTo(context.map);
    }
    // Create a leaflet control object
    if (closeWeatherContent) {
      console.log('🚀 ~ useEffect ~ closeWeatherContent:', closeWeatherContent);
      legendControl.current.getContainer().style.opacity = '0';

      legendControl.current.remove();
    }
    // Cleanup
    return () => {
      if (legendControl.current) {
        legendControl.current.remove();
      }
      if(closeWeatherContent){
        setCloseWeatherContent(false)
      }
    };
  }, [L, context.map, weather, closeWeatherContent]);

  return null;
}

export default WeatherLegend;