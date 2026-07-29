document.addEventListener('DOMContentLoaded', function() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const setupHamburgerMenu = () => {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (!hamburger || !navMenu) {
            return;
        }

        const setMenuOpen = (open) => {
            hamburger.classList.toggle('active', open);
            navMenu.classList.toggle('active', open);
            hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
            hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');

            if (open) {
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.width = '100%';
                const firstLink = navMenu.querySelector('.nav-link');
                if (firstLink) {
                    firstLink.focus();
                }
            } else {
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
            }
        };

        const closeMenu = () => setMenuOpen(false);
        const toggleMenu = () => setMenuOpen(!navMenu.classList.contains('active'));

        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });

        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                closeMenu();
            }
        });

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMenu();
                hamburger.focus();
            }
        });

        navMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });
    };

    const setupFAQAccordion = () => {
        const faqSection = document.getElementById('faq');
        if (!faqSection) {
            return;
        }

        const faqQuestions = faqSection.querySelectorAll('.faq-question');

        const closeAll = (except) => {
            faqQuestions.forEach(question => {
                if (question === except) {
                    return;
                }
                const faqId = question.getAttribute('data-faq');
                const answer = document.getElementById(`faq-answer-${faqId}`);
                question.classList.remove('active');
                question.setAttribute('aria-expanded', 'false');
                if (answer) {
                    answer.classList.remove('active');
                    answer.hidden = true;
                }
            });
        };

        faqQuestions.forEach((question) => {
            question.addEventListener('click', function() {
                const faqId = this.getAttribute('data-faq');
                const answer = document.getElementById(`faq-answer-${faqId}`);
                const isOpen = this.getAttribute('aria-expanded') === 'true';

                closeAll(this);

                if (!isOpen) {
                    this.classList.add('active');
                    this.setAttribute('aria-expanded', 'true');
                    if (answer) {
                        answer.hidden = false;
                        answer.classList.add('active');
                    }
                } else {
                    this.classList.remove('active');
                    this.setAttribute('aria-expanded', 'false');
                    if (answer) {
                        answer.classList.remove('active');
                        answer.hidden = true;
                    }
                }
            });
        });
    };

    const setupThirdPartyWidgetA11y = () => {
        const widgetRoot = document.getElementById('mymusicstaff-widget');
        if (!widgetRoot) {
            return;
        }

        const titleIframes = () => {
            widgetRoot.querySelectorAll('iframe').forEach((iframe) => {
                if (!iframe.getAttribute('title')) {
                    iframe.setAttribute('title', 'Lesson inquiry form');
                }
            });
        };

        titleIframes();

        const observer = new MutationObserver(titleIframes);
        observer.observe(widgetRoot, { childList: true, subtree: true });
    };

    setupHamburgerMenu();
    setupFAQAccordion();
    setupThirdPartyWidgetA11y();

    const setViewportHeight = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', () => {
        setTimeout(setViewportHeight, 100);
    });

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
            window.scrollTo({
                top: 0,
                behavior: prefersReducedMotion ? 'auto' : 'smooth'
            });
        });
    }
});
