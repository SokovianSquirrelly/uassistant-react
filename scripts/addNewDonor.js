// import {addDoc, colRef} from "./dist/bundle.js";

// const addDonor = document.getElementById("new-client-form");
// const activationCheckbox = document.getElementById("activationStatus");
// addDonor.addEventListener("submit", (e) => {
//   e.preventDefault();

//   // Parse out date of birth
//   let dob = addDonor.dob.value.split("-");
//   let birthMonth = "";
//   const birthDay = parseInt(dob[2]);
//   const birthYear = parseInt(dob[0]);

//   switch (dob[1]) {
//     case "01":
//       birthMonth = "January";
//       break;
//     case "02":
//       birthMonth = "February";
//       break;
//     case "03":
//       birthMonth = "March";
//       break;
//     case "04":
//       birthMonth = "April";
//       break;
//     case "05":
//       birthMonth = "May";
//       break;
//     case "06":
//       birthMonth = "June";
//       break;
//     case "07":
//       birthMonth = "July";
//       break;
//     case "08":
//       birthMonth = "August";
//       break;
//     case "09":
//       birthMonth = "September";
//       break;
//     case "10":
//       birthMonth = "October";
//       break;
//     case "11":
//       birthMonth = "November";
//       break;
//     case "12":
//       birthMonth = "December";
//       break;
//   }

//   // Time to add the data to the database
//   addDoc(colRef, {
//     activationStatus: activationCheckbox.checked,
//     ageGroup: addDonor.ageGroup.value,
//     contactInformation: {
//       address: {
//         addressLine1: addDonor.street.value,
//         addressLine2: addDonor.unit.value,
//         city: addDonor.city.value,
//         state: addDonor.state.value,
//         zip: addDonor.zip.value,
//       },
//       email: addDonor.email.value,
//       phoneNumber: addDonor.phone.value,
//     },
//     dateOfBirth: {
//       day: birthDay,
//       month: birthMonth,
//       year: birthYear,
//     },
//     donorType: addDonor.donorType.value,
//     firstName: addDonor.fname.value,
//     gender: addDonor.gender.value,
//     lastName: addDonor.lname.value,
//     probationOfficer: addDonor.officer.value,
//     testingGroup: addDonor.testingGroup.value,
//   }).then(() => {
//     location.href = "client-manager.html";
//     alert(
//       `${addDonor.fname.value} ${addDonor.lname.value} has been successfully added.`
//     );
//   });
// });