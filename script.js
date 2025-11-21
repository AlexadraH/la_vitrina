// Mobile Menu Toggle
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    menuToggle.classList.toggle("active");
});

// Close menu when clicking on a link
const navLinks = document.querySelectorAll(".nav-link, .nav-link-cta");
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuToggle.classList.remove("active");
    });
});

// Navbar scroll effect
const navbar = document.getElementById("navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

    lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth",
            });
        }
    });
});

// Portfolio Filter
const filterBtns = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        // Remove active class from all buttons
        filterBtns.forEach((b) => b.classList.remove("active"));
        // Add active class to clicked button
        btn.classList.add("active");

        const filter = btn.getAttribute("data-filter");

        portfolioItems.forEach((item) => {
            if (filter === "all" || item.getAttribute("data-category") === filter) {
                item.classList.remove("hidden");
                item.style.animation = "fadeIn 0.5s ease-out";
            } else {
                item.classList.add("hidden");
            }
        });
    });
});

// Testimonials Slider
const testimonialTrack = document.getElementById("testimonialTrack");
const prevBtn = document.getElementById("prevTestimonial");
const nextBtn = document.getElementById("nextTestimonial");
const testimonialCards = document.querySelectorAll(".testimonial-card");
let currentTestimonial = 0;

function updateTestimonialPosition() {
    const offset = -currentTestimonial * 100;
    testimonialTrack.style.transform = `translateX(${offset}%)`;
}

nextBtn.addEventListener("click", () => {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    updateTestimonialPosition();
});

prevBtn.addEventListener("click", () => {
    currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
    updateTestimonialPosition();
});

// Auto-advance testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    updateTestimonialPosition();
}, 5000);

// Contact Form Handling with Formspree
const contactForm = document.getElementById("contactForm");

// Función para mostrar notificaciones elegantes
function showNotification(message, type = 'success') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `form-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : '⚠'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    // Estilos para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Remover después de 5 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Añadir estilos CSS para las animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .form-loading {
        opacity: 0.7;
        pointer-events: none;
    }
    
    .btn-loading {
        position: relative;
        color: transparent !important;
    }
    
    .btn-loading::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        top: 50%;
        left: 50%;
        margin-left: -10px;
        margin-top: -10px;
        border: 2px solid #ffffff;
        border-radius: 50%;
        border-top-color: transparent;
        animation: spin 1s ease-in-out infinite;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Mostrar estado de carga
    submitBtn.classList.add('btn-loading');
    contactForm.classList.add('form-loading');

    try {
        // Enviar datos a Formspree
        const formData = new FormData(contactForm);
        
        const response = await fetch('https://formspree.io/f/mldvdavv', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            showNotification('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.', 'success');
            contactForm.reset();
        } else {
            throw new Error('Error en el envío del formulario');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.', 'error');
    } finally {
        // Restaurar estado normal
        submitBtn.classList.remove('btn-loading');
        contactForm.classList.remove('form-loading');
        submitBtn.textContent = originalText;
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = "fadeIn 1s ease-out forwards";
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
});

// Observe service cards
document.querySelectorAll(".service-card").forEach((card) => {
    observer.observe(card);
});

// Observe pricing cards
document.querySelectorAll(".pricing-card").forEach((card) => {
    observer.observe(card);
});

// Hero background rotation
document.addEventListener("DOMContentLoaded", () => {
    const hero = document.getElementById("inicio");

    const images = [
        "banner 1.jpg",
        "banner 2.jpg", 
        "banner 3.jpg"
    ];

    let index = 0;

    // Establecer imagen inicial
    hero.style.backgroundImage = `url('${images[index]}')`;

    // Rotar imágenes cada 5 segundos
    setInterval(() => {
        index = (index + 1) % images.length;
        hero.style.backgroundImage = `url('${images[index]}')`;
    }, 5000);
});
