// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAmoYVi2rCFrFeJh4Vr9h1MMlOYgPt9VZI",
  authDomain: "github-c5c88.firebaseapp.com",
  databaseURL: "https://github-c5c88.firebaseio.com",
  projectId: "github-c5c88",
  storageBucket: "github-c5c88.appspot.com",
  messagingSenderId: "389956365199",
  appId: "1:389956365199:web:4bf736df934794516179fa",
  measurementId: "G-MNFMWVVQ26",
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
