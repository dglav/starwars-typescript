import firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyD3prLigv16FqVq1mUlbefz753VI9oQs60',
  authDomain: 'starwars-c3808.firebaseapp.com',
  projectId: 'starwars-c3808',
  storageBucket: 'starwars-c3808.appspot.com',
  messagingSenderId: '241056161458',
  appId: '1:241056161458:web:86c3b8087fbcc7f86fb3ab'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };
