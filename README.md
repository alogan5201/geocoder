# 🌍 geocoder 
Built with React and Firebase, geocoder is a tool for converting geographic data, bookmarking locations, exploring movie locations, and more!

🚀 **[Live Demo](https://movielatlong.com/)**

![Demo](demo.gif)

### ✨ Features

- 🗺️ **Convert Address to Lat/Long and Lat/Long to Address**

- 📍 **Bookmark favorite locations**

- 🎬 **Explore movie locations on the interactive web map**

- 🚗 **Plan routes and save them to your account**
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

This project was built using the following technologies and resources:

- [React.js](https://react.dev/) for building the UI.
- [Firebase](https://firebase.google.com/docs) for data storage.
- [Material UI](https://mui.com/material-ui/getting-started/) for UI components.
- [Leaflet](https://leafletjs.com/reference.html) and [React Leaflet](https://react-leaflet.js.org/) for interactive maps.
- [Zustand](https://docs.pmnd.rs/) for state management.
- [OpenWeather](https://openweathermap.org/api) for weather data.
- [TheMovieDB](https://developer.themoviedb.org/docs) for movie data.
