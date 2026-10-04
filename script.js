// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });

        // Close mobile menu after clicking a link
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    });
});

// Simple form submission handler (for demonstration)
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent actual form submission

    // Simulate form submission
    setTimeout(() => {
        formMessage.textContent = 'Thank you for your message! We will get back to you soon.';
        formMessage.classList.remove('hidden');
        formMessage.classList.add('text-green-600');
        contactForm.reset(); // Clear the form
    }, 500);
});

// Function to show a custom alert message (replaces alert())
function showAlert(message) {
    const alertBox = document.createElement('div');
    alertBox.className = 'fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50';
    alertBox.innerHTML = `
        <div class="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full text-center">
            <p class="text-lg font-semibold text-gray-800 mb-6">${message}</p>
            <button class="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-300" onclick="this.parentNode.parentNode.remove()">
                OK
            </button>
        </div>
    `;
    document.body.appendChild(alertBox);
}

// Override the default alert to use our custom one
window.alert = showAlert;

// Event listener for the "Join Live Class" button
const liveClassButton = document.getElementById('live-class-button');
if (liveClassButton) {
    liveClassButton.addEventListener('click', () => {
        showAlert('Live Class details will be announced soon! Stay tuned. Subscribe to our YouTube channel: https://www.youtube.com/@its.mathtime and check out our playlists: https://www.youtube.com/@its.mathtime/playlists');
    });
}

// --- Modern CSS Animation Logic ---

// Function to handle elements that animate on page load
function animateOnLoadElements() {
    const elements = document.querySelectorAll('.animate-on-load');
    elements.forEach(el => {
        el.classList.add('is-visible');
    });
}

// Function to handle elements that animate on scroll
function setupScrollAnimations() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Run animations when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    animateOnLoadElements(); // Trigger initial load animations
    setupScrollAnimations(); // Set up scroll animations
});