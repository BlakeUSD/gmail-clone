import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAQ2mvoIooayDZwL2JMXZPfh7QC22F-M30",
    authDomain: "clone-7e627.firebaseapp.com",
    projectId: "clone-7e627",
    storageBucket: "clone-7e627.appspot.com",
    messagingSenderId: "938770059820",
    appId: "1:938770059820:web:f31f1fdf1408767f90b789"
};

const firebaseApp = firebase.initializeApp(firebaseConfig); // initialize firebase App
const db = firebaseApp.firestore(); // initialize firestore database
const auth = firebase.auth(); // initialize user authentication functionality
const provider = new firebase.auth.GoogleAuthProvider(); // initialize google sign-in method

export { db, auth, provider };