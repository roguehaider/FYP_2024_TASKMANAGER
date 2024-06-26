// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "taskmanager-dc600.firebaseapp.com",
  projectId: "taskmanager-dc600",
  storageBucket: "taskmanager-dc600.appspot.com",
  messagingSenderId: "323475039675",
  appId: "1:323475039675:web:d78c063c0c2ff1384e109e",
  measurementId: "G-FR7BEN7BSJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);