import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  arrayUnion
} from "firebase/firestore";

/*****************************************************************************
 * FIREBASE CONFIG
 *
 * This configuration makes sure we can connect to the correct database on
 * Firebase.
 *****************************************************************************/
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

/*****************************************************************************
 * DISPLAY
 *
 * This will display each donor's info in the client manager.  The information
 * will display differently based upon what kind of device the user is using.
 *****************************************************************************/
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

/*****************************************************************************
 * DISPLAY DATA MOBILE
 *
 * TODO: Get this going.
 *****************************************************************************/
function displayDataMobile(donors) {}

/*****************************************************************************
 * DISPLAY DATA DESKTOP
 *
 * The information will be displayed in a table when this function is called.
 *****************************************************************************/
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
    let buttonCell = document.createElement("td");

    firstNameCell.textContent = donor.firstName;
    lastNameCell.textContent = donor.lastName;
    officerCell.textContent = donor.probationOfficer;
    supervisionCell.textContent = donor.donorType;
    groupCell.textContent = donor.testingGroup;

    let editButton = document.createElement("button");
    editButton.classList.add("edit-donor");
    editButton.addEventListener("click", () => {
      location.href = `./edit-client.html?id=${donor.id}`;
    });

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-donor");
    deleteButton.addEventListener("click", () => {
      deleteDonor(donor.id);
    });

    buttonCell.appendChild(editButton);
    buttonCell.appendChild(deleteButton);

    tableRow.appendChild(firstNameCell);
    tableRow.appendChild(lastNameCell);
    tableRow.appendChild(officerCell);
    tableRow.appendChild(supervisionCell);
    tableRow.appendChild(groupCell);
    tableRow.appendChild(buttonCell);

    body.appendChild(tableRow);
  });

  donorTable.appendChild(body);
  donorSection.appendChild(donorTable);
}

/*****************************************************************************
 * ADD DONOR
 *
 * This collects the new donor info and puts it up in Firebase.
 *
 * TODO: Fix activationStatus so it doesn't always return true.
 *****************************************************************************/
const addDonor = document.getElementById("new-client-form");
const activationCheckbox = document.getElementById("activationStatus");

if (addDonor) {
  addDonor.addEventListener("submit", (e) => {
    e.preventDefault();

    // Parse out date of birth
    let dob = addDonor.dob.value.split("-");
    let birthMonth = "";
    const birthDay = parseInt(dob[2]);
    const birthYear = parseInt(dob[0]);

    switch (dob[1]) {
      case "01":
        birthMonth = "January";
        break;
      case "02":
        birthMonth = "February";
        break;
      case "03":
        birthMonth = "March";
        break;
      case "04":
        birthMonth = "April";
        break;
      case "05":
        birthMonth = "May";
        break;
      case "06":
        birthMonth = "June";
        break;
      case "07":
        birthMonth = "July";
        break;
      case "08":
        birthMonth = "August";
        break;
      case "09":
        birthMonth = "September";
        break;
      case "10":
        birthMonth = "October";
        break;
      case "11":
        birthMonth = "November";
        break;
      case "12":
        birthMonth = "December";
        break;
    }

    // Time to add the data to the database
    addDoc(colRef, {
      activationStatus: activationCheckbox.checked,
      ageGroup: addDonor.ageGroup.value,
      contactInformation: {
        address: {
          addressLine1: addDonor.street.value,
          addressLine2: addDonor.unit.value,
          city: addDonor.city.value,
          state: addDonor.state.value,
          zip: addDonor.zip.value,
        },
        email: addDonor.email.value,
        phoneNumber: addDonor.phone.value,
      },
      dateOfBirth: {
        day: birthDay,
        month: birthMonth,
        year: birthYear,
      },
      donorType: addDonor.donorType.value,
      firstName: addDonor.fname.value,
      gender: addDonor.gender.value,
      lastName: addDonor.lname.value,
      probationOfficer: addDonor.officer.value,
      testingGroup: addDonor.testingGroup.value,
    }).then(() => {
      location.href = "client-manager.html";
      alert(
        `${addDonor.fname.value} ${addDonor.lname.value} has been successfully added.`
      );
    });
  });
}

const updateDonorForm = document.getElementById("edit-client-form");

