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
const listOfSections = document.querySelectorAll('.landing__container');
const navMenu = document.getElementById('navbar__list');
/**
 * End Global Variables
 * Start Helper Functions
 *
*/



/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
for (var i = 0; i < listOfSections.length; i++) {
    var section = listOfSections[i];
    var menuItem = document.createElement('li');
    var menuLink = document.createElement('a');
    var menuItemName = section.querySelector('h2').innerText;
    var menuLinkText = '#' + section.parentElement.getAttribute('id');
    menuLink.setAttribute('class', 'menu__link');
    menuLink.setAttribute('href', menuLinkText);
    menuLink.setAttribute('transition', 'all .2s ease-in-out');
    //menuItem.insertAdjacentHTML('afterbegin', '<a class="menuLink" href="${section.parentElement.attributes.id}"><\a>');
    menuItem.appendChild(menuLink);
    menuItem.querySelector('a').innerText = menuItemName;
    navMenu.appendChild(menuItem);
    console.log(section.parentElement.getAttribute('id'));
}


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu

// Scroll to section on link click

// Set sections as active
