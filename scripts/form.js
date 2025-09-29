
const products = [
  { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
  { id: "fc-2050", name: "power laces", averagerating: 4.7 },
  { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
  { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
  { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 },
];

document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("product");
  if (select) {
    products.forEach(p => {
      const opt = document.createElement("option");

      opt.value = p.id;
      opt.textContent = p.name;
      opt.dataset.productName = p.name;
      select.appendChild(opt);
    });
  }

  const form = document.getElementById("reviewForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      const ratingChecked = !!form.querySelector('input[name="rating"]:checked');
      if (!ratingChecked) {
        alert("Please select an overall rating.");
        e.preventDefault();
      }
    });
  }
});
