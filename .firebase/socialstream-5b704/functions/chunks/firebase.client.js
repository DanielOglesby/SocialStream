import { getApps, initializeApp, getApp, deleteApp } from "firebase/app";
import { getAuth } from "firebase/auth";
let firebaseConfig = {
  apiKey: "AIzaSyDMyno4Ju3SmpmOZU1ouj8xn-rY8pMJmTc",
  authDomain: "socialstream-5b704.firebaseapp.com",
  projectId: "socialstream-5b704",
  storageBucket: "socialstream-5b704.appspot.com",
  messagingSenderId: "727474452664",
  appId: "1:727474452664:web:4b8d7ed52140f1ee625c4d"
};
console.log("API KEY", "AIzaSyDMyno4Ju3SmpmOZU1ouj8xn-rY8pMJmTc");
let firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApp();
  deleteApp(firebaseApp);
  firebaseApp = initializeApp(firebaseConfig);
}
getAuth(firebaseApp);
