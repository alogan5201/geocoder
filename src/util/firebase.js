// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getStorage } from 'firebase/storage';
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
export const functions = getFunctions();
export const storage = getStorage(app);

