import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  enableIndexedDbPersistence,
} from "firebase/firestore";

import {
  getFirestore,
  enableIndexedDbPersistence,
} from "firebase/firestore";

export const db = getFirestore(app);

enableIndexedDbPersistence(db).catch((error) => {
  console.log("Offline persistence error:", error.code);
});

const firebaseConfig = {
  apiKey: "AIzaSyAuS6FQ6ZszevDaVfDCTN86q1rDSFSba9c",
  authDomain: "dailylex-db7c3.firebaseapp.com",
  projectId: "dailylex-db7c3",
  storageBucket: "dailylex-db7c3.firebasestorage.app",
  messagingSenderId: "517012006678",
  appId: "1:517012006678:web:19e97f41a4fb4bdc99d237",
  measurementId: "G-FBVRFV4GBJ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

enableIndexedDbPersistence(db).catch((error) => {
  console.log("Offline persistence error:", error.code);
});