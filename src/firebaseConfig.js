import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const app = {
    apiKey: "AIzaSyDzQ_cpqJfaGXlWn5yjBIY-CPWQRvV1o-4",
    authDomain: "todo-78970.firebaseapp.com",
    projectId: "todo-78970",
    storageBucket: "todo-78970.appspot.com",
    messagingSenderId: "836564891372",
    appId: "1:836564891372:web:9c159e59180ec8296a17c9",
    measurementId: "G-Q89X34BZYT"
};

const firebase = initializeApp(app);

const db = getFirestore(firebase);
const storage = getStorage(firebase);

export {db, storage};