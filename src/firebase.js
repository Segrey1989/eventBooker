import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/functions';

var firebaseConfig = {
  apiKey: 'AIzaSyB08GID8dAzwpFYzXufvtcqCzCnnvw8Zu4',
  authDomain: 'event-booker-ab765.firebaseapp.com',
  databaseURL: 'https://event-booker-ab765.firebaseio.com',
  projectId: 'event-booker-ab765',
  storageBucket: 'event-booker-ab765.appspot.com',
  messagingSenderId: '63792606940',
  appId: '1:63792606940:web:37c712f28b43728e',
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();
// const functions = firebase.functions();
// console.log(functions);

export default firebase;
