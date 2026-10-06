// Mobile menu toggle with icon state
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const hamburgerIcon = document.getElementById('hamburger-icon');
const closeIcon = document.getElementById('close-icon');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.toggle('hidden');
        mobileMenuButton.setAttribute('aria-expanded', (!isHidden).toString());
        if (hamburgerIcon && closeIcon) {
            hamburgerIcon.classList.toggle('hidden', !isHidden);
            closeIcon.classList.toggle('hidden', isHidden);
        }
    });
}

// Smooth scrolling for navigation links with header offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerHeight = document.getElementById('main-header')?.offsetHeight || 70;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }

        // Close mobile menu after clicking a link
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            if (mobileMenuButton) {
                mobileMenuButton.setAttribute('aria-expanded', 'false');
            }
            if (hamburgerIcon && closeIcon) {
                hamburgerIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            }
        }
    });
});

// --- Working Contact Form & Inquiry Submission ---
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnSpinner = document.getElementById('btn-spinner');

    if (!contactForm || !formMessage) return;

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const gradeInput = document.getElementById('grade-interest');
        const messageInput = document.getElementById('message');

        const name = nameInput?.value.trim() || 'Student';
        const email = emailInput?.value.trim() || '';
        const grade = gradeInput?.value || 'Mathematics';
        const message = messageInput?.value.trim() || '';

        // UI loading state
        if (submitBtn) submitBtn.disabled = true;
        if (btnSpinner) btnSpinner.classList.remove('hidden');
        if (btnText) btnText.textContent = 'Sending Message...';

        // Prepare simulated asynchronous transmission
        setTimeout(() => {
            // Success response card
            formMessage.innerHTML = `
                <div class="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-left">
                    <div class="font-bold flex items-center gap-1.5 text-base">
                        <svg class="w-5 h-5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        <span>Message Sent Successfully!</span>
                    </div>
                    <p class="text-xs sm:text-sm mt-1.5 leading-relaxed text-slate-700">
                        Thank you, <strong>${name}</strong>! Your inquiry regarding <strong>${grade}</strong> has been recorded. Alka Ma'am will respond to <strong>${email}</strong> within 24–48 hours.
                    </p>
                    <div class="mt-3 pt-2.5 border-t border-emerald-200/80 flex items-center justify-between flex-wrap gap-2">
                        <span class="text-xs font-semibold text-emerald-800 flex items-center gap-1">
                            <svg class="w-3.5 h-3.5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                            Direct notification sent to Alka Ma'am
                        </span>
                        <span class="text-[11px] text-slate-500">Official inbox: info.onesharma@gmail.com</span>
                    </div>
                </div>
            `;
            formMessage.classList.remove('hidden');

            // Reset Form and Button state
            contactForm.reset();
            if (submitBtn) submitBtn.disabled = false;
            if (btnSpinner) btnSpinner.classList.add('hidden');
            if (btnText) btnText.textContent = 'Send Another Message';
        }, 800);
    });
}

