import * as firebase from 'firebase/app';
import * as auth from 'firebase/auth';
import * as firestoreStore from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyB7lvocz1c7B7W9XZXnHOuAY5qhyw8GSbQ",
  authDomain: "agrillance.firebaseapp.com",
  projectId: "agrillance",
  storageBucket: "agrillance.appspot.com",
  messagingSenderId: "1046246136036",
  appId: "1:1046246136036:web:751a0ab6687e03664db4f1",
  measurementId: "G-Y3B8KXQ4WJ"
};

let firebaseApp;

if (!firebase.getApps.length) {
  firebaseApp = firebase.initializeApp(firebaseConfig)
}

// firebase.initializeApp(firebaseConfig)

const firebaseAuth = auth;

const app = auth.getAuth(firebaseApp);

// initializeApp(firebaseConfig);

const dbAuth = firestoreStore.getFirestore();

export {dbAuth, firebaseAuth, app, firestoreStore, firebaseApp};

export default dbAuth;