
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY.replace('"', "").replace('"', "").replace(",", ""),
    authDomain: import.meta.env.VITE_AUTH_DOMAIN.replace('"', "").replace('"', "").replace(",", ""),
    projectId: import.meta.env.VITE_PROJECT_ID.replace('"', "").replace('"', "").replace(",", ""),
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET.replace('"', "").replace('"', "").replace(",", ""),
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID.replace('"', "").replace('"', "").replace(",", ""),
    appId: import.meta.env.VITE_APP_ID.replace('"', "").replace('"', "").replace(",", "")
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }