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
  displayData(donors);
}).catch(error => {
  console.log(error.message);
});

const donorData = document.querySelector("#client-list");

function displayData(donors) {
  donors.forEach((donor) => {
    let tableRow = document.createElement("tr");

    let idCell = document.createElement("td");
    let firstNameCell = document.createElement("td");
    let lastNameCell = document.createElement("td");
    let officerCell = document.createElement("td");
    let groupCell = document.createElement("td");

    idCell.textContent = donor.id;
    firstNameCell.textContent = donor.firstName;
    lastNameCell.textContent = donor.lastName;
    officerCell.textContent = donor.probationOfficer;
    groupCell.textContent = donor.testingGroup;

    tableRow.appendChild(idCell);
    tableRow.appendChild(firstNameCell);
    tableRow.appendChild(lastNameCell);
    tableRow.appendChild(officerCell);
    tableRow.appendChild(groupCell);

    donorData.appendChild(tableRow);
  });
}