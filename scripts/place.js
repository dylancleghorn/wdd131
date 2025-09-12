document.addEventListener("DOMContentLoaded", () => {
    /* -----------------------------
     * Footer: year + last modified
     * ----------------------------- */
    const yearNode = document.getElementById("year");
    const lastModNode = document.getElementById("last-modified");

    if (yearNode) yearNode.textContent = new Date().getFullYear();
    if (lastModNode) lastModNode.textContent = document.lastModified;

    /* -----------------------------
     * Weather updates
     * ----------------------------- */
    const UNITS = "metric";
    const TEMP = 10;
    const WIND = 10;

    const tempNode = document.getElementById("temp-display");
    const windNode = document.getElementById("wind-display");
    const chillNode = document.getElementById("windchill");

    const SYMBOLS = {
        metric: { temp: "°C", wind: "km/h" },
        imperial: { temp: "°F", wind: "mph" }
    };

    // Render the static values
    if (tempNode) tempNode.textContent = `${TEMP} ${SYMBOLS[UNITS].temp}`;
    if (windNode) windNode.textContent = `${WIND} ${SYMBOLS[UNITS].wind}`;

    // Wind chill formulas:
    const calculateWindChill = (t, v, units = "metric") =>
        units === "imperial"
            ? Math.round(10 * (35.74 + 0.6215 * t - 35.75 * Math.pow(v, 0.16) + 0.4275 * t * Math.pow(v, 0.16))) / 10
            : Math.round(10 * (13.12 + 0.6215 * t - 11.37 * Math.pow(v, 0.16) + 0.3965 * t * Math.pow(v, 0.16))) / 10;

    // Validity rules for when to compute wind chill
    const meetsWindChillConditions = (t, v, units = "metric") => {
        if (units === "imperial") return t <= 50 && v > 3;
        return t <= 10 && v > 4.8;
    };

    // Compute + display (or N/A)
    const renderWindChill = () => {
        if (!chillNode) return;

        if (meetsWindChillConditions(TEMP, WIND, UNITS)) {
            const wc = calculateWindChill(TEMP, WIND, UNITS);
            chillNode.textContent = `${wc} ${SYMBOLS[UNITS].temp}`;
        } else {
            chillNode.textContent = "N/A";
        }
    };

    renderWindChill();
});
