import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAwEU8yP8ure2ybQc1wDsF-sVcKAWD-UEY",
  authDomain: "artify-115fc.firebaseapp.com",
  projectId: "artify-115fc",
  storageBucket: "artify-115fc.firebasestorage.app",
  messagingSenderId: "592147988192",
  appId: "1:592147988192:web:8dff66dc43fceab7751a85",
  measurementId: "G-PY0MHH1Z3N"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Connectivity testing validator
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log("Firebase connection initialized successfully.");
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration or network.");
    }
  }
}
testConnection();
