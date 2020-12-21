/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
const sections = document.querySelectorAll("section");
const navUl = document.getElementById("navbar__list");
const backToTopElement = document.getElementById("backToTop");
const pageHeader = document.querySelector(".page__header");
/**
 * End Global Variables
 * Start Helper Functions
 *
 */

backToTopElement.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});
/***
 * function that returns true if the element in current viewport
 *  @param {HTMLElement} element - section
 */
const elementFromTop = (element) => {
  const {
    top: distTop,
    height: elementHeight,
  } = element.getBoundingClientRect();

  if (distTop <= 200 && distTop + elementHeight > 200) {
    return true;
  }
  return false;
};

/***
 * @description function that add active class to nav anchor based on the current
 * active section
 * @param {HTMLElement} element - the current active section
 */
const activeNav = (element) => {
  let navItems = navUl.querySelectorAll("li a");
  for (item of navItems) {
    item.className = "";
    if (item.dataset.section === element.id) {
      item.className = "active";
    }
  }
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
const buildNav = () => {
  let navContainer = document.createDocumentFragment();
  for (const section of sections) {
    let navLi = document.createElement("li");
    let navAnchor = document.createElement("a");
    let navText = document.createTextNode(section.dataset.nav);
    navAnchor.href = `#${section.id}`;
    navAnchor.dataset.section = section.id;
    navAnchor.appendChild(navText);

    // Scroll to anchor ID using scrollTO event
    navAnchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
    navLi.appendChild(navAnchor);
    navContainer.appendChild(navLi);
  }
  navUl.appendChild(navContainer);
};

// Add class 'active' to section when near top of viewport
const activeSection = () => {
  window.addEventListener("scroll", function (e) {
    if (window.pageYOffset > window.innerHeight) {
      backToTopElement.className = "active";
    } else {
      backToTopElement.className = "";
    }
    for (const section of sections) {
      section.className = "";

      if (elementFromTop(section)) {
        activeNav(section);
        section.className = "active";
      }
    }
  });
};

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
buildNav();

// Set sections as active
activeSection();

window.onload = function (e) {
  let timeOut;
  const initTimeOut = () => {
    timeOut = setTimeout(() => {
      pageHeader.style.cssText = "transform: translateY(-40px)";
    }, 2000);
  };
  initTimeOut();
  document.addEventListener("scroll", () => {
    pageHeader.style.cssText = "transform: translateY(0)";
    clearTimeout(timeOut);
    initTimeOut();
  });
};
