// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0kbm1Bv4bCKdiF5gD6oOzotQkj2jsdwI",
  authDomain: "maritaldesk.firebaseapp.com",
  projectId: "maritaldesk",
  storageBucket: "maritaldesk.firebasestorage.app",
  messagingSenderId: "415551682941",
  appId: "1:415551682941:web:5be28b11ecddf54931b414"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);