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

document.addEventListener('DOMContentLoaded', () => {
    const CART_KEY = 'agric-cart';
    const nav = document.querySelector('nav');

    let cart = [];
    try {
        cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
        cart = [];
    }

    // Add a cart toggle and panel to the navigation.
    const cartButton = document.createElement('button');
    cartButton.type = 'button';
    cartButton.className = 'btn btn-outline-success rounded-pill';
    cartButton.setAttribute('aria-expanded', 'false');
    cartButton.setAttribute('aria-label', 'Open shopping cart');

    const cartPanel = document.createElement('div');
    cartPanel.className = 'bg-white border rounded shadow p-3';
    cartPanel.hidden = true;
    cartPanel.style.cssText = 'position:absolute; right:1rem; top:100%; z-index:1050; width:min(320px, calc(100vw - 2rem));';

    if (nav) {
        nav.style.position = 'relative';
        nav.append(cartButton, cartPanel);
    }

    const saveCart = () => {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    };

    const renderCart = () => {
        const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
        cartButton.textContent = `Cart (${itemCount})`;

        if (!cart.length) {
            cartPanel.innerHTML = '<p class="mb-0 text-muted">Your cart is empty.</p>';
            return;
        }

        cartPanel.innerHTML = `
            <h2 class="h6">Your cart</h2>
            <ul class="list-unstyled mb-0">
                ${cart.map((item, index) => `
                    <li class="d-flex justify-content-between align-items-center gap-2 py-2 border-top">
                        <span>${item.name} <span class="text-muted">× ${item.quantity}</span></span>
                        <button type="button" class="btn btn-sm btn-outline-danger" data-remove-index="${index}" aria-label="Remove ${item.name}">Remove</button>
                    </li>
                `).join('')}
            </ul>
        `;
    };

    renderCart();

    cartButton.addEventListener('click', () => {
        cartPanel.hidden = !cartPanel.hidden;
        cartButton.setAttribute('aria-expanded', String(!cartPanel.hidden));
    });

    cartPanel.addEventListener('click', event => {
        const removeButton = event.target.closest('[data-remove-index]');
        if (!removeButton) return;

        cart.splice(Number(removeButton.dataset.removeIndex), 1);
        saveCart();
        renderCart();
    });

    // Add products to the cart.
    document.querySelectorAll('button').forEach(button => {
        if (!button.textContent.trim().toLowerCase().includes('add to cart')) return;

        button.addEventListener('click', event => {
            event.stopPropagation();

            const card = button.closest('.card');
            const name = card?.querySelector('.card-title')?.textContent.trim();
            if (!name) return;

            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, quantity: 1 });
            }

            saveCart();
            renderCart();
            button.textContent = 'Added to Cart';
            window.setTimeout(() => {
                button.innerHTML = 'Add to Cart';
            }, 1200);
        });
    });

    // Keep clicks on service cards from affecting product cards.
    document.querySelectorAll('.services [data-services]').forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('border-success');
        });
    });

    // Smooth-scroll for links that point to a section on this page.
    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', event => {
            const target = document.querySelector(link.getAttribute('href'));
            if (!target) return;

            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });
});