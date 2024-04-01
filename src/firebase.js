import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBaxF6PehxO24NMbmI3G4_GSApE7C9CgXg",
  authDomain: "quran-app-ebfa9.firebaseapp.com",
  projectId: "quran-app-ebfa9",
  storageBucket: "quran-app-ebfa9.appspot.com",
  messagingSenderId: "888017779844",
  appId: "1:888017779844:web:4ed82587a99b4d4ee116d1",
  measurementId: "G-B5SJH1HLN9"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();