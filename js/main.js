// Mobile menu toggle
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('active');
}

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('active');
  });
});

// Enhanced navbar scroll effect
function handleNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  const scrollTop = window.pageYOffset;
  
  if (scrollTop > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

// Scroll animation observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Initialize scroll animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
  animatedElements.forEach(el => observer.observe(el));
}

// Counter animation for statistics
function animateCounters() {
  const counters = document.querySelectorAll('.stat h3');
  const speed = 2000; // Animation duration in ms

  counters.forEach(counter => {
    const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
    const increment = target / speed * 20; // Update every 20ms
    let current = 0;
    const suffix = counter.textContent.replace(/[0-9]/g, '');

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current) + suffix;
        setTimeout(updateCounter, 20);
      } else {
        counter.textContent = target + suffix;
      }
    };

    // Start counter animation when element is visible
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCounter();
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counterObserver.observe(counter.closest('.stat'));
  });
}

// Contact form handling
function handleContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Add loading state to button
      const submitBtn = contactForm.querySelector('.btn');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.style.opacity = '0.7';
      submitBtn.style.pointerEvents = 'none';
      
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      
      // Simulate form submission (replace with actual endpoint)
      setTimeout(() => {
        alert('Thank you for your message! We will get back to you within 24 hours.');
        contactForm.reset();
        
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.style.opacity = '1';
        submitBtn.style.pointerEvents = 'auto';
      }, 1500);
    });
  }
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.offsetTop - navHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Add active class to current page nav link
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Parallax effect for hero section
function initParallax() {
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.5;
      hero.style.transform = `translateY(${parallax}px)`;
    });
  }
}

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Enhanced scroll handler with debouncing
const debouncedScrollHandler = debounce(handleNavbarScroll, 10);

// Service card hover effects
function initServiceCardEffects() {
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// Loading animation
function initLoadingAnimation() {
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
      const heroContent = document.querySelector('.hero-content');
      if (heroContent) {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
      }
    }, 300);
  });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all features
  initScrollAnimations();
  animateCounters();
  handleContactForm();
  initSmoothScroll();
  setActiveNavLink();
  initParallax();
  initServiceCardEffects();
  initLoadingAnimation();
  
  // Add scroll listeners
  window.addEventListener('scroll', debouncedScrollHandler);
  
  // Handle window resize for mobile menu
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      document.getElementById('navLinks').classList.remove('active');
    }
  });
});

// Add CSS for initial loading state
const style = document.createElement('style');
style.textContent = `
  .hero-content {
    opacity: 0;
    transform: translateY(30px);
    transition: all 1s ease-out;
  }
  
  body.loaded .hero-content {
    opacity: 1;
    transform: translateY(0);
  }
  
  .service-card {
    transition: transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1) !important;
  }
`;
document.head.appendChild(style);