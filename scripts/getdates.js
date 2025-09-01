const currentYearEl = document.querySelector('#currentyear');
const lastModifiedEl = document.querySelector('#lastModified');

const now = new Date();
currentYearEl.textContent = now.getFullYear();

lastModifiedEl.textContent = `Last Modified: ${document.lastModified}`;