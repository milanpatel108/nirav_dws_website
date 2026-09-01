// Premium Interactivity for Dynamic Workspaces

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    // Optimized Scroll Handlers with requestAnimationFrame
    let scrollTicking = false;
    let lastScrollY = window.scrollY;

    const updateNavbar = () => {
        const currentScrollY = window.scrollY;
        
        // Navbar Scroll Effect - 100px threshold
        if (currentScrollY > 100) {
            if (!navbar.classList.contains('scrolled')) {
                navbar.classList.add('scrolled');
            }
        } else {
            if (navbar.classList.contains('scrolled')) {
                navbar.classList.remove('scrolled');
            }
        }

        // Parallax Effect on Hero Image - Disabled on Mobile for performance/stability
        if (heroImage && window.innerWidth > 992) {
            heroImage.style.transform = `translate3d(0, ${currentScrollY * 0.15}px, 0)`; 
        }
        
        lastScrollY = currentScrollY;
        scrollTicking = false;
    };

    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            window.requestAnimationFrame(updateNavbar);
            scrollTicking = true;
        }
    }, { passive: true });

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

    // Elements to reveal - Yielding to main thread
    const setupObservers = () => {
        const revealElements = [
            '.section-title', 
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
    };

    if ('requestIdleCallback' in window) {
        requestIdleCallback(setupObservers);
    } else {
        setTimeout(setupObservers, 100);
    }

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
                document.body.style.overflow = 'hidden'; // Prevent background scroll
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
                document.body.style.overflow = '';
                document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('panel-active'));
            }
        });

        // Accordion Sub-menu Logic (Mobile Only)
        const setupMobilePanels = () => {
            document.querySelectorAll('.nav-item').forEach(item => {
                const link = item.querySelector('.nav-link');
                const dropdown = item.querySelector('.dropdown-menu');

                if (link && dropdown) {
                    link.addEventListener('click', (e) => {
                        if (window.innerWidth <= 992) {
                            e.preventDefault();
                            
                            // Close other open accordion panels
                            document.querySelectorAll('.nav-item').forEach(otherItem => {
                                if (otherItem !== item) {
                                    otherItem.classList.remove('panel-active');
                                }
                            });
                            
                            item.classList.toggle('panel-active');
                        }
                    });
                }
            });
        };

        // Initialize mobile panels
        setupMobilePanels();

        // Close menu on click anywhere else
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !navToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.replace('fa-times', 'fa-bars');
                document.body.style.overflow = '';
                document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('panel-active'));
            }
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                // Skip if this link is meant to toggle an accordion sub-menu
                if (link.nextElementSibling && link.nextElementSibling.classList.contains('dropdown-menu')) {
                    return; 
                }

                if (window.innerWidth <= 992) {
                    navLinks.classList.remove('active');
                    const icon = navToggle.querySelector('i');
                    if (icon) icon.classList.replace('fa-times', 'fa-bars');
                    document.body.style.overflow = '';
                    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('panel-active'));
                }
            });
        });
    }
});

