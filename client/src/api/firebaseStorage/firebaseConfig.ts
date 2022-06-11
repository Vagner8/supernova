import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDnqMrio0bJ4sHZm6sT3X_T3-Um_vUgUFA',
  authDomain: 'fir-1ad92.firebaseapp.com',
  projectId: 'fir-1ad92',
  storageBucket: 'fir-1ad92.appspot.com',
  messagingSenderId: '213577813183',
  appId: '1:213577813183:web:49d2f53c602b32bb0b8a0a',
};

const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);
