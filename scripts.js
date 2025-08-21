// Ensure scrollToSection is globally accessible
window.scrollToSection = function(sectionId) {
    console.log('Scrolling to section:', sectionId);
    const section = document.getElementById(sectionId);
    if (section) {
        const navHeight = document.querySelector('.navbar')?.offsetHeight || 60;
        const sectionTop = section.offsetTop - navHeight;
        
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    } else {
        console.error('Section not found:', sectionId);
    }
};

// Initialize hero interactions
document.addEventListener('DOMContentLoaded', function() {
    // Setup hamburger menu
    const setupHamburgerMenu = () => {
        console.log('Setting up hamburger menu...');
        
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (hamburger && navMenu) {
            // Toggle menu when hamburger is clicked
            hamburger.addEventListener('click', function() {
                console.log('Hamburger clicked');
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
            
            // Close menu when a nav link is clicked
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    console.log('Nav link clicked');
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(event) {
                if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        }
    };

    // Setup hero buttons
    const setupHeroButtons = () => {
        console.log('Setting up hero buttons...');

        // Explore Lessons button
        const exploreLessonsBtn = document.querySelector('.welcome-buttons .btn-primary');
        if (exploreLessonsBtn) {
            exploreLessonsBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Explore Lessons button clicked');
                window.scrollToSection('lessons');
            });
        }

        // Contact Us button
        const contactUsBtn = document.querySelector('.welcome-buttons .btn-outline');
        if (contactUsBtn) {
            contactUsBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Contact Us button clicked');
                window.scrollToSection('contact');
            });
        }
    };

    // Setup chevron and scroll indicator
    const setupChevron = () => {
        console.log('Setting up chevron...');

        const chevronDown = document.querySelector('.chevron-down');
        const scrollIndicator = document.querySelector('.scroll-indicator');

        const handleChevronClick = () => {
            console.log('Chevron clicked');
            window.scrollToSection('about');
        };

        if (chevronDown) {
            chevronDown.addEventListener('click', handleChevronClick);
            chevronDown.style.cursor = 'pointer';
        }

        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', handleChevronClick);
            scrollIndicator.style.cursor = 'pointer';
        }
    };

    // Initialize all interactions
    setupHamburgerMenu();
    setupHeroButtons();
    setupChevron();
});