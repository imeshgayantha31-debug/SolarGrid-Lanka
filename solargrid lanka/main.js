document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const leadForm = document.getElementById('lead-form');

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenu.classList.remove('active');
                }
            }
        });
    });

    // Lead Capture Form Submission
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(leadForm);
            const data = Object.fromEntries(formData.entries());
            
            console.log('Form Submitted:', data);
            
            // Show success message (simple version)
            const originalButtonText = leadForm.querySelector('button').textContent;
            leadForm.querySelector('button').textContent = 'Sending...';
            leadForm.querySelector('button').disabled = true;
            
            setTimeout(() => {
                alert(`Thank you, ${data.name}! Your quote request for ${data['service-type']} solar has been sent. Our team will contact you shortly.`);
                leadForm.reset();
                leadForm.querySelector('button').textContent = originalButtonText;
                leadForm.querySelector('button').disabled = false;
            }, 1500);
        });
    }

    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .benefit-item, .about-text, .about-image').forEach(el => {
        observer.observe(el);
    });
});
