// ========== TYPING ANIMATION ==========
const titles = [
    "Front-end Web Developer",
    "Web Designer",
    "Data Analyst",
    "Tech Enthusiast"
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 80;

function typeTitle() {
    const typingText = document.querySelector('.typing-text');
    const currentTitle = titles[titleIndex];
   
    if (isDeleting) {
        typingText.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
    } else {
        typingText.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
    }
   
    if (!isDeleting && charIndex === currentTitle.length) {
        isDeleting = true;
        typingSpeed = 1500;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
    }
   
    setTimeout(typeTitle, typingSpeed);
}

// ========== MOBILE TOGGLE MENU ==========
const mobileToggle = document.getElementById('mobileToggle');
const navbar = document.getElementById('navbar');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navbar.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (mobileToggle) {
            mobileToggle.classList.remove('active');
        }
        navbar.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navbar && mobileToggle && !navbar.contains(e.target) && !mobileToggle.contains(e.target)) {
        mobileToggle.classList.remove('active');
        navbar.classList.remove('active');
    }
});

// ========== SMOOTH SCROLLING ==========
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
       
        if (targetSection) {
            const headerHeight = document.querySelector('#header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
           
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
           
            // Update active link
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// ========== ACTIVE NAVIGATION ON SCROLL ==========
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
   
    let current = '';
   
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
   
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========== DOWNLOAD CV ==========
const downloadCVBtn = document.querySelector('.download-cv-btn');

if (downloadCVBtn) {
    downloadCVBtn.addEventListener('click', () => {
        const cvPath = 'CV.pdf';
       
        const link = document.createElement('a');
        link.href = cvPath;
        link.download = 'Saiful_Haque_Umar_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

// ========== SCROLL ANIMATION FOR SECTIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// ========== FORM VALIDATION ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const email = document.getElementById('senderEmail');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
       
        let isValid = true;
       
        if (!email.value.trim() || !isValidEmail(email.value)) {
            email.style.borderColor = '#ef4444';
            email.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.15)';
            isValid = false;
        } else {
            email.style.borderColor = '';
            email.style.boxShadow = '';
        }
       
        if (!subject.value.trim()) {
            subject.style.borderColor = '#ef4444';
            subject.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.15)';
            isValid = false;
        } else {
            subject.style.borderColor = '';
            subject.style.boxShadow = '';
        }
       
        if (!message.value.trim()) {
            message.style.borderColor = '#ef4444';
            message.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.15)';
            isValid = false;
        } else {
            message.style.borderColor = '';
            message.style.boxShadow = '';
        }
       
        if (!isValid) {
            e.preventDefault();
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ========== REVIEWS CAROUSEL ==========
class ReviewsCarousel {
    constructor() {
        this.currentIndex = 0;
        this.items = document.querySelectorAll('.carousel-item');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.totalItems = this.items.length;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 7000;
        this.touchStartX = 0;
        this.touchEndX = 0;
        
        this.init();
    }

    init() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }

        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });

        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('touchstart', (e) => this.handleTouchStart(e), false);
            carouselContainer.addEventListener('touchend', (e) => this.handleTouchEnd(e), false);
            carouselContainer.addEventListener('mouseenter', () => this.stopAutoPlay());
            carouselContainer.addEventListener('mouseleave', () => this.startAutoPlay());
        }

        this.startAutoPlay();
    }

    handleTouchStart(e) {
        this.touchStartX = e.changedTouches[0].screenX;
    }

    handleTouchEnd(e) {
        this.touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe();
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const diff = this.touchStartX - this.touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        }
    }

    showSlide(index) {
        if (index >= this.totalItems) {
            this.currentIndex = 0;
        } else if (index < 0) {
            this.currentIndex = this.totalItems - 1;
        } else {
            this.currentIndex = index;
        }

        this.items.forEach(item => item.classList.remove('active'));
        this.indicators.forEach(indicator => indicator.classList.remove('active'));

        this.items[this.currentIndex].classList.add('active');
        this.indicators[this.currentIndex].classList.add('active');
    }

    nextSlide() {
        this.showSlide(this.currentIndex + 1);
        this.resetAutoPlay();
    }

    prevSlide() {
        this.showSlide(this.currentIndex - 1);
        this.resetAutoPlay();
    }

    goToSlide(index) {
        this.showSlide(index);
        this.resetAutoPlay();
    }

    startAutoPlay() {
        if (this.autoPlayInterval) return;
        
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
}

// ========== INITIALIZE ON DOM LOAD ==========
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeTitle, 500);
    document.documentElement.style.scrollBehavior = 'smooth';
    const carousel = new ReviewsCarousel();
});