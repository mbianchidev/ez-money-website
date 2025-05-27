// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    for (const link of anchorLinks) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Handle email form submission
    const emailForm = document.getElementById('email-form');
    if (emailForm) {
        emailForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = document.getElementById('email');
            const email = emailInput.value;
            
            if (validateEmail(email)) {
                // In a real app, you would send this to your backend
                console.log('Email submitted:', email);
                
                // Show success message
                const formGroup = emailInput.closest('.form-group');
                const successMessage = document.createElement('p');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you! You have been added to our waitlist.';
                successMessage.style.color = 'white';
                successMessage.style.marginTop = '10px';
                
                formGroup.insertAdjacentElement('afterend', successMessage);
                
                // Reset form
                emailInput.value = '';
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Simple email validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Testimonial slider functionality (simple version)
    let currentSlide = 0;
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    // Function to handle responsive behavior
    function handleTestimonials() {
        if (window.innerWidth < 768) {
            // On mobile, show only one testimonial at a time
            testimonialCards.forEach((card, index) => {
                if (index === currentSlide) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        } else {
            // On desktop, show all testimonials
            testimonialCards.forEach(card => {
                card.style.display = 'block';
            });
        }
    }
    
    // Initial call and resize event
    handleTestimonials();
    window.addEventListener('resize', handleTestimonials);
    
    // Set up auto-rotation for mobile testimonials
    setInterval(() => {
        if (window.innerWidth < 768) {
            currentSlide = (currentSlide + 1) % testimonialCards.length;
            handleTestimonials();
        }
    }, 5000);
});
