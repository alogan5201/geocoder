
import { useEffect, Suspense } from "react";
import useStore from "store/mapStore";
// react-router components
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffectOnce } from "react-use";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";
import 'leaflet/dist/leaflet.css';
import NotFoundPage from "pages/404";
import DemoPage from "pages/Demo";
import HomePage from "pages/HomePage";
import MovieDetailPage from "pages/MovieDetails";
import Movies from "pages/Movies";
import routes from "routes";
import "src/App.css";
//import WebFont from 'webfontloader';
export default function App() {
  const { pathname } = useLocation();
//const [reset, setReset] = useState(false)

  const resetMapData = useStore((state) => state.resetMapData);
  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;

    localStorage.setItem('markerData', '[]');
    // Roboto, Helvetica, Arial, sans-serif
    /*  WebFont.load({
      google: {
        families: ['Roboto:300,400,500,700', 'Material+Icons', 'Lumanosimo:400'],
      },
    }); 
        setTimeout(() => {
      
      setReset(true);
    }, 1000);
    return () => { setReset(false)}
    */
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
      <Routes>
        {getRoutes(routes)}
        <Route path="/" element={<HomePage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/location/:slug" element={<MovieDetailPage />} />
        <Route path="/movies/:slug" element={<Movies />} />
        <Route path="/404" element={<NotFoundPage />} />
      </Routes>
    </ThemeProvider>
  );
}
