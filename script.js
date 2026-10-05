// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.toggle('hidden');
        mobileMenuButton.setAttribute('aria-expanded', (!isHidden).toString());
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }

        // Close mobile menu after clicking a link
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            if (mobileMenuButton) {
                mobileMenuButton.setAttribute('aria-expanded', 'false');
            }
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

// --- Share Website Feature ---
function setupShareWebsite() {
    const pageUrl = window.location.href.startsWith('http') 
        ? window.location.href 
        : 'https://www.youtube.com/@its.mathtime';
    const shareTitle = "MathTime by Alka Ma'am – Learn Math the Smart Way";
    const shareMessage = "Learn math the smart way with MathTime by Alka Ma'am! Check out interactive lessons and video tutorials here:";

    // Dynamic URLs for share buttons
    const whatsappBtn = document.getElementById('share-whatsapp');
    if (whatsappBtn) {
        whatsappBtn.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage + ' ' + pageUrl)}`;
    }

    const telegramBtn = document.getElementById('share-telegram');
    if (telegramBtn) {
        telegramBtn.href = `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(shareMessage)}`;
    }

    const facebookBtn = document.getElementById('share-facebook');
    if (facebookBtn) {
        facebookBtn.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
    }

    const twitterBtn = document.getElementById('share-twitter');
    if (twitterBtn) {
        twitterBtn.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent(pageUrl)}`;
    }

    const linkedinBtn = document.getElementById('share-linkedin');
    if (linkedinBtn) {
        linkedinBtn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;
    }

    const emailBtn = document.getElementById('share-email');
    if (emailBtn) {
        emailBtn.href = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareMessage + '\n\n' + pageUrl)}`;
    }

    // Copy link button logic
    const copyBtn = document.getElementById('copy-website-link');
    const copyText = document.getElementById('copy-text');
    const copyIcon = document.getElementById('copy-icon');
    const toast = document.getElementById('share-toast');

    if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
            const urlToCopy = window.location.href.startsWith('http') 
                ? window.location.href 
                : 'https://www.youtube.com/@its.mathtime';

            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(urlToCopy);
                } else {
                    // Fallback for older browsers or non-HTTPS
                    const textArea = document.createElement('textarea');
                    textArea.value = urlToCopy;
                    textArea.style.position = 'fixed';
                    textArea.style.left = '-999999px';
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    document.execCommand('copy');
                    textArea.remove();
                }

                // Visual feedback on button
                if (copyText) copyText.textContent = 'Copied!';
                if (copyIcon) {
                    copyIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>`;
                    copyIcon.classList.add('text-green-600');
                }
                copyBtn.classList.add('bg-green-50', 'text-green-700', 'border-green-300');

                // Show toast
                if (toast) {
                    toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-3');
                    toast.classList.add('opacity-100', 'translate-y-0');
                    setTimeout(() => {
                        toast.classList.remove('opacity-100', 'translate-y-0');
                        toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-3');
                    }, 2500);
                }

                // Reset button state after 2 seconds
                setTimeout(() => {
                    if (copyText) copyText.textContent = 'Copy Link';
                    if (copyIcon) {
                        copyIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>`;
                        copyIcon.classList.remove('text-green-600');
                    }
                    copyBtn.classList.remove('bg-green-50', 'text-green-700', 'border-green-300');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy link: ', err);
            }
        });
    }

    // Native Web Share API (mobile devices)
    const nativeContainer = document.getElementById('native-share-container');
    const nativeBtn = document.getElementById('native-share-btn');
    if (navigator.share && nativeContainer && nativeBtn) {
        nativeContainer.classList.remove('hidden');
        nativeBtn.addEventListener('click', async () => {
            try {
                await navigator.share({
                    title: shareTitle,
                    text: shareMessage,
                    url: pageUrl
                });
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.log('Share canceled or error:', err);
                }
            }
        });
    }
}

// Run animations and features when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    animateOnLoadElements(); // Trigger initial load animations
    setupScrollAnimations(); // Set up scroll animations
    setupShareWebsite();     // Initialize share buttons and copy functionality
});