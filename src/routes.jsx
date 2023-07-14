
import Icon from "@mui/material/Icon";
import React from "react";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import DirectionsIcon from "@mui/icons-material/Directions";
import VideocamIcon from "@mui/icons-material/Videocam";
const AddressToLatLng = React.lazy(() => import("pages/AddressToLatLng"));
const LatLngToAddress = React.lazy(() => import("pages/LatLngToAddress"));
const Bookmarks = React.lazy(() => import("pages/Bookmarks"));
const TestPage = React.lazy(() => import("pages/Test"));
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
        component: <LatLngToAddress key={"latLngToAddress"} />,
        key: "latLngToAddress",
      },
      {
        name: "Test Page",
        description: "",
        route: "/test",
        component: <TestPage key={"test"} />,
        key: "test",
      },
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
  {
    name: "docs",
    icon: <Icon>article</Icon>,
    collapse: [
      {
        name: "getting started",
        description: "All about overview, quick start, license and contents",
        href: "https://www.creative-tim.com/learning-lab/react/quick-start/material-kit/",
      },
      {
        name: "foundation",
        description: "See our colors, icons and typography",
        href: "https://www.creative-tim.com/learning-lab/react/colors/material-kit/",
      },
      {
        name: "components",
        description: "Explore our collection of fully designed components",
        href: "https://www.creative-tim.com/learning-lab/react/alerts/material-kit/",
      },
      {
        name: "plugins",
        description: "Check how you can integrate our plugins",
        href: "https://www.creative-tim.com/learning-lab/react/datepicker/material-kit/",
      },
    ],
  },
];

export default routes;
