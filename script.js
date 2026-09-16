// Wait for the HTML elements to load completely before executing
document.addEventListener('DOMContentLoaded', () => {
    
    // Select all agricultural service display cards
    const cards = document.querySelectorAll('.card');

    // Attach click event alerts to simulate dashboard tracking functionality
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const serviceName = card.getAttribute('data-service');
            alert(`Opening tracking module dashboard for: ${serviceName}`);
        });
    });

    // Smooth scroll configuration logic for nav links
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            // Check if it's an internal link identifier
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});