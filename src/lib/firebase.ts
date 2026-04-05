import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA9-epeEcvvj_2Y74t-cclSO4pxOYPX_rM',
  authDomain: 'finance-joao.firebaseapp.com',
  projectId: 'finance-joao',
  storageBucket: 'finance-joao.firebasestorage.app',
  messagingSenderId: '55684386182',
  appId: '1:55684386182:web:a1fcb5222af315eaa9f007',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
