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
 * Define Global letiables
 *
*/
const listOfSections = document.querySelectorAll('.landing__container');
const navMenu = document.getElementById('navbar__list');
/**
 * End Global letiables
 * Start Helper Functions
 *
*/



/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
for (let i = 0; i < listOfSections.length; i++) {
    let section = listOfSections[i];
    let menuItem = document.createElement('li');
    let menuLink = document.createElement('a');
    let menuItemName = section.querySelector('h2').innerText;
    //let menuLinkText = '#' + section.parentElement.getAttribute('id');
    menuLink.setAttribute('class', 'menu__link');
    //menuLink.setAttribute('href', menuLinkText);
    menuLink.setAttribute('transition', 'all .2s ease-in-out');
    menuItem.appendChild(menuLink);
    menuItem.querySelector('a').innerText = menuItemName;
    navMenu.appendChild(menuItem);
}


// Add class 'active' to section when near top of viewport
function isNearViewport (element) {
    let bounding = element.getBoundingClientRect();
    if (bounding.top <= 70 && bounding.top >= 70 - bounding.height) {
        return true;
    } else {
        return false;
    }
};

// Scroll to anchor ID using scrollTO event
function scrollToPosition (linkTo) {
    linkTo.scrollIntoView({behavior: 'smooth'});
};

/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu

// Scroll to section on link click

const anchors = navMenu.getElementsByTagName('a');
for (let i = 0; i < anchors.length; i++) {
    let linkFrom = anchors[i];
    let linkTo = listOfSections[i];
    linkFrom.addEventListener ('click', function() {
        scrollToPosition(linkTo);
    })
}

// Set sections as active
document.addEventListener('scroll', function(){
    for (let i = 0; i < listOfSections.length; i++) {
        let section = listOfSections[i];
        let activeSection = section.querySelector('h2').innerText;
        const menuList = navMenu.querySelectorAll('a');
        if (isNearViewport(section)) {
            section.parentElement.classList.add('your-active-class');
            for (let i = 0; i < menuList.length; i++) {
                if(activeSection === menuList[i].innerText) {
                    menuList[i].classList.add('active');
                } else {
                    menuList[i].classList.remove('active');
                }
            }
        } else {
            section.parentElement.classList.remove('your-active-class');
            menuList[i].classList.remove('active');
        }
    }
})
