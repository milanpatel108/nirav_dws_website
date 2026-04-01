// Simple script to handle navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(13, 17, 23, 0.95)';
        navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(13, 17, 23, 0.85)';
        navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.05)';
    }
});

// Proactive: Intersection Observer for fade-in animations on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .section-header, .quote blockquote').forEach(el => {
    observer.observe(el);
});
