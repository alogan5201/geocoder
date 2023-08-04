
// routes.jsx
import BuildIcon from '@mui/icons-material/Build';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import DirectionsIcon from '@mui/icons-material/Directions';
import VideocamIcon from '@mui/icons-material/Videocam';
import AddressToLatLng from 'pages/AddressToLatLng';
import LatLngToAddress from 'pages/LatLngToAddress';
import Bookmarks from 'pages/Bookmarks';
import RoutePlanner from 'pages/RoutePlanner';
import Movies from 'pages/Movies';


const routes = [
  {
    name: "tools",
    icon: <BuildIcon />,
    collapse: [
      {
        name: "Address to Latitude & Longitude",
        description: "Convert an address to Latitude and Longitude",
        route: "/address-to-lat-lng",
        component: <AddressToLatLng />,
        key: "addressToLatLng",
      },
      {
        name: "Latitude & Longitude to Address",
        description: "Convert Latitude and Longitude to an address",
        route: "/lat-lng-to-address",
        component: <LatLngToAddress  />,
        key: "latLngToAddress",
      }
    ],
  },
  {
    name: "routePlanner",
    icon: <DirectionsIcon />,
    route: "/route-planner",
    component: <RoutePlanner />,
    key: "routePlanner",
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