// --- Dynamic Pricing Engine ---
const pricingData = {
    coworking: {
        title: "Coworking Pricing",
        locations: {
            "MORNINGSIDE, SANDTON": [{ title: "Monthly Membership", price: "R1 200.00", vat: "Excluding VAT", sub: "/ month", features: ["2 hours FREE meeting room access","Access to kitchen facilities","Mail & package handling","Professional business address","Dedicated phone number","Free uncapped wifi"] }],
            "CHADWICK, WYNBERG": [{ title: "Monthly Membership", price: "R1 100.00", vat: "Excluding VAT", sub: "/ month", features: ["2 hours FREE meeting room access","Access to kitchen facilities","Mail & package handling","Professional business address","Dedicated phone number","Free uncapped wifi"] }],
            "VILLAGE, JHB": [{ title: "Monthly Membership", price: "R950.00", vat: "Excluding VAT", sub: "/ month", features: ["2 hours FREE meeting room access","Access to kitchen facilities","Mail & package handling","Professional business address","Dedicated phone number","Free uncapped wifi"] }]
        }
    },
    "virtual-office": {
        title: "Virtual Office Pricing",
        locations: {
            "MORNINGSIDE, SANDTON": [{ title: "Monthly Virtual Office", price: "R599.00", vat: "Excluding VAT", sub: "/ month", features: ["Access to meeting rooms at reduced cost","Mail & package handling","Professional business address","Dedicated phone number"] }],
            "CHADWICK, WYNBERG": [{ title: "Monthly Virtual Office", price: "R499.00", vat: "Excluding VAT", sub: "/ month", features: ["Access to meeting rooms at reduced cost","Mail & package handling","Professional business address","Dedicated phone number"] }],
            "VILLAGE, JHB": [{ title: "Monthly Virtual Office", price: "R450.00", vat: "Excluding VAT", sub: "/ month", features: ["Access to meeting rooms at reduced cost","Mail & package handling","Professional business address","Dedicated phone number"] }]
        }
    },
    "private-offices": {
        title: "Private Office Pricing",
        locations: {
            "MORNINGSIDE, SANDTON": [
                { title: "Half Day", price: "R380.00", vat: "Excluding VAT", desc: "Perfect for quick meetings or focused sessions.", highlight: false },
                { title: "Full Day", price: "R520.00", vat: "Excluding VAT", desc: "Total access for a full day of productivity.", highlight: true },
                { title: "Monthly Suite", price: "R3 800.00", vat: "Excluding VAT", desc: "Starting monthly rate for tailored suites.", highlight: false }
            ],
            "CHADWICK, WYNBERG": [
                { title: "Half Day", price: "R330.00", vat: "Excluding VAT", desc: "Perfect for quick meetings or focused sessions.", highlight: false },
                { title: "Full Day", price: "R450.00", vat: "Excluding VAT", desc: "Total access for a full day of productivity.", highlight: true },
                { title: "5-Day Week", price: "R1 500.00", vat: "Excluding VAT", desc: "Reduced rate for weekly bookings.", highlight: false }
            ],
            "VILLAGE, JHB": [
                { title: "Half Day", price: "R299.00", vat: "Excluding VAT", desc: "Perfect for quick meetings or focused sessions.", highlight: false },
                { title: "Full Day", price: "R420.00", vat: "Excluding VAT", desc: "Total access for a full day of productivity.", highlight: true },
                { title: "5-Day Week", price: "R1 380.00", vat: "Excluding VAT", desc: "Reduced rate for weekly bookings.", highlight: false }
            ]
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const locationBtns = document.querySelectorAll('.location-btn');
    if(locationBtns.length > 0) {
        const container = document.getElementById('dynamic-pricing-container');
        const grid = document.getElementById('dynamic-pricing-grid');
        const defaultState = document.querySelector('.pricing-default-state');
        const service = document.querySelector('.location-buttons').getAttribute('data-service');
        const pricingTitle = document.getElementById('pricing-title');

        locationBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const loc = e.target.getAttribute('data-location');
                
                // Active state
                locationBtns.forEach(b => {
                    b.classList.remove('btn-primary');
                    b.classList.add('btn-outline');
                });
                e.target.classList.remove('btn-outline');
                e.target.classList.add('btn-primary');
                
                // Animate Out
                container.style.opacity = '0';
                
                setTimeout(() => {
                    defaultState.style.display = 'none';
                    grid.style.display = 'grid';
                    
                    // Update Title
                    pricingTitle.innerHTML = `${pricingData[service].title} <span style="color: var(--primary-blue)">- ${loc}</span>`;
                    
                    // Rebuild Grid
                    const plans = pricingData[service].locations[loc];
                    
                    if(service === 'private-offices') {
                        grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
                        grid.style.maxWidth = '1200px';
                        grid.style.margin = '4rem auto 0';
                    } else {
                        grid.style.gridTemplateColumns = '1fr';
                        grid.style.maxWidth = '600px';
                        grid.style.margin = '4rem auto 0';
                    }
                    
                    grid.innerHTML = plans.map(plan => `
                        <div class="pricing-card" style="${plan.highlight ? 'border-color: var(--primary-blue); transform: scale(1.05); box-shadow: var(--shadow);' : ''}">
                            <h3 class="service-title">${plan.title}</h3>
                            <div class="pricing-label">starting from</div>
                            <div class="pricing-price">${plan.price}${plan.sub ? `<span> ${plan.sub}</span>` : ''}</div>
                            <div class="pricing-vat">${plan.vat}</div>
                            ${plan.desc ? `<p class="service-desc">${plan.desc}</p>` : ''}
                            ${plan.features ? `
                                <div style="text-align: left; margin-bottom: 3rem;">
                                    <ul style="list-style: none; padding: 0;">
                                        ${plan.features.map(f => `
                                        <li style="margin-bottom: 1rem; display: flex; align-items: flex-start; gap: 1rem;">
                                            <i class="fas fa-check-circle" style="color: var(--primary-blue); margin-top: 0.3rem;"></i>
                                            ${f}
                                        </li>
                                        `).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                            <div style="margin-top: auto;">
                                <a href="contact.html?location=${encodeURIComponent(loc.split(',')[0])}" class="btn ${plan.highlight ? 'btn-primary' : 'btn-outline'}">${plan.features ? 'Get Started' : 'Book Now'}</a>
                            </div>
                        </div>
                    `).join('');
                    
                    if(window.innerWidth <= 768) {
                        grid.style.gridTemplateColumns = '1fr';
                        grid.querySelectorAll('.pricing-card').forEach(c => c.style.transform = 'none');
                    }
                    
                    // Animate In
                    container.style.opacity = '1';
                }, 400);
            });
        });
    }

    // Prefetch links on hover for "instant" navigation
    const prefetchOnHover = () => {
        document.querySelectorAll('a[href$=".html"]').forEach(link => {
            link.addEventListener('mouseenter', () => {
                const href = link.getAttribute('href');
                if (href && !href.startsWith('http') && !document.querySelector(`link[href="${href}"]`)) {
                    const prefetch = document.createElement('link');
                    prefetch.rel = 'prefetch';
                    prefetch.href = href;
                    document.head.appendChild(prefetch);
                }
            }, { once: true });
        });
    };
    
    if ('requestIdleCallback' in window) {
        requestIdleCallback(prefetchOnHover);
    } else {
        setTimeout(prefetchOnHover, 2000);
    }
});

/* ==========================================================================
   CONVERSION TRACKING, UTM PERSISTENCE & AJAX FORM HANDLING
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. UTM & GCLID Persistence in Session Storage
    const urlParams = new URLSearchParams(window.location.search);
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'];
    const capturedUtm = {};
    let hasUtm = false;

    utmKeys.forEach(k => {
        if (urlParams.has(k)) {
            capturedUtm[k] = urlParams.get(k);
            hasUtm = true;
        }
    });

    if (hasUtm) {
        try {
            sessionStorage.setItem('dws_utm_data', JSON.stringify(capturedUtm));
        } catch (e) {
            console.warn('SessionStorage not available:', e);
        }
    }

    // Helper: Phone Number E.164 Normalizer
    const normalizePhoneNumber = (phone) => {
        if (!phone) return '';
        let clean = phone.replace(/[^0-9+]/g, '');
        if (clean.startsWith('0')) {
            clean = '+27' + clean.substring(1);
        } else if (clean.startsWith('27')) {
            clean = '+' + clean;
        } else if (!clean.startsWith('+')) {
            clean = '+27' + clean;
        }
        return clean;
    };

    // 2. Universal Web3Forms AJAX Handler for Landing Pages
    const lpForms = document.querySelectorAll('.lp-lead-form');
    lpForms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('.lp-form-btn');
            const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Submit Enquiry';

            // Honeypot spam check
            const botcheck = form.querySelector('input[name="botcheck"]');
            if (botcheck && botcheck.checked) return;

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Securing Your Rate...';
            }

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Merge stored UTMs
            try {
                const storedUtms = JSON.parse(sessionStorage.getItem('dws_utm_data') || '{}');
                Object.assign(data, storedUtms);
            } catch (err) {}

            data.page_route = window.location.pathname;

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                const result = await response.json();

                if (result.success) {
                    // Dispatch GTM Enhanced Conversion Event
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                        event: 'lead_form_submit',
                        form_id: form.id || 'hero_lead_form',
                        page_route: window.location.pathname,
                        service_type: data.service || data.team_size || 'Landing Page Lead',
                        team_size: data.team_size || '',
                        lead_name: data.name || '',
                        lead_email: data.email || '',
                        lead_phone: normalizePhoneNumber(data.phone || ''),
                        utm_source: data.utm_source || '',
                        utm_medium: data.utm_medium || '',
                        utm_campaign: data.utm_campaign || '',
                        gclid: data.gclid || ''
                    });

                    // Inline UI confirmation swap
                    const card = form.closest('.lp-lead-card');
                    if (card) {
                        form.style.display = 'none';
                        const header = card.querySelector('.lp-lead-card-header');
                        if (header) header.style.display = 'none';
                        const successEl = card.querySelector('.lp-form-success');
                        if (successEl) {
                            successEl.style.display = 'block';
                        }
                    }
                } else {
                    alert(result.message || 'Submission failed. Please contact our team directly via WhatsApp.');
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnText;
                    }
                }
            } catch (error) {
                console.error('Lead form submission error:', error);
                alert('Network error. Please call or WhatsApp us for immediate assistance.');
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                }
            }
        });
    });

    // 3. Universal WhatsApp Conversion Click Tracking
    document.querySelectorAll('.btn-whatsapp, .floating-whatsapp-widget, [data-whatsapp-cta]').forEach(btn => {
        btn.addEventListener('click', () => {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: 'whatsapp_click',
                cta_placement: btn.classList.contains('floating-whatsapp-widget') ? 'floating_widget' : 'hero_button',
                page_route: window.location.pathname,
                target_phone: '+27720725928',
                intent_message: btn.getAttribute('data-intent') || 'Sandton Workspace Inquiry'
            });
        });
    });

    // 4. Universal Click-to-Call Tracking
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', () => {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: 'phone_click',
                phone_number: link.getAttribute('href').replace('tel:', ''),
                page_route: window.location.pathname,
                location_tag: link.getAttribute('data-location-tag') || 'Morningside_Sandton'
            });
        });
    });

    // 5. High-Performance FAQ Accordion
    document.querySelectorAll('.lp-faq-question').forEach(q => {
        q.addEventListener('click', () => {
            const item = q.closest('.lp-faq-item');
            if (item) {
                const isOpen = item.classList.contains('active');
                const container = item.closest('.lp-faq-container');
                if (container) {
                    container.querySelectorAll('.lp-faq-item').forEach(i => i.classList.remove('active'));
                }
                if (!isOpen) {
                    item.classList.add('active');
                }
            }
        });
    });
});
