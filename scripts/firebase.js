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

getDocs(colRef)
  .then((snapshot) => {
    let donors = [];
    snapshot.docs.forEach((doc) => {
      donors.push({ ...doc.data(), id: doc.id });
    });

    //console.log(donors);

    if (window.innerWidth < 769) {
      displayDataMobile(donors);
    } else {
      displayDataDesktop(donors);
    }
  })
  .catch((error) => {
    console.log(error.message);
  });

const donorSection = document.querySelector("#donor-section");

function displayDataMobile(donors) {}

function displayDataDesktop(donors) {
  const donorTable = document.createElement("table");
  const header = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const body = document.createElement("tbody");

  // Making the header

  const hFirst = document.createElement("th");
  const hLast = document.createElement("th");
  const hOfficer = document.createElement("th");
  const hSupervision = document.createElement("th");
  const hGroup = document.createElement("th");

  hFirst.textContent = "First Name";
  hLast.textContent = "Last Name";
  hOfficer.textContent = "Probation Officer";
  hSupervision.textContent = "Supervision Type";
  hGroup.textContent = "Testing Group";

  headerRow.appendChild(hFirst);
  headerRow.appendChild(hLast);
  headerRow.appendChild(hOfficer);
  headerRow.appendChild(hSupervision);
  headerRow.appendChild(hGroup);

  header.appendChild(headerRow);
  donorTable.appendChild(header);

  donors.forEach((donor) => {
    let tableRow = document.createElement("tr");

    let firstNameCell = document.createElement("td");
    let lastNameCell = document.createElement("td");
    let officerCell = document.createElement("td");
    let supervisionCell = document.createElement("td");
    let groupCell = document.createElement("td");

    firstNameCell.textContent = donor.firstName;
    lastNameCell.textContent = donor.lastName;
    officerCell.textContent = donor.probationOfficer;
    supervisionCell.textContent = donor.donorType;
    groupCell.textContent = donor.testingGroup;

    tableRow.appendChild(firstNameCell);
    tableRow.appendChild(lastNameCell);
    tableRow.appendChild(officerCell);
    tableRow.appendChild(supervisionCell);
    tableRow.appendChild(groupCell);

    body.appendChild(tableRow);
  });

  donorTable.appendChild(body);
  donorSection.appendChild(donorTable);
}
