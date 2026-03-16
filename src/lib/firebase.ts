import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDcCu2H7tJ8IlBnIg4mwSgDAg0RNiZ4Mg8",
  authDomain: "chemlearn-83c92.firebaseapp.com",
  projectId: "chemlearn-83c92",
  storageBucket: "chemlearn-83c92.firebasestorage.app",
  messagingSenderId: "489868548400",
  appId: "1:489868548400:web:87e49ea2bded6b9c7890f5",
  measurementId: "G-LTXPSEKGBQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
