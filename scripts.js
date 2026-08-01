document.addEventListener('DOMContentLoaded', function() {
    const setupHamburgerMenu = () => {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        const navLinks = Array.from(document.querySelectorAll('.nav-link'));
        const main = document.getElementById('main-content');
        const footer = document.querySelector('.footer');

        if (!hamburger || !navMenu) {
            return;
        }

        const isMobileNav = () => window.innerWidth <= 768;

        const getFocusableInMenu = () => [hamburger, ...navLinks];

        const setBackgroundInert = (inert) => {
            if (main) {
                main.inert = inert;
            }
            if (footer) {
                footer.inert = inert;
            }
        };

        const setMenuOpen = (open) => {
            const mobile = isMobileNav();

            hamburger.classList.toggle('active', open);
            navMenu.classList.toggle('active', open);
            hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
            hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');

            if (mobile) {
                navMenu.setAttribute('aria-hidden', open ? 'false' : 'true');
                navLinks.forEach((link) => {
                    if (open) {
                        link.removeAttribute('tabindex');
                    } else {
                        link.setAttribute('tabindex', '-1');
                    }
                });
                setBackgroundInert(open);
                document.body.style.overflow = open ? 'hidden' : '';

                if (open) {
                    const firstLink = navLinks[0];
                    if (firstLink) {
                        firstLink.focus();
                    }
                }
            } else {
                navMenu.removeAttribute('aria-hidden');
                navLinks.forEach((link) => link.removeAttribute('tabindex'));
                setBackgroundInert(false);
                document.body.style.overflow = '';
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.setAttribute('aria-label', 'Open menu');
            }
        };

        const closeMenu = () => setMenuOpen(false);
        const toggleMenu = () => setMenuOpen(!navMenu.classList.contains('active'));

        // Initial mobile state: menu closed and not tabbable
        setMenuOpen(false);

        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });

        navLinks.forEach((link) => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('click', function(event) {
            if (!isMobileNav() || !navMenu.classList.contains('active')) {
                return;
            }
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                closeMenu();
            }
        });

        document.addEventListener('keydown', function(event) {
            if (!isMobileNav() || !navMenu.classList.contains('active')) {
                return;
            }

            if (event.key === 'Escape') {
                closeMenu();
                hamburger.focus();
                return;
            }

            if (event.key !== 'Tab') {
                return;
            }

            const focusables = getFocusableInMenu().filter(
                (el) => el && el.offsetParent !== null || el === hamburger
            );
            if (focusables.length === 0) {
                return;
            }

            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            const active = document.activeElement;

            if (event.shiftKey) {
                if (active === first || !navMenu.contains(active) && active !== hamburger) {
                    event.preventDefault();
                    last.focus();
                }
            } else if (active === last) {
                event.preventDefault();
                first.focus();
            }
        });

        navMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        window.addEventListener('resize', function() {
            setMenuOpen(false);
        });
    };

    const setupFAQAccordion = () => {
        const faqSection = document.getElementById('faq');
        if (!faqSection) {
            return;
        }

        const faqQuestions = faqSection.querySelectorAll('.faq-question');

        const closeAll = (except) => {
            faqQuestions.forEach((question) => {
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
                // Best-effort host-side attributes; widget internals remain third-party
                iframe.setAttribute('loading', 'lazy');
                if (!iframe.getAttribute('referrerpolicy')) {
                    iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
                }
            });
        };

        titleIframes();

        const observer = new MutationObserver(titleIframes);
        observer.observe(widgetRoot, { childList: true, subtree: true });
    };

    const setupCalendarCardBackgrounds = () => {
        const cards = Array.from(document.querySelectorAll('.calendar-card[data-card-bg]'));
        if (!cards.length) {
            return;
        }

        const enableBg = (card) => {
            card.classList.add('calendar-bg-on');
        };

        if (!('IntersectionObserver' in window)) {
            cards.forEach(enableBg);
            return;
        }

        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }
                    enableBg(entry.target);
                    obs.unobserve(entry.target);
                });
            },
            {
                rootMargin: '200px 0px',
                threshold: 0.01
            }
        );

        cards.forEach((card) => {
            if (card.classList.contains('calendar-bg-on')) {
                return;
            }
            observer.observe(card);
        });
    };

    setupHamburgerMenu();
    setupFAQAccordion();
    setupThirdPartyWidgetA11y();
    setupCalendarCardBackgrounds();

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
            window.scrollTo(0, 0);
        });
    }
});
