import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { mockDrivers } from '../src/mockData';

const firebaseConfig = {
  apiKey: "AIzaSyBDno0UDPJukZy-qxEL9RDT1fi2sQwBIgM",
  authDomain: "cargo-2c492.firebaseapp.com",
  projectId: "cargo-2c492",
  storageBucket: "cargo-2c492.firebasestorage.app",
  messagingSenderId: "257721101922",
  appId: "1:257721101922:web:0639c9e755eeaec27b6b3b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function initializeFirebase() {
  try {
    // Add drivers
    for (const driver of mockDrivers) {
      const { id, ...driverData } = driver;
      await addDoc(collection(db, 'drivers'), driverData);
    }

    console.log('Firebase initialized successfully!');
  } catch (error) {
    console.error('Error initializing Firebase:', error);
  }
}

initializeFirebase(); 