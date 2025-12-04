import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBKzFEXJR5Gsq42i-WLOqhIHqIghmQc4jQ",
  authDomain: "react-auth-homework-1b3c2.firebaseapp.com",
  projectId: "react-auth-homework-1b3c2",
  storageBucket: "react-auth-homework-1b3c2.firebasestorage.app",
  messagingSenderId: "194067597638",
  appId: "1:194067597638:web:e52a94da8c418f5f427d47"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth};