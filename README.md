# Geocoding tool

A React application that enables users to discover filming locations of movies, plan routes, and manage location bookmarks. Built with [React](https://react.dev/) and [Vite](https://vitejs.dev/), it features an interactive map interface powered by [Leaflet](https://leafletjs.com/) and integrates with multiple APIs for comprehensive location data.

🚀 **[Live Demo](https://movielatlong.com/)**

![Demo](demo.gif)

## Features

### Location Tools
- Convert addresses to/from coordinates
- Interactive map selection
- Location search with autocomplete
- Route planning with distance calculations
- Real-time weather information

### Movie Location Discovery
- Browse filming locations with interactive maps
- Movie details with plot summaries and posters
- Location bookmarking system
- Direct integration with mapping services

### Data Management
- Save favorite locations with custom notes
- Organize locations with tags
- View weather data for saved spots
- Export location data in multiple formats

## Technology Stack

- **Frontend**: [React 18](https://react.dev/) with [Vite](https://vitejs.dev/)
- **UI Framework**: [Material-UI (MUI)](https://mui.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Maps**: [Leaflet](https://leafletjs.com/)/[React-Leaflet](https://react-leaflet.js.org/)
- **APIs**: 
  - [Mapbox](https://www.mapbox.com/) for geocoding
  - [TheMovieDB](https://www.themoviedb.org/documentation/api) for movie data
  - [OpenWeather](https://openweathermap.org/api) for weather info
- **Backend**: [Firebase](https://firebase.google.com/)

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

## Project Structure

```
src/
├── components/    # Reusable UI components
├── pages/        # Route components
├── layouts/      # Layout templates
├── util/         # Helper functions
├── store/        # Zustand state management
└── hooks/        # Custom React hooks
```

