import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

/**
 * Initialize FireStore SDK
 */
firebase.initializeApp({
    apiKey: "AIzaSyAbfyDIX3OHqjoUCZM-Cfq9HEwUVaqpek0",
    authDomain: "students-app-platform.firebaseapp.com",
    databaseURL: "https://students-app-platform.firebaseio.com",
    projectId: "students-app-platform",
    storageBucket: "students-app-platform.appspot.com",
    messagingSenderId: "446502621491"
});

const db = firebase.firestore();

// const settings = {timestampsInSnapshots: true};
// db.settings(settings);

export default db;



