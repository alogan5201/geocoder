
import Icon from "@mui/material/Icon";
import React from "react";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import DirectionsIcon from "@mui/icons-material/Directions";
import VideocamIcon from "@mui/icons-material/Videocam";

const AddressToLatLng = React.lazy(() => import("pages/AddressToLatLng"));
const LatLngToAddress = React.lazy(() => import("pages/LatLngToAddress"));
const Bookmarks = React.lazy(() => import("pages/Bookmarks"));
const RoutePlanner = React.lazy(() => import("pages/RoutePlanner"));
const Movies = React.lazy(() => import("pages/Movies"));


const routes = [
  {
    name: "tools",
    icon: <Icon>article</Icon>,
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
