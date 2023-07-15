import { v4 as uuidv4 } from "uuid";
import { isNumber } from "./helpers";
import { httpsCallable, getFunctions } from "firebase/functions";

const { VITE_FIREBASE_API_KEY, VITE_ACCESS_TOKEN, VITE_NODE_ENV } = import.meta.env;
export const functions = getFunctions();

export const covertAddressToLatLng = async (address) => {
  let location = encodeURIComponent(address);
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${VITE_ACCESS_TOKEN}`,
    { method: "GET" }
  );

  if (response.status !== 200) {
    return;
  }
  const data = await response.json();

  return data;
};
export const fetchAutocomplete = async (address) => {
  const localStorageData = JSON.parse(localStorage.getItem("uidData") || "{}");
  let uid = localStorageData.uid || "";
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
  )}&language=en&limit=3&session_token=${uid}&access_token=${VITE_ACCESS_TOKEN}`;

  const response = await fetch(myQuery, { method: "GET" });

  if (response.status !== 200) {
    return;
  }

  // Save uid data to localStorage
  localStorage.setItem(
    "uidData",
    JSON.stringify({
      uid: uid,
      lastUsedTime: currentTimestamp,
      callCount: callCount + 1,
    })
  );

  const data = await response.json();

  return data;
};

export const retrieveAutocomplete = async (id) => {
  const localStorageData = JSON.parse(localStorage.getItem("uidData") || "{}");
  let uid = localStorageData.uid || "";
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

  const myQuery = `https://api.mapbox.com/search/searchbox/v1/retrieve/${id}?session_token=${uid}&access_token=${VITE_ACCESS_TOKEN}`;

  const response = await fetch(myQuery, { method: "GET" });

  if (response.status !== 200) {
    return;
  }

  // Save uid data to localStorage
  localStorage.setItem(
    "uidData",
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
    { method: "GET" }
  );

  if (response.status !== 200) {
    return;
  }
  const data = await response.json();
  if (data.code === "NoRoute") {
    return;
  }

  return data;
};
export const convertLatLngToAddress = async (lat, lng) => {
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${VITE_ACCESS_TOKEN}`,
    { method: "GET" }
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
    d = "X";
  let latDms = getLat(lat, a, b, c, d);
  let lngDms = getLng(lng, a, b, c, d);
  let output = {
    lat: latDms,
    lng: lngDms,
  };
  return output;
  function getLat(lat, a, b, c, d) {
    let e = !0;
    d = e && 0 > lat ? "S" : !e && 0 > lat ? "W" : e ? "a" : "E";
    d = Math.abs(lat);
    a = Math.floor(d);
    c = 3600 * (d - a);
    b = Math.floor(c / 60);
    c = Math.round(1e4 * (c - 60 * b)) / 1e4;
    let displayA = Number.isInteger(a) ? a : a.toFixed(2);
    let displayB = Number.isInteger(b) ? b : b.toFixed(2);
    let displayC = Number.isInteger(c) ? c : c.toFixed(2);
    let display = displayA + "° " + displayB + "' " + displayC + "''";

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
    d = e && 0 > lng ? "S" : !e && 0 > lng ? "W" : e ? "a" : "E";
    d = Math.abs(lng);
    a = Math.floor(d);
    c = 3600 * (d - a);
    b = Math.floor(c / 60);
    c = Math.round(1e4 * (c - 60 * b)) / 1e4;
    let displayA = Number.isInteger(a) ? a : a.toFixed(2);
    let displayB = Number.isInteger(b) ? b : b.toFixed(2);
    let displayC = Number.isInteger(c) ? c : c.toFixed(2);
    let display = displayA + "° " + displayB + "' " + displayC + "''";
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
  isNumber(i) || (i = 0),
    isNumber(m) || (m = 0),
    isNumber(r) || (r = 0),
    t && ((m = -1 * m), (r = -1 * r));
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
    const urlStartPoint =
      VITE_NODE_ENV === "development" ? "/google-api" : "https://maps.googleapis.com/maps/api";
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
    const urlStartPoint =
      VITE_NODE_ENV === "development" ? "/google-api" : "https://maps.googleapis.com/maps/api";
    const placeSearchUrl = `${urlStartPoint}/place/nearbysearch/json?location=${latitude},${longitude}&radius=500&key=${apiKey}`;
    const placeSearchResponse = await fetch(placeSearchUrl);
    const placeSearchData = await placeSearchResponse.json();

    // Check if there are photos available
    if (!placeSearchData || !placeSearchData.results[0] || !placeSearchData.results[0].photos) {
      const addressQuery =
        city && state
          ? `${city}, ${state}`
          : city && !state
          ? `${city}`
          : state && !city
          ? `${state}`
          : null;
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

export function extractCityAndState(jsonObject) {
  let cityName = null;
  let stateName = null;

  // Iterate through the features array
  for (const feature of jsonObject.features) {
    // Check if the feature is a city
    if (feature.place_type.includes("place")) {
      cityName = feature.text;
    }

    // Check if the feature is a state
    if (feature.place_type.includes("region")) {
      stateName = feature.text;
    }

    // Break the loop if both city and state are found
    if (cityName && stateName) {
      break;
    }
  }

  return {
    city: cityName,
    state: stateName,
  };
}

export async function getAddress(lat, lon) {
  const getLatLonData = httpsCallable(functions, "getAddress");
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
      console.error("There was an error when calling the Cloud Function", error);
      window.alert(
        "There was an error when calling the Cloud Function:\n\nError Code: " +
          code +
          "\nError Message:" +
          message +
          "\nError Details:" +
          details
      );
    });
}
export async function getPlacePhoto(data) {
  const getPlacePhotoData = httpsCallable(functions, "getPlacePhotoData");
  return getPlacePhotoData(data)
    .then(function (result) {
      return result;
    })
    .catch(function (error) {
      // Getting the Error details.
      let code = error.code;
      let message = error.message;
      let details = error.details;
      console.error("There was an error when calling the Cloud Function", error);
      window.alert(
        "There was an error when calling the Cloud Function:\n\nError Code: " +
          code +
          "\nError Message:" +
          message +
          "\nError Details:" +
          details
      );
    });
}
