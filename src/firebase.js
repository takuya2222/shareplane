// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfFyKJ8uSEzozhypC4oe2lqnDASwbzvvM",
  authDomain: "shareplane-d895a.firebaseapp.com",
  projectId: "shareplane-d895a",
  storageBucket: "shareplane-d895a.appspot.com",
  messagingSenderId: "211645302765",
  appId: "1:211645302765:web:0c1a6c4d0ede679624c9e4",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
