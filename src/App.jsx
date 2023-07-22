
import { collection, getDocs, query } from "firebase/firestore";
import { Suspense, useEffect } from "react";
import useStore from "store/mapStore";
// react-router components
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffectOnce } from "react-use";

// @mui material components
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { db } from "util/firebase";

// Material Kit 2 PRO React themes
import theme from "assets/theme";
import Loading from "components/Loading";
import NotFoundPage from "pages/404";
import HomePage from "pages/HomePage";
import MovieDetailPage from "pages/MovieDetails";
import Movies from "pages/Movies";
import "src/App.css";
// Material Kit 2 PRO React routes
import routes from "routes";
import WebFont from 'webfontloader';

export default function App() {
  const { pathname } = useLocation();


  const resetMapData = useStore((state) => state.resetMapData);
  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    
    localStorage.setItem("markerData", "[]");
 WebFont.load({
   google: {
     families: ['Roboto:300,400,500,700', 'Material+Icons'],
   },
 });
    resetMapData();
  }, [pathname]);
  useEffectOnce(() => {
    const setMovieList = async () => {
      // * As more movies are added to the database, this number should be updated
      localStorage.setItem('movie-list-length', 250);
    };
    setMovieList();
  });
  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<Loading />}>
        <Routes>
          {getRoutes(routes)}
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/location/:slug" element={<MovieDetailPage />} />
          <Route path="/movies/:slug" element={<Movies />} />
          <Route path="/404" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}
