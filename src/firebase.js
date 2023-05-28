

import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBDH0baVoyVoBY4OTiRz9UeNIhXlikLiQU",
  authDomain: "learntube-ad8a4.firebaseapp.com",
  projectId: "learntube-ad8a4",
  storageBucket: "learntube-ad8a4.appspot.com",
  messagingSenderId: "600271992270",
  appId: "1:600271992270:web:8d41a201be84cf57bce79f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export  const provider= new GoogleAuthProvider();
export  const auth=getAuth();
export default app;