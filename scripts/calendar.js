import today from "./dates.js";

const calendar = document.querySelector("#calendar-body");
const currentMonth = document.querySelector("#month");

const hideButton = document.querySelector("#hide-calendar");
const prevButton = document.querySelector("#previous-month");
const nextButton = document.querySelector("#next-month");

function displayCalendar() {
  currentMonth.textContent = `${today.toLocaleString("default", {
    month: "long",
  })} ${today.getFullYear().toString()}`;
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