const firstNameEdit = document.getElementById("fname-edit");
const lastNameEdit = document.getElementById("lname-edit");
const genderEdit = document.getElementById("gender-edit");
const dobEdit = document.getElementById("dob-edit");
const phoneEdit = document.getElementById("phone-edit");
const emailEdit = document.getElementById("email-edit");
const streetEdit = document.getElementById("street-edit");
const unitEdit = document.getElementById("unit-edit");
const cityEdit = document.getElementById("city-edit");
const stateEdit = document.getElementById("state-edit");
function editDonor() {
  const urlParams = new URLSearchParams(window.location.search);
  const donorId = urlParams.get("id");
  let data = {};
  if (donorId) {
    const docRef = doc(db, "DonorsTest", donorId);

    getDoc(docRef).then((doc) => {
      console.log(doc);
      console.log(doc.data(), doc.id);
      data = doc.data();
      firstNameEdit.value = data.firstName;
      lastNameEdit.value = data.lastName;
      phoneEdit.value = data.contactInformation.phoneNumber;
      emailEdit.value = data.contactInformation.email;
      streetEdit.value = data.contactInformation.address.addressLine1;
      unitEdit.value = data.contactInformation.address.addressLine2;
      cityEdit.value = data.contactInformation.address.city;
      stateEdit.value = data.contactInformation.address.state;
    });

    updateDonorForm.addEventListener("submit", (e) => {
      e.preventDefault();

      let dob = updateDonorForm.dob.value.split("-");
      let birthMonth = "";
      const birthDay = parseInt(dob[2]);
      const birthYear = parseInt(dob[0]);

      switch (dob[1]) {
        case "01":
          birthMonth = "January";
          break;
        case "02":
          birthMonth = "February";
          break;
        case "03":
          birthMonth = "March";
          break;
        case "04":
          birthMonth = "April";
          break;
        case "05":
          birthMonth = "May";
          break;
        case "06":
          birthMonth = "June";
          break;
        case "07":
          birthMonth = "July";
          break;
        case "08":
          birthMonth = "August";
          break;
        case "09":
          birthMonth = "September";
          break;
        case "10":
          birthMonth = "October";
          break;
        case "11":
          birthMonth = "November";
          break;
        case "12":
          birthMonth = "December";
          break;
      }

      updateDoc(docRef, {
        activationStatus: activationCheckbox.checked,
        ageGroup: updateDonorForm.ageGroup.value,
        contactInformation: {
          address: {
            addressLine1: updateDonorForm.street.value,
            addressLine2: updateDonorForm.unit.value,
            city: updateDonorForm.city.value,
            state: updateDonorForm.state.value,
            zip: updateDonorForm.zip.value,
          },
          email: updateDonorForm.email.value,
          phoneNumber: updateDonorForm.phone.value,
        },
        dateOfBirth: {
          day: birthDay,
          month: birthMonth,
          year: birthYear,
        },
        donorType: updateDonorForm.donorType.value,
        firstName: updateDonorForm.fname.value,
        gender: updateDonorForm.gender.value,
        lastName: updateDonorForm.lname.value,
        probationOfficer: updateDonorForm.officer.value,
        testingGroup: updateDonorForm.testingGroup.value,
      }).then(() => {
        location.href = "client-manager.html";
        alert(
          `${addDonor.fname.value} ${addDonor.lname.value} has been successfully added.`
        );
      });
    });
  }
}

function deleteDonor(donorId) {
  const docRef = doc(db, "DonorsTest", donorId);

  if (
    confirm(
      "If you delete this donor, all data will be erased. Are you absolutely sure you want to delete the donor?"
    )
  ) {
    deleteDoc(docRef).then(() => {
      alert("Donor successfully deleted.");
      location.reload();
    });
  }
}

const daysOffManager = document.getElementById("schedule-days-off");
if (daysOffManager) {
  getDocs(colRef).then((snapshot) => {
    let donors = [];
    snapshot.docs.forEach((doc) => {
      donors.push({ ...doc.data(), id: doc.id });
    });
    donors.forEach((donor) => {
      const docRef = doc(db, "DonorsTest", donor.id);

      const donorName = document.createElement("h3");
      const daysOffForm = document.createElement("form");
      const calendar = document.createElement("input");
      const reason = document.createElement("input");
      const submit = document.createElement("input");

      donorName.textContent = `${donor.lastName}, ${donor.firstName}`;

      daysOffForm.setAttribute("method", "post");

      calendar.setAttribute("type", "date");
      calendar.setAttribute("required", true);
      calendar.setAttribute("name", "selectDay");

      reason.setAttribute("type", "text");
      reason.setAttribute("required", true);
      reason.setAttribute("name", "reasoning");

      submit.setAttribute("type", "submit");

      daysOffForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const map = {
          date: daysOffForm.selectDay.value,
          reasoning: daysOffForm.reasoning.value,
        };
        console.log(map);

        updateDoc(doc(db, "DonorsTest", donor.id), {
          datesExcused: arrayUnion(map),
        }).then(() => {
          alert("Information has been updated.");
          daysOffForm.reset();
        });

        //let docRef = colRef.doc(donor.id);
      });

      daysOffForm.appendChild(calendar);
      daysOffForm.appendChild(reason);
      daysOffForm.appendChild(submit);

      daysOffManager.appendChild(donorName);
      daysOffManager.appendChild(daysOffForm);
    });
  });
}

editDonor();