// Event listener for the "Join Live Class" button (Smart prefill and smooth scroll)
function setupLiveClassButton() {
    const liveClassButton = document.getElementById('live-class-button');
    if (!liveClassButton) return;

    liveClassButton.addEventListener('click', () => {
        const contactSection = document.getElementById('contact');
        const gradeInterest = document.getElementById('grade-interest');
        const nameInput = document.getElementById('name');

        if (contactSection) {
            const headerHeight = document.getElementById('main-header')?.offsetHeight || 70;
            const targetPosition = contactSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Pre-select "Live Class Batch Inquiry"
            if (gradeInterest) {
                gradeInterest.value = 'Live Class Batch Inquiry';
            }

            // Focus name input after scroll
            setTimeout(() => {
                if (nameInput) {
                    nameInput.focus();
                    nameInput.classList.add('ring-2', 'ring-amber-400');
                    setTimeout(() => nameInput.classList.remove('ring-2', 'ring-amber-400'), 2500);
                }
            }, 600);
        }
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

// --- Sticky Header Scroll Effects & Active Nav Spy ---
function setupHeaderScrollAndSpy() {
    const header = document.getElementById('main-header');
    const progressBar = document.getElementById('scroll-progress-bar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = Array.from(document.querySelectorAll('section[id]'));

    function handleScroll() {
        const scrollY = window.scrollY;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

        // 1. Reading progress bar
        if (progressBar && totalHeight > 0) {
            const progress = (scrollY / totalHeight) * 100;
            progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
        }

        // 2. Compact header on scroll
        if (header) {
            if (scrollY > 30) {
                header.classList.remove('py-3.5');
                header.classList.add('py-2', 'bg-slate-900/95', 'shadow-2xl');
            } else {
                header.classList.remove('py-2', 'shadow-2xl');
                header.classList.add('py-3.5');
            }
        }

        // 3. Active Nav Spy
        const headerHeight = header ? header.offsetHeight + 40 : 100;
        let currentSectionId = '';

        sections.forEach(section => {
            const top = section.offsetTop - headerHeight;
            const height = section.offsetHeight;
            if (scrollY >= top && scrollY < top + height) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active-nav', 'text-white');
                    link.classList.remove('text-slate-300');
                } else {
                    link.classList.remove('active-nav');
                }
            });
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
}

// --- Floating Math Particles Engine (Canvas Physics) ---
function setupMathParticles() {
    const canvas = document.getElementById('math-particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const heroSection = document.getElementById('home');
    if (!ctx || !heroSection) return;

    let width = 0;
    let height = 0;
    let particles = [];
    let animationFrameId = null;
    let isHeroVisible = true;

    // Rich Mathematical Symbols Palette
    const mathSymbols = [
        'π', '∑', '√x', '∫', '∞', 'θ', 'x²', 'Δ', 
        '÷', '×', '±', '%', 'f(x)', 'α', 'β', 'sin θ', 'λ', '≠'
    ];

    const symbolColors = [
        'rgba(245, 158, 11, ',   // Amber
        'rgba(96, 165, 250, ',   // Blue
        'rgba(167, 139, 250, ',  // Purple
        'rgba(52, 211, 153, ',   // Emerald
        'rgba(244, 244, 245, '   // Bright white/zinc
    ];

    // Mouse interaction state
    const mouse = {
        x: -9999,
        y: -9999,
        radius: 120
    };

    function resizeCanvas() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = heroSection.clientWidth;
        height = heroSection.clientHeight;

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        ctx.scale(dpr, dpr);
        initParticles();
    }

    class Particle {
        constructor() {
            this.reset(true);
        }

        reset(isInitial = false) {
            this.x = Math.random() * width;
            this.y = isInitial ? Math.random() * height : height + 20;
            this.vx = (Math.random() - 0.5) * 0.45;
            this.vy = -(Math.random() * 0.45 + 0.2); // Gentle upward drift
            this.symbol = mathSymbols[Math.floor(Math.random() * mathSymbols.length)];
            this.baseColor = symbolColors[Math.floor(Math.random() * symbolColors.length)];
            this.baseOpacity = Math.random() * 0.22 + 0.08; // Subtle 8% - 30% opacity
            this.size = Math.floor(Math.random() * 14) + 16; // 16px to 30px
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.008;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.rotation += this.rotationSpeed;

            // Interactive mouse repulsion
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
                const force = (mouse.radius - distance) / mouse.radius;
                const angle = Math.atan2(dy, dx);
                this.x += Math.cos(angle) * force * 2.5;
                this.y += Math.sin(angle) * force * 2.5;
            }

            // Screen wrap/reset
            if (this.y < -30 || this.x < -30 || this.x > width + 30) {
                this.reset(false);
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.font = `600 ${this.size}px 'Outfit', 'Inter', sans-serif`;
            ctx.fillStyle = `${this.baseColor}${this.baseOpacity})`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.symbol, 0, 0);
            ctx.restore();
        }
    }

    function initParticles() {
        // Density based on screen size (25 to 45 particles)
        const count = Math.min(45, Math.max(22, Math.floor(width / 32)));
        particles = [];
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        if (!isHeroVisible) return;

        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }

        animationFrameId = requestAnimationFrame(animate);
    }

    // Hero mouse tracking
    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    }, { passive: true });

    heroSection.addEventListener('mouseleave', () => {
        mouse.x = -9999;
        mouse.y = -9999;
    });

    // IntersectionObserver to freeze canvas when scrolled out of view (0% CPU usage!)
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isHeroVisible = entry.isIntersecting;
            if (isHeroVisible) {
                if (!animationFrameId) {
                    animate();
                }
            } else {
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                    animationFrameId = null;
                }
            }
        });
    }, { threshold: 0.05 });

    heroObserver.observe(heroSection);

    // Resize handling with debounce
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            resizeCanvas();
        }, 150);
    });

    resizeCanvas();
    animate();
}

// --- Interactive Grade & Category Filter Tabs ---
function setupVideoFilters() {
    const filterPills = document.querySelectorAll('.filter-pill');
    const filterItems = document.querySelectorAll('#video-grid .filter-item');
    if (!filterPills.length || !filterItems.length) return;

    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            const filterValue = pill.getAttribute('data-filter');

            // Toggle active pill state
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            // Filter items with smooth transition
            filterItems.forEach(item => {
                const category = item.getAttribute('data-category') || '';
                const matches = filterValue === 'all' || category.split(' ').includes(filterValue);

                if (matches) {
                    item.classList.remove('is-filtered-out');
                } else {
                    item.classList.add('is-filtered-out');
                }
            });
        });
    });
}

