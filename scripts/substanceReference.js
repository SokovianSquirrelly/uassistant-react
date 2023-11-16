const display = document.querySelector("#reference-table");
const url = "data/substance-ref.json";

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

function displayForMobile(data) {
  data.forEach((substance) => {
    const substanceSection = document.createElement("section");
    substanceSection.classList.add("substance");

    // SUBSTANCE HEADER

    const substanceHeader = document.createElement("section");
    substanceHeader.classList.add("substanceHeader");

    const substanceName = document.createElement("h3");
    substanceName.textContent = `${substance.name} - ${substance.abbreviation}`;

    const expandButton = document.createElement("button");
    expandButton.classList.add("expand");

    substanceHeader.appendChild(substanceName);
    substanceHeader.appendChild(expandButton);

    // SUBSTANCE DETAILS

    const details = document.createElement("ul");
    details.classList.add("substanceDetails");

    const drugClass = document.createElement("li");
    drugClass.textContent = `Drug Class: ${substance.drugClass}`;

    const prescribed = document.createElement("li");
    if (substance.prescribed) {
      prescribed.textContent = "Can be Prescribed?: Yes";
    } else {
      prescribed.textContent = "Can be Prescribed?: No";
    }

    const streetNames = document.createElement("li");
    streetNames.textContent = `Street Names: ${substance.streetNames}`;

    const prescriptionNames = document.createElement("li");
    prescriptionNames.textContent = `Common Prescriptions: ${substance.commonPrescriptions}`;

    details.appendChild(drugClass);
    details.appendChild(prescribed);
    details.appendChild(streetNames);
    details.appendChild(prescriptionNames);

    substanceSection.appendChild(substanceHeader);
    substanceSection.appendChild(details);
    display.appendChild(substanceSection);

    expandButton.addEventListener("click", () => {
      expandButton.classList.toggle("open");
      details.classList.toggle("open");
    });
  });
}

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
