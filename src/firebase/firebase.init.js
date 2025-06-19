// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB314g8GeZ1Oal6sEzZH7BHzqNss12wdsE",
  authDomain: "coffee-store-app-b51a4.firebaseapp.com",
  projectId: "coffee-store-app-b51a4",
  storageBucket: "coffee-store-app-b51a4.firebasestorage.app",
  messagingSenderId: "35243497373",
  appId: "1:35243497373:web:69b983aaef4e8d2f384174"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);