import { initializeApp, getApps, getApp, deleteApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: "socialstream-5b704.firebaseapp.com",
  databaseURL: "https://socialstream-5b704-default-rtdb.firebaseio.com",
  projectId: "socialstream-5b704",
  storageBucket: "socialstream-5b704.appspot.com",
  messagingSenderId: "727474452664",
  appId: "1:727474452664:web:4b8d7ed52140f1ee625c4d",
  measurementId: "G-ES3F0EED44"
};

let firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
}
else {
  firebaseApp = getApp();
  deleteApp(firebaseApp);
  firebaseApp = initializeApp(firebaseConfig);
}

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);