// routes.jsx
import BuildIcon from '@mui/icons-material/Build';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import DirectionsIcon from '@mui/icons-material/Directions';
import VideocamIcon from '@mui/icons-material/Videocam';
import AddressToLatLng from 'pages/AddressToLatLng';
import LatLngToAddress from 'pages/LatLngToAddress';
import Bookmarks from 'pages/Bookmarks';
import Movies from 'pages/Movies';
import JourneyInsightsPage from 'pages/JourneyInsights';


const routes = [
  {
    name: "tools",
    icon: <BuildIcon />,
    collapse: [
      {
        name: "address to latitude/longitude",
        description: "convert an address to latitude/longitude",
        route: "/address-to-lat-lng",
        component: <AddressToLatLng />,
        key: "addressToLatLng",
      },
      {
        name: "latitude/longitude to address", 
        description: "convert latitude and longitude to an address",
        route: "/lat-lng-to-address",
        component: <LatLngToAddress  />,
        key: "latLngToAddress",
      },
      {
        name: "journey insights",
        description: "plan your trip with helpful insights",
        route: "/journey-insights",
        component: <JourneyInsightsPage />,
        key: "journeyInsights",
      }
    ],
  },
  {
    name: "bookmarks",
    icon: <CollectionsBookmarkIcon />,
    route: "/bookmarks",
    component: <Bookmarks />,
    key: "bookmarks",
  },
  {
    name: "movies",
    icon: <VideocamIcon />,
    route: "/movies",
    component: <Movies />,
    key: "movies",
  },
];

export default routes;
