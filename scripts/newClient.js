const cancelButton = document.querySelector("#backButton");

cancelButton.addEventListener("click", () => {
    if (confirm("Changes will not be saved.  You sure you want to quit?")) {
        location.href = "client-manager.html";
    } else {
        // do nothing
    }
});

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault()
    const formData = new FormData(form);
    const value = Object.fromEntries(formData.entries());
    console.log(value);

    const firstName = value.fname;
    const lastName = value.lname;
    const gender = value.gender;
    const dateOfBirth = value.dob;

    const phone = value.phone;
    const email = value.email;
    const streetAddress = value.street;
    const unitNumber = value.unit;
    const city = value.city;
    const state = value.state;
    const zipCode = value.zip;

    const officer = value.officer;
    const ageGroup = value.ageGroup;
    const donorType = value.donorType;
    const testingGroup = value.testingGroup;
    const activationStaus = value.activationStatus;
})