const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Salt Lake Utah",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 382207,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-5722-thumb.jpg"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41000,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-43513-thumb.jpg"
  },
  {
    templeName: "Fukuoka Japan",
    location: "Fukuoka, Japan",
    dedicated: "2000, June, 11",
    area: 10700,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/fukuoka-japan-temple/fukuoka-japan-temple-23844-thumb.jpg"
  },
  {
    templeName: "Dallas Texas",
    location: "Dallas, Texas, United States",
    dedicated: "1984, October, 19",
    area: 44207,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/dallas-texas-temple/dallas-texas-temple-55221-thumb.jpg"
  },
  {
    templeName: "Campinas Brazil",
    location: "Campinas, São Paulo, Brazil",
    dedicated: "2002, May, 17",
    area: 48100,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/campinas-brazil-temple/campinas-brazil-temple-6013-thumb.jpg"
  }
];

/* --------------------------------------------------------------------------
  HELPERS
-------------------------------------------------------------------------- */

/** Get the 4-digit year */
function getYearFromDedicated(dateString) {
  if (!dateString) return NaN;
  const parts = String(dateString).split(',');
  const year = parseInt(parts[0], 10);
  return Number.isFinite(year) ? year : NaN;
}

/** Capitalize the first letter of a word (for the page heading). */
function capitalize(word) {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1);
}

/* --------------------------------------------------------------------------
  FILTERS
-------------------------------------------------------------------------- */

const filters = {
  home: function (list) {
    return list;
  },
  old: function (list) {
    return list.filter(function (t) {
      return getYearFromDedicated(t.dedicated) < 1900;
    });
  },
  new: function (list) {
    return list.filter(function (t) {
      return getYearFromDedicated(t.dedicated) > 2000;
    });
  },
  large: function (list) {
    return list.filter(function (t) {
      return t.area > 90000;
    });
  },
  small: function (list) {
    return list.filter(function (t) {
      return t.area < 10000;
    });
  }
};

function applyFilter(filterName) {
  // Default to "home"
  if (!filters.hasOwnProperty(filterName)) {
    filterName = 'home';
  }

  // Update the page heading text
  const heading = document.querySelector('.page-heading');
  if (heading) {
    heading.textContent = capitalize(filterName);
  }

  // Update the active nav state
  const navLinks = document.querySelectorAll('.nav-link');
  for (const link of navLinks) {
    const thisFilter = link.getAttribute('data-filter');
    if (thisFilter === filterName) {
      link.classList.add('is-current');
    } else {
      link.classList.remove('is-current');
    }
  }

  // Get data for this filter
  const listCopy = temples.slice();
  const filteredList = filters[filterName](listCopy);

  // Re-render the cards
  renderCards(filteredList);
}

(function setupFilteringNav() {
  const nav = document.getElementById('primary-nav');
  if (!nav) return;

  nav.addEventListener('click', function (event) {
    const link = event.target.closest('a[data-filter]');
    if (!link) return;

    event.preventDefault();
    const filterName = link.getAttribute('data-filter');
    applyFilter(filterName);
  });
})();

document.addEventListener('DOMContentLoaded', function () {
  applyFilter('home');
});

/* --------------------------------------------------------------------------
  CARD BUILDING
-------------------------------------------------------------------------- */

function buildCard(temple) {
  const figure = document.createElement('figure');
  figure.className = 'card';

  figure.innerHTML =
    '<picture>' +
    '<img src="' + temple.imageUrl + '" alt="' + temple.templeName + '" loading="lazy">' +
    '</picture>' +
    '<figcaption>' +
    '<strong>' + temple.templeName + '</strong><br>' +
    '<span>' + temple.location + '</span><br>' +
    '<span>Dedicated: ' + temple.dedicated + '</span><br>' +
    '<span>Area: ' + Number(temple.area).toLocaleString() + ' sq ft</span>' +
    '</figcaption>';

  return figure;
}

function renderCards(templeList) {
  const gallery = document.querySelector('section.gallery');
  if (!gallery) return;

  gallery.innerHTML = '';

  for (const temple of templeList) {
    const card = buildCard(temple);
    gallery.appendChild(card);
  }
}

/* --------------------------------------------------------------------------
  NAV
-------------------------------------------------------------------------- */

(function setupHamburgerMenu() {
  const button = document.getElementById('menu-toggle');
  const nav = document.getElementById('primary-nav');
  if (!button || !nav) return;

  function openMenu() {
    nav.classList.add('open');
    button.setAttribute('aria-expanded', 'true');
    button.textContent = '✕';
  }

  function closeMenu() {
    nav.classList.remove('open');
    button.setAttribute('aria-expanded', 'false');
    button.textContent = '☰';
  }

  function toggleMenu() {
    if (nav.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  button.addEventListener('click', function (event) {
    event.preventDefault();
    toggleMenu();
  });

  // auto-close the menu
  var wasMobile = matchMedia('(max-width: 767.98px)').matches;
  addEventListener('resize', function () {
    var isMobile = matchMedia('(max-width: 767.98px)').matches;
    if (!isMobile && wasMobile) {
      closeMenu();
    }
    wasMobile = isMobile;
  });
})();

/* --------------------------------------------------------------------------
  FOOTER 
-------------------------------------------------------------------------- */

(function setupFooterMeta() {
  const yearEl = document.getElementById('year');
  const lmEl = document.getElementById('last-modified');

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
  if (lmEl) {
    lmEl.textContent = document.lastModified;
  }
})();