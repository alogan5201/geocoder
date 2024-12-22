# 🌍 geocoder 

A web app that lets users discover filming locations of movies, plan routes, and manage location bookmarks.
- [React 18](https://react.dev/) with [Vite](https://vitejs.dev/)
- [Material UI](https://mui.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Leaflet](https://react-leaflet.js.org/)
- [Mapbox](https://www.mapbox.com/) for geocoding
- [TheMovieDB](https://www.themoviedb.org/documentation/api) for movie data
- [OpenWeather](https://openweathermap.org/api) for weather info
- [Firebase](https://firebase.google.com/)

🚀 **[Live Demo](https://movielatlong.com/)**

![Demo](demo.gif)

## Features
 - Convert addresses to/from coordinates
 - Browse filming locations with interactive maps
 - Save favorite locations
 - Real-time weather information

### Prerequisites
- [Node.js](https://nodejs.org/) (v14+)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Firebase](https://firebase.google.com/) account
- Required API keys:
  - VITE_FIREBASE_API_KEY ([Firebase](https://firebase.google.com/))
  - VITE_MAPBOX_ACCESS_TOKEN ([Mapbox](https://docs.mapbox.com/))
  - VITE_THE_MOVIE_DB_API_KEY ([TheMovieDB](https://developer.themoviedb.org/docs/getting-started))
  - VITE_OPEN_WEATHER_API_KEY ([OpenWeather](https://openweathermap.org/api))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/geocoder.git
cd geocoder
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Create a `.env` file with required API keys:
```bash
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_token
VITE_THE_MOVIE_DB_API_KEY=your_moviedb_key
VITE_OPEN_WEATHER_API_KEY=your_openweather_key
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:5173` to view the application.

### Building for Production

1. Create a production build:
```bash
npm run build
# or
yarn build
```

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Acknowledgements

- Built with [React](https://react.dev/), [Vite](https://vitejs.dev/),and [Firebase](https://firebase.google.com/)
- UI components from [Material UI](https://mui.com/)
- State management using [Zustand](https://github.com/pmndrs/zustand)
- Map functionality provided by [Leaflet](https://leafletjs.com/) and [Mapbox](https://www.mapbox.com/)
- Movie data courtesy of [TheMovieDB API](https://www.themoviedb.org/)
- Weather information from [OpenWeather API](https://openweathermap.org/)

