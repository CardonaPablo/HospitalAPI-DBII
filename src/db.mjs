// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDB7qoDsIoQElNJhfkxvujP4jJHnrbrEF0",
  authDomain: "hospital-api-db2.firebaseapp.com",
  projectId: "hospital-api-db2",
  storageBucket: "hospital-api-db2.appspot.com",
  messagingSenderId: "877191925042",
  appId: "1:877191925042:web:e8caa1e5496e35d177db2b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = app.firestore();
console.log('Firebase initialized');

export default db 
