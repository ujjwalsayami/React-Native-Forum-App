import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDGhH4JDr7Z1Ru_8m3vr-4szFi4Wa2thto',
  authDomain: 'forumapp-9072b.firebaseapp.com',
  databaseURL: 'https://forumapp-9072b.firebaseio.com',
  projectId: 'forumapp-9072b',
  storageBucket: 'forumapp-9072b.appspot.com',
  messagingSenderId: '448405153519',
  appId: '1:448405153519:web:d38d9b8a108e9ebd3bdd1a',
};

// Initialize Firebase
let Firebase = firebase.initializeApp(firebaseConfig);
export const firestoreDb = firebase.firestore();

export default Firebase;
