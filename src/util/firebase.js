
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, get, query, orderByKey, startAt, endAt, limitToFirst } from 'firebase/database';

const { VITE_FIREBASE_API_KEY } = import.meta.env;

const firebaseConfig = {
  apiKey: VITE_FIREBASE_API_KEY,
  authDomain: 'geotools-bc75a.firebaseapp.com',
  databaseURL: 'https://geotools-bc75a-f6011.firebaseio.com',
  projectId: 'geotools-bc75a',
  storageBucket: 'geotools-bc75a.appspot.com',
  messagingSenderId: '106157954659',
  appId: '1:106157954659:web:3e189110236a2138438a56',
  measurementId: 'G-Z6GK19K3L0',
};
// https://geotools-bc75a-f6011.firebaseio.com/
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const database = getDatabase(app)

export async function getCitiesStartWith(letter) {
  // Ensure first character is uppercase
  const capitalizedLetter = letter.charAt(0).toUpperCase() + letter.slice(1);

  const citiesRef = ref(database, 'cities');
  // Add limitToFirst() to limit results to the first 3
  const citiesQuery = query(
    citiesRef,
    orderByKey(),
    startAt(capitalizedLetter),
    endAt(capitalizedLetter + '\uf8ff'),
    limitToFirst(3)
  );

  try {
    const snapshot = await get(citiesQuery);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log(`No data available for cities starting with ${capitalizedLetter}`);
      return null;
    }
  } catch (error) {
    console.error(error);
  }
}
