const yearNode = document.getElementById("year");
const lastModNode = document.getElementById("last-modified");

if (yearNode) yearNode.textContent = new Date().getFullYear();
if (lastModNode) lastModNode.textContent = document.lastModified;