import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator } from 'firebase/firestore';
import { connectFunctionsEmulator } from 'firebase/functions';
import { connectStorageEmulator } from 'firebase/storage';

export const initializeEmulators = (app) => {
  if (import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true') {
    const auth = getAuth(app);
    const functions = getFunctions(app);
    const storage = getStorage(app);

    connectAuthEmulator(auth, 'http://localhost:9099');
    connectFunctionsEmulator(functions, 'localhost', 5001);
    connectStorageEmulator(storage, 'localhost', 9199);

    console.log('Firebase emulators initialized');
  }
};