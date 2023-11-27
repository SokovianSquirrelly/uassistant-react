import today from "./dates.js";

const calendar = document.querySelector("#calendar-body");
const currentMonth = document.querySelector("#month");

function displayCalendar() {
  currentMonth.textContent = `${today.toLocaleString("default", {
    month: "long",
  })} ${today.getFullYear().toString()}`;
}

displayCalendar()
