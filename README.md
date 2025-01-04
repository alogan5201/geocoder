# 🌍 geocoder 
Built with React and Firebase, geocoder is a tool for converting geographic data, bookmarking locations, exploring movie locations, and more!

🚀 **[Live Demo](https://movielatlong.com/)**

![Demo](demo.gif)

## 🎯 Motivation

The motivation to build geocoder emerged from a deep fascination with geospatial technology and how it can be used to solve real-world problems. After being inspired by the [MapScaping](https://www.mapscaping.com/) podcast and seeing the growing importance of location-based services, I recognized an opportunity to create a tool that simplifies geographic data handling.

### ✨ Features

- 🗺️ **Convert an address to latitude/longitude and vice versa**

- 🎬 **Explore movie locations with an interactive web map**

- 📍 **Bookmark favorite locations**

### Prerequisites
- [Node.js](https://nodejs.org/) version 14 or higher
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Firebase](https://firebase.google.com/) account
- Required API keys:
  - VITE_FIREBASE_API_KEY ([Firebase](https://firebase.google.com/))
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

- [React.js](https://react.dev/)
- [Firebase](https://firebase.google.com/docs)
- [Material UI](https://mui.com/material-ui/getting-started/)
- [Leaflet](https://leafletjs.com/reference.html) and [React Leaflet](https://react-leaflet.js.org/)  
- [Zustand](https://docs.pmnd.rs/)
- [OpenWeather](https://openweathermap.org/api)
- [TheMovieDB](https://developer.themoviedb.org/docs)

