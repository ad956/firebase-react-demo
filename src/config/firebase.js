// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRQVd2l5yR1ws9pj4UFLaK4pb3J5_Yrew",
  authDomain: "social-app-react-fe889.firebaseapp.com",
  projectId: "social-app-react-fe889",
  storageBucket: "social-app-react-fe889.appspot.com",
  messagingSenderId: "130388456058",
  appId: "1:130388456058:web:6a4ec699e35294849d81c3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
