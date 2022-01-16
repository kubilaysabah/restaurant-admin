// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1HeEAitfCJJH4epQFOJn2gBMzbGpxwRo",
  authDomain: "test-f6b72.firebaseapp.com",
  projectId: "test-f6b72",
  storageBucket: "test-f6b72.appspot.com",
  messagingSenderId: "557716255773",
  appId: "1:557716255773:web:78b17af8af0266f77f42f4",
  measurementId: "G-KSTWRPL808"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;