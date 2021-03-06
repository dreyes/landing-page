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
const mainMenu = document.querySelector('.page__header');
const navMenu = document.getElementById('navbar__list');
const scrollTopBtn = document.querySelector('.floating__button');
const listOfContent = document.querySelectorAll('.content');
let timeVar;
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
    // Adding class for styling
    menuLink.setAttribute('class', 'menu__link');
    // Adds a tag element to the list item
    menuItem.appendChild(menuLink);
    menuItem.querySelector('a').innerText = menuItemName;
    // Adds the list item to the unordered list
    navMenu.appendChild(menuItem);
}


// Add class 'active' to section when near top of viewport
function isNearViewport (element) {
    let bounding = element.getBoundingClientRect();
    // The 70 value gives allows for the element to be selected, while getting
    // close to the top.
    return bounding.top <= 70 && bounding.top >= 70 - bounding.height ? true : false;
}

// Scroll to anchor ID using scrollTO event
function scrollToPosition (linkTo) {
    linkTo.scrollIntoView({behavior: 'smooth'});
}

// Hide nav menu afterscroll
function hideNavMenu () {
    // The Timeout function hides the Nav Bar after 1.5 seconds of not scrolling
    timeVar = setTimeout(function () {
        mainMenu.style.transition = 'opacity 0.6s ease';
        // Opacity 0 hides the Nav Bar with a smooth transition of 0.6s
        mainMenu.style.opacity = 0;
        hideScrollTopBtn();
    }, 1500);

}

function showNavMenu () {
    mainMenu.style.transition = 'opacity 0.3s ease';
    // Opacity 1 shows the Nav Bar with a smooth transition of 0.3s
    mainMenu.style.opacity = 1;
    // This function interrupts the hide timeout to stop hiding when the
    // viewport passes from a in Y greater than 120px to 120px or lower.
    // The 120px come from the scroll eventListener if.
    clearTimeout(timeVar);
}

function hideScrollTopBtn () {
    scrollTopBtn.style.transition = 'opacity 0.6s ease';
    // Opacity 0 hides the Nav Bar with a smooth transition of 0.6s
    scrollTopBtn.style.opacity = 0;
    scrollTopBtn.style.display = 'none';
}

function showScrollTopBtn () {
    scrollTopBtn.style.display = 'block';
    scrollTopBtn.style.transition = 'opacity 0.3s ease';
    // Opacity 1 shows the Nav Bar with a smooth transition of 0.3s
    scrollTopBtn.style.opacity = 1;
}

/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu

// Scroll to section on link click
const anchors = navMenu.getElementsByTagName('a');
for (let i = 0; i < anchors.length; i++) {
    // The menu is created in the same order as the elements on the page.
    // The [i] allows us to target the same element on the main menu
    // corresponding to the section on the page.
    let linkFrom = anchors[i];
    let linkTo = listOfSections[i];
    // Event listener to go to the position of the clicked element.
    linkFrom.addEventListener ('click', function() {
        scrollToPosition(linkTo);
    })
}

// Set sections as active
document.addEventListener('scroll', function(){
    for (let i = 0; i < listOfSections.length; i++) {
        let section = listOfSections[i];
        /* Using the dataset attribute from the parent element we can collect the
        // name to be used in the menu.
        // Another option could be to use:
        // let activeSection = section.querySelector('h2').innerText;
        // that option could guarantee the same name. */
        let activeSection = section.parentElement.dataset.nav;
        const menuList = navMenu.querySelectorAll('a');
        // This will review the current section in the viewport to set as active.
        if (isNearViewport(section) && !section.classList.contains("collapse")) {
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
    // The following if statement shows or hides the NavBar and ScrollTopBtn.
    // This is done when the pageYOffset is creater than 120px.
    showNavMenu();
    if (window.pageYOffset < 120) {
    // While at the top, the NavBar remains shown and the ScrollTopBtn is hidden.
        showNavMenu();
        hideScrollTopBtn();
    } else {
    // When scrolling below 120px the ScrollTopBtn is shown and hideNavMenu function gets excecuted.
        showScrollTopBtn();
        hideNavMenu();
    }

})

// Event listener to show main menu while hovering on top of it.
mainMenu.addEventListener('mouseenter', function() {
    if (window.pageYOffset >= 120) {
        showNavMenu();
        showScrollTopBtn();
        // Event listener to hide main menu when hovering on top of it stops.
        mainMenu.addEventListener('mouseleave', function() {
            hideNavMenu();
        })
    }
})

// Event listener to scroll to top on click of the button, it uses a smooth effect.
scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
})

// The event listener below prevents the NavBar and scrollTopBtn to hide if the mouse
// pointer is hovering over the button.
scrollTopBtn.addEventListener('mouseenter', function() {
    showNavMenu();
    showScrollTopBtn();
    scrollTopBtn.addEventListener('mouseleave', function() {
        hideNavMenu();
    })

})

// This for loop adds the collapse functionality to all sections
for (let i = 0; i < listOfSections.length; i++) {
    let section = listOfSections[i];
    let collapseBtn = section.querySelector('a');
    // The event listener click will change the behavior of the button.
    collapseBtn.addEventListener('click', function() {
        listOfContent[i].classList.toggle('collapse');
        section.classList.remove('your-active-class');
        collapseBtn.classList.toggle('expand__btn');
        collapseBtn.classList.toggle('collapse__btn');
    })
}
