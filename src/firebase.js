import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB8h4LG9AtuiBTSBHhHeMMTTW181YyfHuc",
    authDomain: "pdf-assignment.firebaseapp.com",
    projectId: "pdf-assignment",
    storageBucket: "pdf-assignment.appspot.com",
    messagingSenderId: "24404748417",
    appId: "1:24404748417:web:85ee62b78bb0a58c5a0580",
    measurementId: "G-JH2RZYBLQF"
};

firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
export { auth, firebase };