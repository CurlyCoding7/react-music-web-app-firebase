// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// Initialize Firebase
const app = initializeApp({
  apiKey: "AIzaSyDsFtgoMfOr5VFh_lTdvomsewGqxql2bn8",
  authDomain: "music-player-7e9fc.firebaseapp.com",
  projectId: "music-player-7e9fc",
  storageBucket: "music-player-7e9fc.appspot.com",
  messagingSenderId: "948806037492",
  appId: "1:948806037492:web:a2aef6bd0d0280aa4593a1",
  databaseURL: "https://music-player-7e9fc-default-rtdb.firebaseio.com/",
});

// Initialize Firebase
const storage = getStorage(app);
const db = getDatabase(app);

export default storage;
export { db };
