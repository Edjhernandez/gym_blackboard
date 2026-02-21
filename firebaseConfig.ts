import AsyncStorage from "@react-native-async-storage/async-storage";
import { FirebaseApp, getApps, initializeApp } from "firebase/app";
import { Auth, getAuth, initializeAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

// @ts-ignore - Firebase tiene un problema de exportación de tipos en RN que aún no han resuelto en la v10/11
// Pero la funcionalidad existe y es necesaria para que la sesión no se borre.
import { getReactNativePersistence } from "firebase/auth/react-native";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);

  // Inicializamos Auth con la persistencia de AsyncStorage
  // El casting a 'any' aquí es el "seguro de vida" para que TS deje de molestar
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage) as any,
  });
} else {
  app = getApps()[0];
  auth = getAuth(app);
}

db = getFirestore(app);

export { app, auth, db };
