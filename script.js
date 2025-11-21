// Mobile Menu Toggle
const menuToggle = document.getElementById("menuToggle")
const navMenu = document.getElementById("navMenu")

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")
    menuToggle.classList.toggle("active")
})

// Close menu when clicking on a link
const navLinks = document.querySelectorAll(".nav-link, .nav-link-cta")
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active")
        menuToggle.classList.remove("active")
    })
})

// Navbar scroll effect
const navbar = document.getElementById("navbar")
let lastScroll = 0

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset

    if (currentScroll > 100) {
        navbar.classList.add("scrolled")
    } else {
        navbar.classList.remove("scrolled")
    }

    lastScroll = currentScroll
})

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
            const offsetTop = target.offsetTop - 80
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth",
            })
        }
    })
})

// Portfolio Filter
const filterBtns = document.querySelectorAll(".filter-btn")
const portfolioItems = document.querySelectorAll(".portfolio-item")

filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        // Remove active class from all buttons
        filterBtns.forEach((b) => b.classList.remove("active"))
        // Add active class to clicked button
        btn.classList.add("active")

        const filter = btn.getAttribute("data-filter")

        portfolioItems.forEach((item) => {
            if (filter === "all" || item.getAttribute("data-category") === filter) {
                item.classList.remove("hidden")
                item.style.animation = "fadeIn 0.5s ease-out"
            } else {
                item.classList.add("hidden")
            }
        })
    })
})

// Testimonials Slider
const testimonialTrack = document.getElementById("testimonialTrack")
const prevBtn = document.getElementById("prevTestimonial")
const nextBtn = document.getElementById("nextTestimonial")
const testimonialCards = document.querySelectorAll(".testimonial-card")
let currentTestimonial = 0

function updateTestimonialPosition() {
    const offset = -currentTestimonial * 100
    testimonialTrack.style.transform = `translateX(${offset}%)`
}

nextBtn.addEventListener("click", () => {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length
    updateTestimonialPosition()
})

prevBtn.addEventListener("click", () => {
    currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length
    updateTestimonialPosition()
})

// Auto-advance testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length
    updateTestimonialPosition()
}, 5000)

// Contact Form Handling
const contactForm = document.getElementById("contactForm")

contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
    const formData = new FormData(contactForm)
    const data = Object.fromEntries(formData)

    // Here you would typically send the data to your server
    // For now, we'll just log it and show an alert
    console.log("Form submitted:", data)

    // Show success message
    alert("¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.")

    // Reset form
    contactForm.reset()

    // In a real application, you would send this to your Java backend:
    /*
      fetch('/api/contact', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
          alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
          contactForm.reset();
      })
      .catch(error => {
          alert('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.');
      });
      */
})

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = "fadeIn 1s ease-out forwards"
            observer.unobserve(entry.target)
        }
    })
}, observerOptions)

// Observe all sections
document.querySelectorAll("section").forEach((section) => {
    observer.observe(section)
})

// Observe service cards
document.querySelectorAll(".service-card").forEach((card) => {
    observer.observe(card)
})

// Observe pricing cards
document.querySelectorAll(".pricing-card").forEach((card) => {
    observer.observe(card)
})
document.addEventListener("DOMContentLoaded", () => {
    const hero = document.getElementById("inicio");

    const images = [
        "banner1.jpg",
        "banner2.jpg",
        "banner3.jpg"
    ];

    let index = 0;

    hero.style.backgroundImage = 'url(${images[index]})';

    setInterval(() => {
        index = (index + 1) % images.length;
        hero.style.backgroundImage = 'url(${images[index]})';
    }, 5000);
});