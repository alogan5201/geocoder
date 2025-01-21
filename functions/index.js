/* eslint-disable */
/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use-scrict';
require('dotenv').config();
// geotools-bc75a-a690ac1866bf.json
const functions = require('firebase-functions');
const sanitizer = require('./sanitizer');
const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors')({ origin: true });

//const cors = require("cors")({origin: true});

const fetch = require('node-fetch');
const mapboxToken = process.env.MAPBOX_TOKEN;
const G_API_KEY = process.env.G_API_KEY;
// Imports the Secret Manager library

// Instantiates a client
// Fetch the service account key JSON file contents
const serviceAccount = require('./geotools-bc75a-firebase-adminsdk-ju941-2ae2ddfc95.json');

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://geotools-bc75a-f6011.firebaseio.com',
});

// As an admin, the app has access to read and write all data, regardless of Security Rules

const uppercaseFirst = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

async function getCitiesStartWith(startsWith, limit = 5) {
  try {
    // eslint-disable-next-line no-undef
    const db = admin.database();
    const ref = db.ref('cities');
    // eslint-disable-next-line no-undef
    const upperCaseFirst = uppercaseFirst(startsWith);
    const snapshot = await ref.orderByKey().startAt(upperCaseFirst).limitToFirst(limit).once('value');
    
 return snapshot.exists() ? snapshot.val() : {};

  } catch (error) {
    console.error('Failed to get the cities starting with a specific string', error);
    return {};
  }
}
exports.fetchMoviesInRange = functions.https.onCall(async (data, context) => {
  const start = data.start;
  const end = data.end;

  // Access Firestore through Firebase Admin SDK
  const db = admin.firestore();

  // Create a query against the collection
  const moviesCollection = db.collection('films');
  const snapshot = await moviesCollection.where('index', '>=', start).where('index', '<=', end).get();

  const movies = snapshot.docs.map((doc) => doc.data());

  return movies;
});
exports.getMoviesWithSlug = functions.https.onCall(async (data, context) => {
  const db = admin.firestore();
  const slug = data.slug;
  if (!slug) {
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with one argument "slug"');
  }

  const moviesCollection = db.collection('films');
  const q = moviesCollection.where('slug', '==', slug);
  const querySnapshot = await q.get();

  let results = [];
  querySnapshot.forEach((doc) => {
    results.push(doc.data());
  });
  return results;
});
exports.getCitiesStartWith = functions.https.onCall((data) => {
        const result = getCitiesStartWith(data.startsWith, data.limit);
        return result;
  
});
exports.wakeUp = functions.https.onCall(() => {
        return true;
  
});
async function fetchAddress(lat, lon) {
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?access_token=${mapboxToken}`,
    { method: 'GET' }
  );
  if (response.status !== 200) {
    return;
  }
  const data = await response.json();

  return data;
}
async function fetchLatLon(city) {
  const cityQuery = encodeURIComponent(city);
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityQuery}.json?access_token=${mapboxToken}`,
    { method: 'GET' }
  );
  if (response.status !== 200) {2
    return;
  }

  const data = await response.json();

  return data;
  // WARNING: Do not print the secret in a production environment - this
  // snippet is showing how to access the secret material.
}
async function fetchElevation(lat, lon) {
  const response = await fetch(
    `https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/${lon},${lat}.json?layers=contour&limit=50&access_token=${mapboxToken}`,
    { method: 'GET' }
  );
  if (response.status !== 200) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'The function must be called with ' + 'two arguments firstnumber and secondNumber which must both be numbers.'
    );
  }

  const data = await response.json();

  return data;
  // WARNING: Do not print the secret in a production environment - this
  // snippet is showing how to access the secret material.
}
async function fetchMatrix(first, second) {
  const response = await fetch(
    `https://api.mapbox.com/directions-matrix/v1/mapbox/driving/${first};${second}?&access_token=${mapboxToken}`,
    { method: 'GET' }
  );
  if (response.status !== 200) {
    console.log(response.status);
    return;
  }
  const data = await response.json();
  console.info(data);
  return data;
}

exports.getMatrix = functions.https.onCall((data) => {
  const first = data.first;
  const second = data.second;
  const result = fetchMatrix(first, second);

  return result;
  // [END returnAddData]
});
exports.getElevation = functions.https.onCall((data) => {
  const lat = data.lat;
  const lon = data.lon;
  const result = fetchElevation(lat, lon);
  return result;
  // [END returnAddData]
});
exports.getAddress = functions.https.onCall((data) => {
  const lat = data.lat;
  const lon = data.lon;
  const result = fetchAddress(lat, lon);

  return result;
  // [END returnAddData]
});

