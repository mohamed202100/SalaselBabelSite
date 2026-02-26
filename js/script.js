document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // 1b. Mobile Dropdown Toggle (click to open/close)
    const dropdownItems = document.querySelectorAll('.has-dropdown');
    dropdownItems.forEach(item => {
        const link = item.querySelector(':scope > a');
        link.addEventListener('click', (e) => {
            // Only toggle on mobile (when burger menu is visible)
            if (window.innerWidth <= 768) {
                e.preventDefault();
                item.classList.toggle('open');
                // Close other dropdowns
                dropdownItems.forEach(other => {
                    if (other !== item) other.classList.remove('open');
                });
            }
        });
    });

    // 2. Sticky Header
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        // Header background
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Determine if header should be explicitly sticky initially if not on top
    if (window.scrollY > 50 && header) {
        header.classList.add('scrolled');
    }

    // 3. Scroll Reveal Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(element => {
        observer.observe(element);
    });

    // 4. Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get name value
            const name = document.getElementById('name').value;

            // Show message
            formMessage.innerHTML = `شكراً جزيلاً لك يا <strong>${name}</strong>!<br>لقد تم استلام رسالتك بنجاح وسنقوم بالتواصل معك في أقرب وقت.`;
            formMessage.style.display = 'block';
            formMessage.style.color = 'var(--secondary)';

            // Reset form
            contactForm.reset();

            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        });
    }

    // 5. Domain Search Prevent Default (Demo)
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = searchForm.querySelector('input').value;
            if (input.trim() === '') {
                alert('الرجاء إدخال اسم النطاق للبحث عنه.');
            } else {
                alert(`عذراً، ميزة البحث الفعلية عن النطاق (${input}) سيتم تفعيلها لاحقاً. هذه نسخة تجريبية للتصميم.`);
            }
        });
    }
});
