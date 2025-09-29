
// --- Increment localStorage counter and show the count ---
(function () {
    const KEY = "w05_review_count";
    const current = parseInt(localStorage.getItem(KEY) || "0", 10);
    const next = current + 1;
    localStorage.setItem(KEY, String(next));
    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('reviewCount').textContent = String(next);

        // Build the submission summary from URL params
        const params = new URLSearchParams(window.location.search);
        const dl = document.getElementById('summaryList');

        const map = [
            ["product", "Product"],
            ["rating", "Overall Rating"],
            ["installed", "Date of Installation"],
            ["features", "Useful Features"],
            ["review", "Written Review"],
            ["username", "User Name"]
        ];

        map.forEach(([key, label]) => {
            if (params.has(key)) {
                // If multiple values (e.g., checkboxes), join with commas
                const values = params.getAll(key);
                const val = values.length > 1 ? values.join(", ") : values[0];
                const dt = document.createElement('dt');
                const dd = document.createElement('dd');
                dt.textContent = label;
                dd.textContent = val || "—";
                dl.appendChild(dt);
                dl.appendChild(dd);
            }
        });
    });
})();