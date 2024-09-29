// Import necessary Firebase functions
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTktbxD5JoYeZ40VE_DZdI3mrttJJ6XKw",
  authDomain: "schedulemaker-bb299.firebaseapp.com",
  projectId: "schedulemaker-bb299",
  storageBucket: "schedulemaker-bb299.appspot.com",
  messagingSenderId: "844328317937",
  appId: "1:844328317937:web:9f886252ca9f143d258a50",
  measurementId: "G-M1S60VE01B",
};

// Initialize Firebase app (make sure it's initialized only once)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize services
const databaseAuth = getAuth(app);
const database = getFirestore(app);

// Export services
export { databaseAuth, database };
export default app;