async function getCityPhoto(cityName) {
  try {
    const placeSearchUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
      cityName
    )}&inputtype=textquery&fields=photos&key=${G_API_KEY}`;
    const placeSearchResponse = await fetch(placeSearchUrl);
    const placeSearchData = await placeSearchResponse.json();

    const photoReference = placeSearchData.candidates[0].photos[0].photo_reference;
    const maxwidth = 400;
    const placePhotoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxwidth}&photoreference=${photoReference}&key=${G_API_KEY}`;

    return placePhotoUrl;
  } catch (error) {
    return null;
  }
}

async function getPhotoByCoordinates(latitude, longitude, city, state) {
  try {
    const placeSearchUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=500&key=${G_API_KEY}`;
    const placeSearchResponse = await fetch(placeSearchUrl);
    const placeSearchData = await placeSearchResponse.json();

    if (!placeSearchData || !placeSearchData.results[0] || !placeSearchData.results[0].photos) {
      const addressQuery = city && state ? `${city}, ${state}` : city ? `${city}` : state ? `${state}` : null;
      if (addressQuery) {
        const addressPhoto = await getCityPhoto(addressQuery);
        return addressPhoto;
      }
      return null;
    }

    const photoReference = placeSearchData.results[0].photos[0].photo_reference;
    const maxwidth = 400;
    const placePhotoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxwidth}&photoreference=${photoReference}&key=${G_API_KEY}`;

    return placePhotoUrl;
  } catch (error) {
    return null;
  }
}
exports.getPlacePhotoData = functions.https.onCall((data) => {
  
  const lat = data.latitude;
  const lon = data.longitude;
  const city = data.city;
  const state = data.state;
  const result = getPhotoByCoordinates(lat, lon, city, state);

  return result;
  // [END returnAddData]
});

exports.getLatLon = functions.https.onCall((data) => {
  const city = data.city;
  const result = fetchLatLon(city);

  return result;
  // [END returnAddData]
});
// [START allAdd]
// [START addFunctionTrigger]
// Adds two numbers to each other.
exports.addNumbers = functions.https.onCall((data) => {
  // [END addFunctionTrigger]
  // [START readAddData]
  // Numbers passed from the client.
  const firstNumber = data.firstNumber;
  const secondNumber = data.secondNumber;
  // [END readAddData]

  // [START addHttpsError]
  // Checking that attributes are present and are numbers.
  if (!Number.isFinite(firstNumber) || !Number.isFinite(secondNumber)) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError(
      'invalid-argument',
      'The function must be called with ' + 'two arguments firstnumber and secondNumber which must both be numbers.'
    );
  }
  // [END addHttpsError]

  // [START returnAddData]
  // returning result.
  return {
    firstNumber: firstNumber,
    secondNumber: secondNumber,
    operator: '+',
    operationResult: firstNumber + secondNumber,
  };
  // [END returnAddData]
});
// [START allAdd]
// [START addFunctionTrigger]
// Adds two numbers to each other.
exports.addNumbers = functions.https.onCall((data) => {
  // [END addFunctionTrigger]
  // [START readAddData]
  // Numbers passed from the client.
  const firstNumber = data.firstNumber;
  const secondNumber = data.secondNumber;
  // [END readAddData]

  // [START addHttpsError]
  // Checking that attributes are present and are numbers.
  if (!Number.isFinite(firstNumber) || !Number.isFinite(secondNumber)) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError(
      'invalid-argument',
      'The function must be called with ' + "two arguments 'firstNumber' and 'secondNumber' which must both be numbers."
    );
  }
  // [END addHttpsError]

  // [START returnAddData]
  // returning result.
  return {
    firstNumber: firstNumber,
    secondNumber: secondNumber,
    operator: '+',
    operationResult: firstNumber + secondNumber,
  };
  // [END returnAddData]
});
// [END allAdd]

// [START messageFunctionTrigger]
// Saves a message to the Firebase Realtime Database but sanitizes the text by removing swearwords.

exports.addComment = functions.https.onCall((data) => {
  const text = data.text;
  const name = data.name;
  const uid = data.uid;
  const documentId = uuidv4();

  if (!(typeof text === 'string') || text.length === 0) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError(
      'invalid-argument',
      'The function must be called with ' + "one arguments 'text' containing the message text to add."
    );
  }

  // [END authIntegration]

  // [START returnMessageAsync]
  // Saving the new message to the Realtime Database.
  // Sanitize the message.

  const sanitizedName = sanitizer.sanitizeText(name);

  const sanitizedMessage = sanitizer.sanitizeText(text); // Sanitize the message.
  return {
    text: sanitizedMessage,
    name: sanitizedName,
    uid: uid,
    id: documentId,
  };
  // [END_EXCLUDE]
});
// [END messageFunctionTrigger]
