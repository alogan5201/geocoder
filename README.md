# Geocoding tool

A React application for discovering movie filming locations and exploring geographical coordinates.

## Overview

Enables users to discover filming locations of movies, plan routes, and manage location bookmarks. Built with React and Vite, it features an interactive map interface powered by Leaflet and integrates with multiple APIs for comprehensive location data.

## Features

### Movie Location Discovery
- Browse curated movies with their filming locations
- Interactive map visualization of filming spots
- Detailed movie information with plot summaries and posters
- Location bookmarking for future reference

### Geocoding Tools
- Convert addresses to latitude/longitude coordinates
- Reverse geocoding (coordinates to address)
- Interactive map selection for coordinates
- Location search with autocomplete

### Route Planning
- Calculate distances between locations
- Get real-time weather information
- View route visualization on map
- Direct integration with mapping services

### Location Management
- Save favorite locations with custom notes
- View weather information for saved spots
- Organize locations with tags
- Export location data

## Technology Stack

- **Frontend**: React 18 with Vite
- **UI Framework**: Material-UI (MUI)
- **State Management**: Zustand
- **Maps**: Leaflet/React-Leaflet
- **APIs**: 
  - Mapbox for geocoding
  - TheMovieDB for movie data
  - OpenWeather for weather info
- **Backend**: Firebase

## Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn
- Firebase account
- Required API keys:
  - VITE_FIREBASE_API_KEY
  - VITE_MAPBOX_ACCESS_TOKEN (Mapbox)
  - VITE_THE_MOVIE_DB_API_KEY

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/geocodingtool.git
cd geocodingtool
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

