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
            hamburger.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
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
            
            // Close menu when clicking outside (but not on hamburger)
            document.addEventListener('click', function(event) {
                if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
            
            // Prevent menu from closing when clicking inside the menu
            navMenu.addEventListener('click', function(e) {
                e.stopPropagation();
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
        const chevronLink = document.querySelector('.chevron-link');

        const handleChevronClick = (e) => {
            e.preventDefault();
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
        
        if (chevronLink) {
            chevronLink.addEventListener('click', handleChevronClick);
        }
    };

    // Setup form submission
    const setupContactForm = () => {
        console.log('Contact form replaced with MyMusicStaff widget');
        // Form handling removed since we're using external widget
    };

    // Setup FAQ accordion
    const setupFAQAccordion = () => {
        console.log('Setting up FAQ accordion...');
        
        // Get all FAQ questions specifically within the FAQ section
        const faqSection = document.getElementById('faq');
        if (!faqSection) {
            console.log('FAQ section not found');
            return;
        }
        
        const faqQuestions = faqSection.querySelectorAll('.faq-question');
        console.log('Found FAQ questions:', faqQuestions.length);
        
        faqQuestions.forEach((question, index) => {
            question.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('FAQ question clicked:', index + 1);
                
                const faqId = this.getAttribute('data-faq');
                const answer = document.getElementById(`faq-answer-${faqId}`);
                const chevron = this.querySelector('.faq-chevron');
                const faqIcon = this.querySelector('.faq-icon');
                const isCurrentlyActive = this.classList.contains('active');
                
                console.log('FAQ ID:', faqId, 'Currently active:', isCurrentlyActive);
                
                // Close all FAQ items first
                faqQuestions.forEach(otherQuestion => {
                    const otherFaqId = otherQuestion.getAttribute('data-faq');
                    const otherAnswer = document.getElementById(`faq-answer-${otherFaqId}`);
                    const otherChevron = otherQuestion.querySelector('.faq-chevron');
                    const otherIcon = otherQuestion.querySelector('.faq-icon');
                    
                    // Remove active class from question and answer
                    otherQuestion.classList.remove('active');
                    if (otherAnswer) {
                        otherAnswer.classList.remove('active');
                    }
                    
                    // Reset chevron rotation
                    if (otherChevron) {
                        otherChevron.style.transform = 'rotate(0deg)';
                    }
                });
                
                // If this question wasn't active, open it
                if (!isCurrentlyActive) {
                    this.classList.add('active');
                    if (answer) {
                        answer.classList.add('active');
                    }
                    if (chevron) {
                        chevron.style.transform = 'rotate(180deg)';
                    }
                    console.log('Opened FAQ:', faqId);
                } else {
                    console.log('Closed FAQ:', faqId);
                }
            });
        });
    };

    // Setup smooth scrolling for all anchor links
    const setupSmoothScrolling = () => {
        console.log('Setting up smooth scrolling...');
        
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const sectionId = href.substring(1);
                    if (sectionId) {
                        window.scrollToSection(sectionId);
                    }
                }
            });
        });
    };

    // Initialize all interactions
    setupHamburgerMenu();
    setupHeroButtons();
    setupChevron();
    setupContactForm();
    setupFAQAccordion();
    setupSmoothScrolling();
    
    // Handle window resize to close mobile menu if window gets larger
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('navMenu');
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });
});