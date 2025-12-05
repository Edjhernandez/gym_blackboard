// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtQ6A71H4u6jQaSQvL-6F6cNCedB8sudU",
  authDomain: "gymblackboard.firebaseapp.com",
  projectId: "gymblackboard",
  storageBucket: "gymblackboard.firebasestorage.app",
  messagingSenderId: "974072573218",
  appId: "1:974072573218:web:26712e615d7d3a904a897b",
  measurementId: "G-8D6QN9QF0V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Obtén la instancia de Authentication
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Puedes exportar el 'app' si lo necesitas para otros servicios
export default app;
