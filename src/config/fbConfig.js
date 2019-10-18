import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBCwUpBBezx7D7AJIRHyFuZDQ2Slrg8PAQ",
    authDomain: "murray-tasking-app.firebaseapp.com",
    databaseURL: "https://murray-tasking-app.firebaseio.com",
    projectId: "murray-tasking-app",
    storageBucket: "murray-tasking-app.appspot.com",
    messagingSenderId: "380568551847",
    appId: "1:380568551847:web:4b3d8d940f5478cd"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
// firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
