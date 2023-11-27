import today from "./dates.js";

const currYear = today.getFullYear();
const currMonth = today.getMonth();

const calendar = document.querySelector("#calendar-body");
const currentMonth = document.querySelector("#month");

const hideButton = document.querySelector("#hide-calendar");
const prevButton = document.querySelector("#previous-month");
const nextButton = document.querySelector("#next-month");

function displayCalendar() {
  currentMonth.textContent = `${today.toLocaleString("default", {
    month: "long",
  })} ${today.getFullYear().toString()}`;

  let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
  let lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
  let lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay();
  let lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();
}

hideButton.addEventListener("click", () => {
  calendar.classList.toggle("hidden");
  hideButton.classList.toggle("hidden");
});

prevButton.addEventListener("click", () => {

});

nextButton.addEventListener("click", () => {

});

displayCalendar();
