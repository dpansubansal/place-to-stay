// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTIiH8lPeRA20CSxrlE3k79AfzeB36zgM",
  authDomain: "place-to-stay-419906.firebaseapp.com",
  projectId: "place-to-stay-419906",
  storageBucket: "place-to-stay-419906.appspot.com",
  messagingSenderId: "786023634538",
  appId: "1:786023634538:web:14a122036f3ac014e91c13",
  measurementId: "G-47VV3BNBFK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
const analytics = getAnalytics(app);