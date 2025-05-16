import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBbamvJKfx0v-SiUjmyBpHCFmw61wB92TY",
    authDomain: "realtime-running-text.firebaseapp.com",
    databaseURL: "https://realtime-running-text-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "realtime-running-text",
    storageBucket: "realtime-running-text.firebasestorage.app",
    messagingSenderId: "75326013206",
    appId: "1:75326013206:web:9efc0012387fab66c3da37",
    measurementId: "G-3809EMYDYB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { database, auth }