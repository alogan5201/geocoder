
// routes.jsx
import { lazy } from 'react'
const BuildIcon = lazy(() => import('@mui/icons-material/Build'));
const CollectionsBookmarkIcon = lazy(() => import('@mui/icons-material/CollectionsBookmark'));
const DirectionsIcon = lazy(() => import('@mui/icons-material/Directions'));
const VideocamIcon = lazy(() => import('@mui/icons-material/Videocam'));
const AddressToLatLng = lazy(() => import('pages/AddressToLatLng'));
const LatLngToAddress = lazy(() => import('pages/LatLngToAddress'));
const Bookmarks = lazy(() => import('pages/Bookmarks'));
const RoutePlanner = lazy(() => import('pages/RoutePlanner'));
const Movies = lazy(() => import('pages/Movies'));


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
