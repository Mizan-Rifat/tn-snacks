import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD0j4pHa5i6pbPL2QpSSUo3peTGLNMsxzw',
  authDomain: 'tn-snacks.firebaseapp.com',
  projectId: 'tn-snacks',
  storageBucket: 'tn-snacks.appspot.com',
  messagingSenderId: '711588713745',
  appId: '1:711588713745:web:fab134a677c4f54bc9a8b0'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const currentUser = auth.currentUser;
