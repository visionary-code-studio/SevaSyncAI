import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
let db_stable: any;
try {
  const { initializeFirestore } = require("firebase/firestore");
  db_stable = initializeFirestore(app, {
    experimentalForceLongPolling: true,
  });
} catch (error) {
  console.warn("Firestore initialization failed. Using default client.", error);
  db_stable = getFirestore(app);
}

const storage = getStorage(app);

console.log("Firebase Initialized for project:", firebaseConfig.projectId);

export { app, auth, db_stable as db, storage };
