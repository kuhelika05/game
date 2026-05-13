import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

const firebaseConfig = {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_DOMAIN',
    projectId: 'YOUR_PROJECT_ID'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
};

import {
    getFirestore,
    doc,
    setDoc
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const db = getFirestore();

async function savePlayerProgress(playerData) {
    await setDoc(doc(db, 'players', playerData.id), playerData);
}
