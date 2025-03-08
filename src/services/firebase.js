import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCH3Vprhp70ew7Ubqizszloxja8mvnledk",
  authDomain: "savannah-41213.firebaseapp.com",
  projectId: "savannah-41213",
  storageBucket: "savannah-41213.firebasestorage.app",
  messagingSenderId: "1023432919594",
  appId: "1:1023432919594:web:70bb712bd3ede10ff6d153",
  measurementId: "G-WWVSWXPW6J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;