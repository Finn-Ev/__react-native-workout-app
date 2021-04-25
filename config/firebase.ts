import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDLMAS7BiOWaj5zioaZt4VWNSs7L6ydl-Y',
  authDomain: 'workout-tracker-8f032.firebaseapp.com',
  projectId: 'workout-tracker-8f032',
  storageBucket: 'workout-tracker-8f032.appspot.com',
  messagingSenderId: '639698966776',
  appId: '1:639698966776:web:847d77ef3d36ed565a430d',
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = app.auth();

export { auth, db };
