# Geocoder

A web app that lets users discover filming locations of movies, plan routes, and manage location bookmarks.
- [React 18](https://react.dev/) with [Vite](https://vitejs.dev/)
- [Material-UI (MUI)](https://mui.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Leaflet](https://leafletjs.com/)/[React-Leaflet](https://react-leaflet.js.org/)
- [Mapbox](https://www.mapbox.com/) for geocoding
- [TheMovieDB](https://www.themoviedb.org/documentation/api) for movie data
- [OpenWeather](https://openweathermap.org/api) for weather info
- **Backend**: [Firebase](https://firebase.google.com/)

🚀 **[Live Demo](https://movielatlong.com/)**

![Demo](demo.gif)

## Features
- Browse filming locations with interactive maps
- Convert addresses to/from coordinates
- Save favorite locations with custom notes
- Real-time weather data


## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14+)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Firebase](https://firebase.google.com/) account
- Required API keys:
  - VITE_FIREBASE_API_KEY
  - VITE_MAPBOX_ACCESS_TOKEN (Mapbox)
  - VITE_THE_MOVIE_DB_API_KEY

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/geocoding_tool.git
cd geocoding_tool
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
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:3000` to view the application.


