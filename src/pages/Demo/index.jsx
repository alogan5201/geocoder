/* eslint-disable */
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import DirectionsIcon from '@mui/icons-material/Directions';
import AddressInput from 'components/AddressInput';
import Typography from 'components/Typography';
import FilledInfoCard from 'components/Cards/InfoCards/FilledInfoCard';
import { useEffect, useRef, useState, lazy } from 'react';
import useStore from 'store/mapStore';
import { covertAddressToLatLng, extractCityAndState, getDirections, metersToMiles } from 'util/geocoder';
import {
  fetchWeather,
  formatMarkerData,
  secondsToHoursMinutes,
  retrieveWeatherIconUrl,
  mobileScrollTo,
} from 'util/helpers';
import Form from './components/Form';
const DemoMap = lazy(() => import('components/Maps/DemoMap'));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const OriginInputIcon = () => {
  return (
    <Typography variant="h5" color="info">
      A
    </Typography>
  );
};
const DestinationInputIcon = () => {
  return (
    <Typography variant="h5" color="error">
      B
    </Typography>
  );
};
function DemoPage() {
  const [documentReady, setDocumentReady] = useState(false);
    const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (document.readyState === 'complete') {
      setDocumentReady(true);
    } else {
      const handleLoad = () => setDocumentReady(true);
      window.addEventListener('load', handleLoad);

      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);
  const handleMapLoad = () => {
    setTimeout(() => {
      setMapLoaded(true);
    }, 500);
  };
  return <div className="map-container-demo">{documentReady && <DemoMap setMapLoaded={handleMapLoad} />}</div>;
}
export default DemoPage;