// --- Video Facade & Modal Player ---
function setupVideoModal() {
    const modal = document.getElementById('video-modal');
    const iframe = document.getElementById('modal-video-iframe');
    const titleEl = document.getElementById('modal-video-title');
    const closeBtn = document.getElementById('close-video-modal');
    if (!modal || !iframe) return;

    function openModal(videoId, title) {
        if (!videoId) return;
        if (titleEl) titleEl.textContent = title || 'Video Lesson';
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeModal() {
        modal.classList.remove('active');
        iframe.src = 'about:blank'; // Stop video playback cleanly
        document.body.style.overflow = '';
    }

    // Attach listeners to all video facades and open buttons
    document.querySelectorAll('.video-facade, .open-video-btn').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const videoId = trigger.getAttribute('data-video-id');
            const title = trigger.getAttribute('data-video-title');
            openModal(videoId, title);
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Click outside to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Esc key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// --- Smooth 3D Card Hover Tilt Effect ---
function setup3DTiltEffect() {
    // Only apply on fine-pointer devices (desktops/laptops) for best performance
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cards = document.querySelectorAll('.tilt-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -6; // Max 6 deg
            const rotateY = ((x - centerX) / centerX) * 6;

            card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
}

// --- Interactive Gallery Lightbox Modal ---
function setupGalleryLightbox() {
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    const galleryCards = Array.from(document.querySelectorAll('.gallery-card'));

    if (!lightbox || !lightboxImg || !galleryCards.length) return;

    let currentIndex = 0;

    function showImage(index) {
        if (index < 0) {
            currentIndex = galleryCards.length - 1;
        } else if (index >= galleryCards.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }

        const card = galleryCards[currentIndex];
        const fullImg = card.getAttribute('data-full-img') || card.querySelector('img')?.src || '';
        const caption = card.getAttribute('data-caption') || 'Classroom & Teaching Moment';

        lightboxImg.style.opacity = '0';
        lightboxImg.style.transform = 'scale(0.96)';

        setTimeout(() => {
            lightboxImg.src = fullImg;
            lightboxImg.alt = caption;
            if (lightboxCaption) lightboxCaption.textContent = caption;
            if (lightboxCounter) lightboxCounter.textContent = `${currentIndex + 1} / ${galleryCards.length}`;
            lightboxImg.style.opacity = '1';
            lightboxImg.style.transform = 'scale(1)';
        }, 100);
    }

    function openLightbox(index) {
        showImage(index);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Attach click events on each gallery card
    galleryCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }

    // Navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showImage(currentIndex - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showImage(currentIndex + 1);
        });
    }

    // Close on clicking backdrop
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.closest('#lightbox-close')) {
            closeLightbox();
        }
    });

    // Keyboard support: Escape, Left Arrow, Right Arrow
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            showImage(currentIndex + 1);
        } else if (e.key === 'ArrowLeft') {
            showImage(currentIndex - 1);
        }
    });

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diffX = touchEndX - touchStartX;
        if (Math.abs(diffX) > 45) {
            if (diffX < 0) {
                showImage(currentIndex + 1); // Swipe left -> Next
            } else {
                showImage(currentIndex - 1); // Swipe right -> Prev
            }
        }
    }, { passive: true });
}

// --- Back to Top Floating Button Engine with Circular Progress ---
function setupBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    const progressCircle = document.getElementById('progress-circle');
    if (!backToTopBtn) return;

    function handleScroll() {
        const scrollY = window.scrollY;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

        // Show/hide button after scrolling down 350px
        if (scrollY > 350) {
            backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
            backToTopBtn.classList.add('opacity-100');
        } else {
            backToTopBtn.classList.remove('opacity-100');
            backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        }

        // Calculate circular progress offset (0 to 100)
        if (progressCircle && totalHeight > 0) {
            const scrollFraction = scrollY / totalHeight;
            const dashoffset = 100 - (scrollFraction * 100);
            progressCircle.style.strokeDashoffset = Math.max(0, Math.min(100, dashoffset));
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Run animations and features when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    animateOnLoadElements();     // Trigger initial load animations
    setupScrollAnimations();     // Set up scroll animations
    setupHeaderScrollAndSpy();   // Sticky header compression, reading progress & spy
    setupMathParticles();        // Mathematical floating symbols canvas physics
    setupShareWebsite();         // Initialize share buttons and copy functionality
    setupVideoFilters();         // Interactive grade & category filter pills
    setupVideoModal();           // Video facade click to play modal
    setup3DTiltEffect();         // Physical 3D card tilt on hover
    setupGalleryLightbox();      // Interactive gallery modal with keyboard/touch navigation
    setupContactForm();          // Working inquiry form with validation & success card
    setupLiveClassButton();      // Join Live Class button prefill & smooth scroll
    setupBackToTop();            // Back to top floating button with circular SVG progress
});