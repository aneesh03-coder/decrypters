// Import the functions you need from the SDKs you need

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyCbVPoyjyJqUXmlr6gRX30qcBGkRfrheSI",
  authDomain: "decrypters-foundation.firebaseapp.com",
  projectId: "decrypters-foundation",
  storageBucket: "decrypters-foundation.appspot.com",
  messagingSenderId: "91099475690",
  appId: "1:91099475690:web:c889031167f5a587097193",

};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
export { db };
