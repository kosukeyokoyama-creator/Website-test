// Backend API URL
const API_URL = 'https://website-test-production-23b4.up.railway.app';

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact form handling with Backend Integration
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const submitButton = this.querySelector('button[type="submit"]');
    
    // Validate form
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Show loading state
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    try {
        // Send form data to backend
        const response = await fetch(`${API_URL}/api/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: message
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Show success message
            alert('✅ Thank you for your message! We will get back to you soon.');
            
            // Reset form
            this.reset();
        } else {
            // Show error message
            alert('❌ Error: ' + result.message);
        }
        
    } catch (error) {
        console.error('Form submission error:', error);
        alert('❌ Failed to send message. Please try again later.');
    } finally {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});

// Add to cart button functionality
document.querySelectorAll('.buy-button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get the pricing card parent
        const card = this.closest('.pricing-card');
        const title = card.querySelector('h3').textContent;
        const price = card.querySelector('.price').textContent;
        
        // Show feedback
        const originalText = this.textContent;
        this.textContent = '✓ Added to Cart';
        this.style.backgroundColor = '#000';
        this.style.color = '#fff';
        
        // Reset button after 2 seconds
        setTimeout(() => {
            this.textContent = originalText;
            if (this.classList.contains('featured-btn')) {
                this.style.backgroundColor = '#000';
                this.style.color = '#fff';
            } else {
                this.style.backgroundColor = '#fff';
                this.style.color = '#000';
            }
        }, 2000);
        
        // Log to console (in real scenario, would send to backend)
        console.log(`Added to cart: ${title} - ${price}`);
    });
});

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards and testimonial cards
document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Add active link highlighting
window.addEventListener('scroll', function() {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Add active link styling
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        color: #000;
        font-weight: 700;
        border-bottom: 2px solid #000;
        padding-bottom: 5px;
    }
`;
document.head.appendChild(style);
