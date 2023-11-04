import { initializeApp } from "../node_modules/firebase/app";
import { getFirestore } from "../node_modules/firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZDDpTJADUbMWr7TuOVTznpWlvGo-3cgQ",
  authDomain: "uassistant-4f486.firebaseapp.com",
  databaseURL: "https://uassistant-4f486-default-rtdb.firebaseio.com",
  projectId: "uassistant-4f486",
  storageBucket: "uassistant-4f486.appspot.com",
  messagingSenderId: "643665329098",
  appId: "1:643665329098:web:626ec3980fed7fc4f42d33",
  measurementId: "G-QPSNL5SW42",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

function addDonor() {
  addDoc(collection(db, "Donors"), { name: "Steve" });
}

addDonor();
