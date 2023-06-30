
import Icon from "@mui/material/Icon";
import React from "react";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";

const AddressToLatLng = React.lazy(() => import("pages/AddressToLatLng"));
const Bookmarks = React.lazy(() => import("pages/Bookmarks"));
const TestPage = React.lazy(() => import("pages/Test"));

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
      },
      {
        name: "Test Page",
        description: "",
        route: "/test",
        component: <TestPage />,
      },
    ],
  },
  {
    name: "bookmarks",
    icon: <CollectionsBookmarkIcon />,
    route: "/bookmarks",
    component: <Bookmarks />,
    key: "bookmarks"
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
