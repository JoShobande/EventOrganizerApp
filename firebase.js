import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDFTJhKxfLjYdFxKZrsgchxNv1EzEwdySg",
    authDomain: "lab4-e6283.firebaseapp.com",
    projectId: "lab4-e6283",
    storageBucket: "lab4-e6283.firebasestorage.app",
    messagingSenderId: "637025569645",
    appId: "1:637025569645:web:7a3adf1e8682f6fc72e864"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
