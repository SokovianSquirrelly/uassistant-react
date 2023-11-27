const today = new Date();

const yearElement = document.querySelector('#year');
yearElement.textContent = today.getFullYear().toString();

export default today;