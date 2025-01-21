# 🌍 geocoder 
A powerful geospatial toolkit built with React and Firebase that helps you convert geographic coordinates, bookmark locations, plan journeys, and explore famous movie filming locations

🚀 **[Live Demo](https://geocoder-react.netlify.app/)**

![Demo](demo.gif)

## ✨ Features

- 🗺️ **Geospatial Data Conversion**
  - Convert addresses to latitude/longitude coordinates
  - Reverse geocode coordinates to addresses
  - Transform addresses to DMS (Degrees, Minutes, Seconds)
  - Convert latitude/longitude to DMS format
- 📍 **Location Management**
  - Bookmark locations with a single click
  - Organize and manage your saved locations
- 🚗 **Journey Planning**
  - Get real-time weather updates for start and end points
  - Calculate precise distances between locations
  - View estimated travel times and routes
- 🎬 **Movie Location Explorer**
  - Discover and explore real filming locations from popular movies
  - Interactive map interface with location details

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Required API Keys
Create accounts and obtain API keys from:
- [Firebase](https://firebase.google.com/) - Authentication and database
- [TheMovieDB](https://developer.themoviedb.org/docs/getting-started) - Movie data
- [OpenWeather](https://openweathermap.org/api) - Weather information
- [Mapbox](https://www.mapbox.com/) - Geocoding and mapping services

### Environment Variables
Create a `.env` file in the root directory:
```bash
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_THE_MOVIE_DB_API_KEY=your_moviedb_key
VITE_OPEN_WEATHER_API_KEY=your_openweather_key
VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_token
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/alogan5201/geocoder.git
cd geocoder
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Deployment

1. Create a production build:
```bash
npm run build
# or
yarn build
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [React.js](https://react.dev/)
- [Firebase](https://firebase.google.com/docs)
- [Material UI](https://mui.com/material-ui/getting-started/)
- [Leaflet](https://leafletjs.com/reference.html) and [React Leaflet](https://react-leaflet.js.org/)  
- [Zustand](https://docs.pmnd.rs/)
- [OpenWeather](https://openweathermap.org/api)
- [TheMovieDB](https://developer.themoviedb.org/docs)
- [Mapbox](https://www.mapbox.com/)

