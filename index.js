// Premium Interactivity for Dynamic Workspaces

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Parallax Effect on Hero Image
    window.addEventListener('scroll', () => {
        const offset = window.pageYOffset;
        if (heroImage) {
            heroImage.style.backgroundPositionY = `${offset * 0.5}px`;
        }
    });

    // Reveal on Scroll using Intersection Observer
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Elements to reveal
    const revealElements = [
        '.section-title', 
        '.hero-content', 
        '.location-card', 
        '.service-item', 
        '.trust-item'
    ];

    revealElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.style.opacity = '0';
            revealObserver.observe(el);
        });
    });

    // Smooth Scrolling for links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 125, // Offset for new fixed nav height
                    behavior: 'smooth'
                });
            }
        });
    });
    // Mobile Menu Toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !navToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.replace('fa-times', 'fa-bars');
            });
        });
    }
});
