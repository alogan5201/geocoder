/**
=========================================================
* Material Kit 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Kit 2 PRO React React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Navbar.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `name` key is used for the name of the route on the Navbar.
  2. The `icon` key is used for the icon of the route on the Navbar.
  3. The `collapse` key is used for making a collapsible item on the Navbar that contains other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  4. The `route` key is used to store the route location which is used for the react router.
  5. The `href` key is used to store the external links location.
  6. The `component` key is used to store the component of its route.
  7. The `dropdown` key is used to define that the item should open a dropdown for its collapse items .
  8. The `description` key is used to define the description of
          a route under its name.
  9. The `columns` key is used to define that how the content should look inside the dropdown menu as columns,
          you can set the columns amount based on this key.
  10. The `rowsPerColumn` key is used to define that how many rows should be in a column.
*/

// @mui material components
import Icon from "@mui/material/Icon";

// Pages
import DesktopApp from "layouts/pages/apps/desktop-app";
import Author from "layouts/pages/blogs/author";
import SingleArticle from "layouts/pages/blogs/single-article";
import AboutUs from "layouts/pages/company/about-us";
import Pricing from "layouts/pages/company/pricing";
import VirtualRealityPage from "layouts/pages/extra/virtual-reality";
import CoworkingPage from "layouts/pages/landing-pages/coworking";
import Rental from "layouts/pages/landing-pages/rental";
import ContactUs from "layouts/pages/support/contact-us";
import Faq from "layouts/pages/support/faq";
import HelpCenter from "layouts/pages/support/help-center";
import Privacy from "layouts/pages/support/privacy";

// Account
import ResetPasswordPage from "layouts/authentication/reset-password/cover";
import SignInBasicPage from "layouts/authentication/sign-in/basic";
import SignInCoverPage from "layouts/authentication/sign-in/cover";
import SignInIllustration from "layouts/authentication/sign-in/illustration";
import SignInSimplePage from "layouts/authentication/sign-in/simple";
import SignUpCoverPage from "layouts/authentication/sign-up/cover";

// Sections
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import AddressToLatLng from "pages/AddressToLatLng";
import Bookmarks from "pages/Bookmarks";
import TestPage from "pages/Test";
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
    name: "pages",
    icon: <Icon>dashboard</Icon>,
    columns: 3,
    rowsPerColumn: 2,
    collapse: [
      {
        name: "landing pages",
        collapse: [
          {
            name: "coworking",
            route: "/pages/landing-pages/coworking",
            component: <CoworkingPage />,
          },
          {
            name: "rental",
            route: "/pages/landing-pages/rental",
            component: <Rental />,
          },
        ],
      },
      {
        name: "company",
        collapse: [
          {
            name: "about us",
            route: "/pages/company/about-us",
            component: <AboutUs />,
          },
          {
            name: "pricing",
            route: "/pages/company/pricing",
            component: <Pricing />,
          },
        ],
      },
      {
        name: "support",
        collapse: [
          {
            name: "help center",
            route: "/pages/support/help-center",
            component: <HelpCenter />,
          },
          {
            name: "contact us",
            route: "/pages/support/contact-us",
            component: <ContactUs />,
          },
          {
            name: "faq",
            route: "/pages/support/faq",
            component: <Faq />,
          },
          {
            name: "privacy",
            route: "/pages/support/privacy",
            component: <Privacy />,
          },
        ],
      },
      {
        name: "apps",
        collapse: [
          {
            name: "desktop app",
            route: "/pages/apps/desktop-app",
            component: <DesktopApp />,
          },
        ],
      },
      {
        name: "blogs",
        collapse: [
          {
            name: "single article",
            route: "/pages/blogs/single-article",
            component: <SingleArticle />,
          },
          {
            name: "author",
            route: "/pages/blogs/author",
            component: <Author />,
          },
        ],
      },
      {
        name: "extra",
        collapse: [
          {
            name: "virtual reality",
            route: "/pages/extra/virtual-reality",
            component: <VirtualRealityPage />,
          },
        ],
      },
    ],
  },
  {
    name: "account",
    icon: <Icon>contacts</Icon>,
    collapse: [
      {
        name: "sign in",
        dropdown: true,
        collapse: [
          {
            name: "basic",
            route: "/authentication/sign-in/basic",
            component: <SignInBasicPage />,
          },
          {
            name: "cover",
            route: "/authentication/sign-in/cover",
            component: <SignInCoverPage />,
          },
          {
            name: "illustration",
            route: "/authentication/sign-in/illustration",
            component: <SignInIllustration />,
          },
          {
            name: "simple",
            route: "/authentication/sign-in/simple",
            component: <SignInSimplePage />,
          },
        ],
      },
      {
        name: "sign up",
        dropdown: true,
        collapse: [
          {
            name: "cover",
            route: "/authentication/sign-up/cover",
            component: <SignUpCoverPage />,
          },
        ],
      },
      {
        name: "reset password",
        dropdown: true,
        collapse: [
          {
            name: "cover",
            route: "/authentication/reset-password/cover",
            component: <ResetPasswordPage />,
          },
        ],
      },
    ],
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
