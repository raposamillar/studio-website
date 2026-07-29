// Initialize page interactions
document.addEventListener('DOMContentLoaded', function() {
    // Setup hamburger menu
    const setupHamburgerMenu = () => {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });

            document.addEventListener('click', function(event) {
                if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });

            navMenu.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    };

    // Setup FAQ accordion (faq page only)
    const setupFAQAccordion = () => {
        const faqSection = document.getElementById('faq');
        if (!faqSection) {
            return;
        }

        const faqQuestions = faqSection.querySelectorAll('.faq-question');

        faqQuestions.forEach((question) => {
            question.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                const faqId = this.getAttribute('data-faq');
                const answer = document.getElementById(`faq-answer-${faqId}`);
                const chevron = this.querySelector('.faq-chevron');
                const isCurrentlyActive = this.classList.contains('active');

                faqQuestions.forEach(otherQuestion => {
                    const otherFaqId = otherQuestion.getAttribute('data-faq');
                    const otherAnswer = document.getElementById(`faq-answer-${otherFaqId}`);
                    const otherChevron = otherQuestion.querySelector('.faq-chevron');

                    otherQuestion.classList.remove('active');
                    if (otherAnswer) {
                        otherAnswer.classList.remove('active');
                    }
                    if (otherChevron) {
                        otherChevron.style.transform = 'rotate(0deg)';
                    }
                });

                if (!isCurrentlyActive) {
                    this.classList.add('active');
                    if (answer) {
                        answer.classList.add('active');
                    }
                    if (chevron) {
                        chevron.style.transform = 'rotate(180deg)';
                    }
                }
            });
        });
    };

    setupHamburgerMenu();
    setupFAQAccordion();

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

    const setViewportHeight = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', () => {
        setTimeout(setViewportHeight, 100);
    });

    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'class') {
                    if (navMenu.classList.contains('active')) {
                        document.body.style.overflow = 'hidden';
                        document.body.style.position = 'fixed';
                        document.body.style.width = '100%';
                    } else {
                        document.body.style.overflow = '';
                        document.body.style.position = '';
                        document.body.style.width = '';
                    }
                }
            });
        });

        observer.observe(navMenu, { attributes: true });
    }

    // Back-to-Top Button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
