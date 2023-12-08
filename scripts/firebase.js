import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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

const app = initializeApp(firebaseConfig);

// Firestore
const db = getFirestore(app);

const colRef = collection(db, "DonorsTest");

getDocs(colRef).then((snapshot) => {
  let donors = [];
  snapshot.docs.forEach((doc) => {
    donors.push({ ...doc.data(), id: doc.id });
  });
  console.log(donors);
}).catch(error => {
  console.log(error.message);
})
