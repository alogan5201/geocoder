import { endAt, get, limitToFirst, orderByKey, query, ref, startAt } from 'firebase/database';
import { httpsCallable } from 'firebase/functions';
import { v4 as uuidv4 } from 'uuid';
import { database, functions } from './firebase';
import { isNumber } from './helpers';
const { VITE_FIREBASE_API_KEY, VITE_ACCESS_TOKEN, VITE_NODE_ENV } = import.meta.env;

export const covertAddressToLatLng = async (address) => {
  let location = encodeURIComponent(address);
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${VITE_ACCESS_TOKEN}`,
    { method: 'GET' }
  );

  if (response.status !== 200) {
    return;
  }
  const data = await response.json();

  return data;
};

/* export const fetchAutocomplete = async (address) => {
    const localStorageData = JSON.parse(localStorage.getItem('uidData') || '{}');
    let uid = localStorageData.uid || '';
    let lastUsedTime = localStorageData.lastUsedTime || 0;
    let callCount = localStorageData.callCount || 0;
    const currentTimestamp = Date.now();
    // Check if uid can be reused
    const canReuseUid =
        (callCount < 50 && uid) || // Less than 50 successive calls without /retrieve
        currentTimestamp - lastUsedTime < 60 * 60 * 1000; // Less than 60 minutes since last call without /retrieve

    if (!canReuseUid) {
        uid = uuidv4();
        callCount = 0;
    }

    const myQuery = `https://api.mapbox.com/search/searchbox/v1/suggest?q=${encodeURIComponent(
        address
    )}&access_token=${VITE_ACCESS_TOKEN}&session_token=${uid}&language=en&country=US&limit=3&types=country%2Cregion%2Cdistrict%2Caddress%2Cstreet%2Cpostcode%2Clocality%2Cplace%2Cneighborhood%2Cpoi%2Ccategory&proximity=-98%2C%2040`;

    const response = await fetch(myQuery);

    if (response.status !== 200) {
        return;
    }

    // Save uid data to localStorage
    localStorage.setItem(
        'uidData',
        JSON.stringify({
            uid: uid,
            lastUsedTime: currentTimestamp,
            callCount: callCount + 1,
        })
    );

    const data = await response.json();

    return data;
}; */

export const retrieveAutocomplete = async (id) => {
  const localStorageData = JSON.parse(localStorage.getItem('uidData') || '{}');
  let uid = localStorageData.uid || '';
  let lastUsedTime = localStorageData.lastUsedTime || 0;
  let callCount = localStorageData.callCount || 0;
  const currentTimestamp = Date.now();

  // Check if uid can be reused
  const canReuseUid =
    (callCount < 50 && uid) || // Less than 50 successive calls without /retrieve
    currentTimestamp - lastUsedTime < 60 * 60 * 1000; // Less than 60 minutes since last call without /retrieve

  if (!canReuseUid) {
    uid = uuidv4();
    callCount = 0;
  }
  // "https://api.mapbox.com/search/searchbox/v1/retrieve/${id}?session_token=${uid}&access_token=${VITE_ACCESS_TOKEN}"
  const myQuery = `https://api.mapbox.com/search/searchbox/v1/retrieve/${id}?session_token=${uid}&access_token=${VITE_ACCESS_TOKEN}`;

  const response = await fetch(myQuery, { method: 'GET' });

  if (response.status !== 200) {
    return;
  }

  // Save uid data to localStorage
  localStorage.setItem(
    'uidData',
    JSON.stringify({
      uid: uid,
      lastUsedTime: currentTimestamp,
      callCount: callCount + 1,
    })
  );

  const data = await response.json();

  return data;
};
export const getDirections = async (from, to) => {
  const response = await fetch(
    `https://api.mapbox.com/directions/v5/mapbox/driving/${from.lng},${from.lat};${to.lng},${to.lat}?geometries=geojson&access_token=${VITE_ACCESS_TOKEN}`,
    { method: 'GET' }
  );

  if (response.status !== 200) {
    return;
  }
  const data = await response.json();
  if (data.code === 'NoRoute') {
    return;
  }

  return data;
};
export const convertLatLngToAddress = async (lat, lng) => {
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${VITE_ACCESS_TOKEN}`,
    { method: 'GET' }
  );

  if (response.status !== 200) {
    return;
  }
  const data = await response.json();

  return data;
};

export function convertLatLngToDMS(lat, lng) {
  let a = 0,
    b = 0,
    c = 0,
    d = 'X';
  let latDms = getLat(lat, a, b, c, d);
  let lngDms = getLng(lng, a, b, c, d);
  let output = {
    lat: latDms,
    lng: lngDms,
  };
  return output;
  function getLat(lat, a, b, c, d) {
    let e = !0;
    d = e && 0 > lat ? 'S' : !e && 0 > lat ? 'W' : e ? 'a' : 'E';
    d = Math.abs(lat);
    a = Math.floor(d);
    c = 3600 * (d - a);
    b = Math.floor(c / 60);
    c = Math.round(1e4 * (c - 60 * b)) / 1e4;
    let displayA = Number.isInteger(a) ? a : a.toFixed(2);
    let displayB = Number.isInteger(b) ? b : b.toFixed(2);
    let displayC = Number.isInteger(c) ? c : c.toFixed(2);
    let display = displayA + '° ' + displayB + "' " + displayC + "''";

    let latOutput = {
      degrees: a,
      minutes: b,
      seconds: c,
      lat: d,
      display: display,
    };

    return latOutput;
  }
  function getLng(lng, a, b, c, d) {
    let e = !1;
    d = e && 0 > lng ? 'S' : !e && 0 > lng ? 'W' : e ? 'a' : 'E';
    d = Math.abs(lng);
    a = Math.floor(d);
    c = 3600 * (d - a);
    b = Math.floor(c / 60);
    c = Math.round(1e4 * (c - 60 * b)) / 1e4;
    let displayA = Number.isInteger(a) ? a : a.toFixed(2);
    let displayB = Number.isInteger(b) ? b : b.toFixed(2);
    let displayC = Number.isInteger(c) ? c : c.toFixed(2);
    let display = displayA + '° ' + displayB + "' " + displayC + "''";
    let lngOutput = {
      degrees: a,
      minutes: b,
      seconds: c,
      lng: d,
      display: display,
    };
    return lngOutput;
  }
}

export function convertDMStoLatLng(dms) {
  var t = !1,
    n = dms.lat.degrees;
  0 > n && (t = !0);
  var o = Math.abs(dms.lat.minutes),
    a = Math.abs(dms.lat.seconds);
  t && ((o = -1 * o), (a = -1 * a));
  var l = n + o / 60 + a / 3600;
  let lat = parseFloat(l).toFixed(8);
  var i = dms.lng.degrees;
  0 > i && (t = !0);
  var m = Math.abs(dms.lng.minutes),
    r = Math.abs(dms.lng.secondss);
  isNumber(i) || (i = 0), isNumber(m) || (m = 0), isNumber(r) || (r = 0), t && ((m = -1 * m), (r = -1 * r));
  var d = i + m / 60 + r / 3600;
  let lng = parseFloat(d).toFixed(8);

  return [lat, lng];
}
// [ "33° 44' 56.3712'' 33.748992", "84° 23' 24.9504'' 84.390264" ]

export const toggleLocation = (markerData, L) => {
  const locationControl = L.control;

  for (let index = 0; index < markerData.length; index++) {
    const element = markerData[index];
    if (element.userLocation === false) {
      locationControl.stop();
    }
  }
};

export async function getCityPhoto(cityName) {
  const apiKey = VITE_FIREBASE_API_KEY;
  try {
    // Step 1: Search for the city and retrieve a photo_reference
    const urlStartPoint = VITE_NODE_ENV === 'development' ? '/google-api' : 'https://maps.googleapis.com/maps/api';
    const placeSearchUrl = `${urlStartPoint}/place/findplacefromtext/json?input=${encodeURIComponent(
      cityName
    )}&inputtype=textquery&fields=photos&key=${apiKey}`;
    const placeSearchResponse = await fetch(placeSearchUrl);
    const placeSearchData = await placeSearchResponse.json();

    const photoReference = placeSearchData.candidates[0].photos[0].photo_reference;

    // Step 2: Use the photo_reference to retrieve the image URL
    const maxwidth = 400; // You can set this to the desired image width
    const placePhotoUrl = `${urlStartPoint}/place/photo?maxwidth=${maxwidth}&photoreference=${photoReference}&key=${apiKey}`;

    // placePhotoUrl is the URL of the image. You can use it directly in an <img> element.
    return placePhotoUrl;
  } catch (error) {
    return null;
  }
}

export async function getPhotoByCoordinates(latitude, longitude, city, state) {
  const apiKey = VITE_FIREBASE_API_KEY;
  try {
    // Step 1: Search for the places near the given coordinates and retrieve a photo_reference
    // https://maps.googleapis.com/maps/api/place/photo?parameters
    const urlStartPoint = VITE_NODE_ENV === 'development' ? '/google-api' : 'https://maps.googleapis.com/maps/api';
    const placeSearchUrl = `${urlStartPoint}/place/nearbysearch/json?location=${latitude},${longitude}&radius=500&key=${apiKey}`;
    const placeSearchResponse = await fetch(placeSearchUrl);
    const placeSearchData = await placeSearchResponse.json();

    // Check if there are photos available
    if (!placeSearchData || !placeSearchData.results[0] || !placeSearchData.results[0].photos) {
      const addressQuery =
        city && state ? `${city}, ${state}` : city && !state ? `${city}` : state && !city ? `${state}` : null;
      if (addressQuery) {
        const addressPhoto = await getCityPhoto(addressQuery);

        return addressPhoto;
      }
      //const addressPhoto = await getCityPhoto(extractCityAndState(address));
      //
      return null;
    }

    const photoReference = placeSearchData.results[0].photos[0].photo_reference;

    // Step 2: Use the photo_reference to retrieve the image URL
    const maxwidth = 400; // You can set this to the desired image width
    const placePhotoUrl = `${urlStartPoint}/place/photo?maxwidth=${maxwidth}&photoreference=${photoReference}&key=${apiKey}`;

    // placePhotoUrl is the URL of the image. You can use it directly in an <img> element.
    return placePhotoUrl;
  } catch (error) {
    return null;
  }
}

export function metersToMiles(meters) {
  const milesPerMeter = 0.000621371;
  return meters * milesPerMeter;
}

export function extractCityAndState(data) {
  let results = [];

  for (let feature of data.features) {
    let cityStateObj = {};

    for (let context of feature.context) {
      if (context.short_code && context.short_code.includes('US-')) {
        cityStateObj['state'] = context.text;
      } else if (context.id.includes('place.')) {
        cityStateObj['city'] = context.text;
      }

      // If both city and state are found, break the loop
      if (cityStateObj.city && cityStateObj.state) {
        results.push(cityStateObj);
        return results[0];
      }
    }
  }

  return results[0];
}

export async function getAddress(lat, lon) {
  const getLatLonData = httpsCallable(functions, 'getAddress');
  return getLatLonData({
    lat: lat,
    lon: lon,
  })
    .then(function (result) {
      return result;
    })
    .catch(function (error) {
      // Getting the Error details.
      let code = error.code;
      let message = error.message;
      let details = error.details;
      console.error('There was an error when calling the Cloud Function', error);
      window.alert(
        'There was an error when calling the Cloud Function:\n\nError Code: ' +
          code +
          '\nError Message:' +
          message +
          '\nError Details:' +
          details
      );
    });
}
export async function getPlacePhoto(data) {
  const getPlacePhotoData = httpsCallable(functions, 'getPlacePhotoData');
  return getPlacePhotoData(data)
    .then(function (result) {
      return result;
    })
    .catch(function (error) {
      // Getting the Error details.
      let code = error.code;
      let message = error.message;
      let details = error.details;
      console.error('There was an error when calling the Cloud Function', error);
      window.alert(
        'There was an error when calling the Cloud Function:\n\nError Code: ' +
          code +
          '\nError Message:' +
          message +
          '\nError Details:' +
          details
      );
    });
}

export const fetchAutocomplete = async (address) => {
  const localStorageData = JSON.parse(localStorage.getItem('uidData') || '{}');
  let uid = localStorageData.uid || '';
  let lastUsedTime = localStorageData.lastUsedTime || 0;
  let callCount = localStorageData.callCount || 0;
  const currentTimestamp = Date.now();
  // Check if uid can be reused
  const canReuseUid =
    (callCount < 50 && uid) || // Less than 50 successive calls without /retrieve
    currentTimestamp - lastUsedTime < 60 * 60 * 1000; // Less than 60 minutes since last call without /retrieve

  if (!canReuseUid) {
    uid = uuidv4();
    callCount = 0;
  }

  const myQuery = `https://api.mapbox.com/search/searchbox/v1/suggest?q=${encodeURIComponent(
    address
  )}&access_token=${VITE_ACCESS_TOKEN}&session_token=${uid}&language=en&country=US&limit=3&types=country%2Cregion%2Cdistrict%2Caddress%2Cstreet%2Cpostcode%2Clocality%2Cplace%2Cneighborhood%2Cpoi%2Ccategory&proximity=-98%2C%2040`;

  const response = await fetch(myQuery);

  if (response.status !== 200) {
    return;
  }

  // Save uid data to localStorage
  localStorage.setItem(
    'uidData',
    JSON.stringify({
      uid: uid,
      lastUsedTime: currentTimestamp,
      callCount: callCount + 1,
    })
  );

  const data = await response.json();

  return data;
};

export async function getCitiesStartWith(letter) {
  // Ensure first character is uppercase
  const capitalizedLetter = letter.charAt(0).toUpperCase() + letter.slice(1);
  const formattedInput = letter.charAt(0).toUpperCase() + letter.slice(1).toLowerCase();

  const citiesRef = ref(database, 'cities');
  // Add limitToFirst() to limit results to the first 3
  const citiesQuery = query(
    citiesRef,
    orderByKey(),
    startAt(formattedInput),
    endAt(formattedInput + '\uf8ff'),
    limitToFirst(4)
  );

  try {
    const snapshot = await get(citiesQuery);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
}

export function isCityCapital(input, capitalCities) {
  // Format the input string
  const formattedInput = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();

  // Check each city
  for (let i = 0; i < capitalCities.length; i++) {
    if (capitalCities[i].city.slice(0, 3) === formattedInput) {
      return capitalCities[i];
    }
  }

  // If no match was found, return null
  return null;
}

export function reorderOrReplaceCityCapitalObjects(objects, newObject) {
  // Get the keys
  let keys = Object.keys(objects);

  // Create a new key for the newObject
  let newKey = `${newObject.city}, ${newObject.state}`;

  // Initialize the result object
  let result = {};

  // Try to find the object to move to the front
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    if (objects[key].city === newObject.city && objects[key].state === newObject.state) {
      result[key] = objects[key];
      keys.splice(i, 1); // remove the found key from keys array
      // Add the rest of the objects
      for (let key of keys) {
        result[key] = objects[key];
      }
      return result; // return immediately if duplicate is found
    }
  }

  // If no duplicate is found, replace the first object
  result[newKey] = newObject;
  for (let i = 1; i < keys.length; i++) {
    result[keys[i]] = objects[keys[i]];
  }
  return result;
}
