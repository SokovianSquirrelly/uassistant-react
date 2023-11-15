const display = document.querySelector("#reference-table");
const url = "../data/substance-ref.json";

async function getSubstanceData() {
  const response = await fetch(url);

  if (response.ok) {
    const data = await response.json();
    console.table(data);

    if (window.innerWidth < 769) {
      console.log("Mobile View");
      displayForMobile(data);
    } else {
      console.log("Desktop View");
      displayForDesktop(data);
    }
  }
}

function displayForMobile(data) {}

function displayForDesktop(data) {
  const table = document.createElement("table");
  const header = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const body = document.createElement("tbody");

  const headerName = document.createElement("th");
  const headerAbbr = document.createElement("th");
  const headerClass = document.createElement("th");
  const headerPrescribe = document.createElement("th");
  const headerStreetNames = document.createElement("th");
  const headerPrescriptions = document.createElement("th");

  headerName.textContent = "Name of Substance";
  headerAbbr.textContent = "Abbreviation";
  headerClass.textContent = "Drug Class";
  headerPrescribe.textContent = "Can Be Prescribed?";
  headerStreetNames.textContent = "Street Names";
  headerPrescriptions.textContent = "Common Prescriptions";

  headerRow.appendChild(headerName);
  headerRow.appendChild(headerAbbr);
  headerRow.appendChild(headerClass);
  headerRow.appendChild(headerPrescribe);
  headerRow.appendChild(headerStreetNames);
  headerRow.appendChild(headerPrescriptions);

  header.appendChild(headerRow);
  table.appendChild(header);

  data.forEach((substance) => {
    const row = document.createElement("tr");

    const substanceName = document.createElement("td");
    substanceName.textContent = substance.name;

    const abbreviation = document.createElement("td");
    abbreviation.textContent = substance.abbreviation;

    const drugClass = document.createElement("td");
    drugClass.textContent = substance.drugClass;

    const prescribed = document.createElement("td");
    if (substance.prescribed) {
      prescribed.textContent = "Yes";
    } else {
      prescribed.textContent = "No";
    }

    const streetNames = document.createElement("td");
    streetNames.textContent = substance.streetNames;

    const prescriptionNames = document.createElement("td");
    prescriptionNames.textContent = substance.commonPrescriptions;

    row.appendChild(substanceName);
    row.appendChild(abbreviation);
    row.appendChild(drugClass);
    row.appendChild(prescribed);
    row.appendChild(streetNames);
    row.appendChild(prescriptionNames);
    body.appendChild(row);
  });

  table.appendChild(body);
  display.appendChild(table);
}

getSubstanceData();
