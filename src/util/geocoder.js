/* eslint-disable no-console */
// geocoder.js
import { httpsCallable, connectFunctionsEmulator } from 'firebase/functions';
import { functions } from './firebase';
const { VITE_FIREBASE_API_KEY, VITE_ACCESS_TOKEN } = import.meta.env;
const MAPBOX_API_BASE_URL = 'https://api.mapbox.com';

export async function fetchAPI(url) {
  const response = await fetch(url, { method: 'GET' });
  return response.status === 200 ? response.json() : null;
}
/* ---------------------------- Mapbox functions ---------------------------- */

export const covertAddressToLatLng = async (address) =>
  fetchAPI(
    `${MAPBOX_API_BASE_URL}/geocoding/v5/mapbox.places/${encodeURIComponent(
      address
    )}.json?proximity=ip&access_token=${VITE_ACCESS_TOKEN}`
  );

export const getDirections = async (from, to) => {
  const data = await fetchAPI(
    `${MAPBOX_API_BASE_URL}/directions/v5/mapbox/driving/${from.lng},${from.lat};${to.lng},${to.lat}?geometries=geojson&access_token=${VITE_ACCESS_TOKEN}`
  );
  return data && data.code !== 'NoRoute' ? data : null;
};

export const convertLatLngToAddress = async (lat, lng) =>
  fetchAPI(`${MAPBOX_API_BASE_URL}/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${VITE_ACCESS_TOKEN}`);



/* ----------------------- Firebase / Google functions ---------------------- */
export async function getAddress(lat, lon) {
  try {
    const getLatLonData = httpsCallable(functions, 'getAddress');
    return await getLatLonData({ lat: lat, lon: lon });
  } catch (error) {
    console.error('Failed to get the address of the coordinates', error);
    return null;
  }
}

export async function getPlacePhoto(lat, lon) {
  try {
    const getPlacePhotoData = httpsCallable(functions, 'getPlacePhoto');
    return await getPlacePhotoData({ lat: lat, lon: lon });
  } catch (error) {
    console.error('Failed to get the photo of the place', error);
    return null;
  }
}

export async function getCitiesStartWith(startsWith, limit = 5) {
    connectFunctionsEmulator(functions, 'localhost', 5001);

    try {
    const getCities = httpsCallable(functions, 'getCitiesStartWith');
       const results = await getCities({ startsWith: startsWith, limit });
       console.log("🚀 ~ getCitiesStartWith ~ results:", results)
      
      return results.data;        
/*     const citiesRef = ref(database, 'cities');
    const cityQuery = query(
      citiesRef,
      orderByKey(),
      startAt(startsWith),
      endAt(`${startsWith}\uf8ff`),
      limitToFirst(limit)
    );
    const snapshot = await get(cityQuery);
    return snapshot.exists() ? snapshot.val() : {}; */
  } catch (error) {
    console.error('Failed to get the cities starting with a specific string', error);
    return {};
  }
}
export async function getCityPhoto(cityName) {
  const urlStartPoint = 'https://maps.googleapis.com/maps/api';
  const placeSearchUrl = `${urlStartPoint}/place/findplacefromtext/json?input=${encodeURIComponent(
    cityName
  )}&inputtype=textquery&fields=photos&key=${VITE_FIREBASE_API_KEY}`;

  try {
    const placeSearchData = await fetchAPI(placeSearchUrl);
    const photoReference = placeSearchData?.candidates[0].photos[0].photo_reference;
    return photoReference
      ? `${urlStartPoint}/place/photo?maxwidth=400&photoreference=${photoReference}&key=${VITE_FIREBASE_API_KEY}`
      : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getPhotoByCoordinates(latitude, longitude, city, state) {
  const urlStartPoint = 'https://maps.googleapis.com/maps/api';
  const placeSearchUrl = `${urlStartPoint}/place/nearbysearch/json?location=${latitude},${longitude}&radius=500&key=${VITE_FIREBASE_API_KEY}`;
  try {
    const placeSearchData = await fetchAPI(placeSearchUrl);
    const photoReference = placeSearchData?.results[0].photos[0].photo_reference;
    if (photoReference) {
      return `${urlStartPoint}/place/photo?maxwidth=400&photoreference=${photoReference}&key=${VITE_FIREBASE_API_KEY}`;
    }
    const addressQuery =
      city && state ? `${city}, ${state}` : city && !state ? `${city}` : state && !city ? `${state}` : null;
    return addressQuery ? await getCityPhoto(addressQuery) : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
/* -------------------------- Conversion functions -------------------------- */
export function convertLatLngToDMS(lat, lng) {
  const formatDMSCoord = (coord) => {
    const absCoord = Math.abs(coord);
    const degrees = Math.floor(absCoord);
    const tempMin = 3600 * (absCoord - degrees);
    const minutes = Math.floor(tempMin / 60);
    const seconds = Math.round((tempMin - 60 * minutes) * 1e4) / 1e4;
    const displayDegrees = Number.isInteger(degrees) ? degrees : degrees.toFixed(2);
    const displayMinutes = Number.isInteger(minutes) ? minutes : minutes.toFixed(2);
    const displaySeconds = Number.isInteger(seconds) ? seconds : seconds.toFixed(2);
    const display = `${displayDegrees}° ${displayMinutes}' ${displaySeconds}''`;
    return { degrees, minutes, seconds, coord: absCoord, display };
  };

  return {
    lat: formatDMSCoord(lat, false),
    lng: formatDMSCoord(lng, true),
  };
}

export function convertDMStoLatLng(dms) {
  const calculateCoord = (degrees, minutes, seconds) =>
    parseFloat((degrees + minutes / 60 + seconds / 3600).toFixed(8));
  return [
    calculateCoord(dms.lat.degrees, dms.lat.minutes, dms.lat.seconds),
    calculateCoord(dms.lng.degrees, dms.lng.minutes, dms.lng.seconds),
  ];
}
/* --------------------------------- Helpers -------------------------------- */

export const metersToMiles = (meters) => meters * 0.000621371;

export function extractCityAndState(jsonObject) {
  let cityName = null;
  let stateName = null;
  jsonObject.features.forEach((feature) => {
    if (feature.place_type.includes('place')) cityName = feature.text;
    if (feature.place_type.includes('region')) stateName = feature.text;
  });
  return { city: cityName, state: stateName };
}



export function isCityCapital(cityName, stateData) {
  return stateData.some((state) => state.capital === cityName);
}

export function reorderOrReplaceCityCapitalObjects(cities, capitals, visitedCapitals) {
  return cities.map((city) => {
    if (isCityCapital(city.name, capitals) && !visitedCapitals.includes(city.name)) {
      const cityCopy = { ...city };
      cityCopy.isCapital = true;
      return cityCopy;
    }
    return city;
  });
}
