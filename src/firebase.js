
// import { initializeApp } from "firebase/app";
// import {getAuth} from "firebase/auth"
// const firebaseConfig = {
//   apiKey: "AIzaSyC9rpT1rdc7s3-tF9wAETbnwUPon7O_vek",
//   authDomain: "todo-firebase-c5ecf.firebaseapp.com",
//   projectId: "todo-firebase-c5ecf",
//   storageBucket: "todo-firebase-c5ecf.appspot.com",
//   messagingSenderId: "1011266457123",
//   appId: "1:1011266457123:web:cef46266513169d8be2b96",
//   measurementId: "G-8B5TTWM6PM"
// };


// const app = initializeApp(firebaseConfig);
// const auth =getAuth();
// export {app , auth};











// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth" ;

import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyC9rpT1rdc7s3-tF9wAETbnwUPon7O_vek",
  authDomain: "todo-firebase-c5ecf.firebaseapp.com",
  projectId: "todo-firebase-c5ecf",
  storageBucket: "todo-firebase-c5ecf.appspot.com",
  messagingSenderId: "1011266457123",
  appId: "1:1011266457123:web:cef46266513169d8be2b96",
  measurementId: "G-8B5TTWM6PM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

const db = getFirestore(app);
export{app, auth , db}