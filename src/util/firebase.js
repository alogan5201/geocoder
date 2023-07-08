
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
const { VITE_FIREBASE_API_KEY } = import.meta.env;

const firebaseConfig = {
  apiKey: VITE_FIREBASE_API_KEY,
  authDomain: "geotools-bc75a.firebaseapp.com",
  databaseURL: "https://geotools-bc75a-default-rtdb.firebaseio.com",
  projectId: "geotools-bc75a",
  storageBucket: "geotools-bc75a.appspot.com",
  messagingSenderId: "106157954659",
  appId: "1:106157954659:web:3e189110236a2138438a56",
  measurementId: "G-Z6GK19K3L0",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

