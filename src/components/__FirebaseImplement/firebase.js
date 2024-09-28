// Import Google Firebase features
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'                       // Basic Authen
import { getFirestore} from 'firebase/firestore'; 



const firebaseApp = initializeApp({
    apiKey: "AIzaSyCTktbxD5JoYeZ40VE_DZdI3mrttJJ6XKw",
    authDomain: "schedulemaker-bb299.firebaseapp.com",
    projectId: "schedulemaker-bb299",
    storageBucket: "schedulemaker-bb299.appspot.com",
    messagingSenderId: "844328317937",
    appId: "1:844328317937:web:9f886252ca9f143d258a50",
    measurementId: "G-M1S60VE01B"
  });

const databaseAuth = getAuth(firebaseApp);
const database = getFirestore(firebaseApp);

export default {
   databaseAuth, 
   database };