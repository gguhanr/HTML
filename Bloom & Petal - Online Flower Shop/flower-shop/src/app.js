// JavaScript code for the online flower shop website

document.addEventListener('DOMContentLoaded', () => {
    
    // --- CONFIGURATION ---
    const WHATSAPP_NUMBER = "911234567890"; // Replace with your WhatsApp number including country code
    const CURRENCY = "₹";

    // --- DATA ---
    const flowers = [
        { id: 1, name: 'Crimson Roses', price: 150, image: 'https://placehold.co/600x400/f87171/ffffff?text=Roses' },
        { id: 2, name: 'Sunny Sunflowers', price: 120, image: 'https://placehold.co/600x400/fbbf24/ffffff?text=Sunflowers' },
        { id: 3, name: 'Elegant Lilies', price: 200, image: 'https://placehold.co/600x400/a78bfa/ffffff?text=Lilies' },
        { id: 4, name: 'Delicate Tulips', price: 180, image: 'https://placehold.co/600x400/f472b6/ffffff?text=Tulips' },
        { id: 5, name: 'Orchid Paradise', price: 250, image: 'https://placehold.co/600x400/c084fc/ffffff?text=Orchids' },
        { id: 6, name: 'Mixed Bouquet', price: 300, image: 'https://placehold.co/600x400/34d399/ffffff?text=Bouquet' }
    ];

    // --- STATE ---
    let cart = {}; // Example: { 1: 2, 3: 1 } means 2 of flowerId 1, 1 of flowerId 3

    // --- DOM ELEMENTS ---
    const flowerSelection = document.getElementById('flower-selection');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalCostEl = document.getElementById('total-cost');
    const cartCountEl = document.getElementById('cart-count');
    const whatsappBtn = document.getElementById('whatsapp-btn');

    // --- FUNCTIONS ---

    function renderProducts() {
        let html = '';
        flowers.forEach(flower => {
            html += `
                <div class="bg-white rounded-2xl shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                    <img src="${flower.image}" alt="${flower.name}" class="w-full h-56 object-cover">
                    <div class="p-6">
                        <h3 class="text-2xl font-bold font-display text-gray-800">${flower.name}</h3>
                        <p class="text-xl text-pink-500 font-semibold mt-2">${CURRENCY}${flower.price.toFixed(2)}</p>
                        <div class="mt-4 flex items-center">
                            <label for="qty-${flower.id}" class="mr-3 text-gray-600">Quantity:</label>
                            <input type="number" id="qty-${flower.id}" data-id="${flower.id}"
                                   class="quantity-input w-20 p-2 border border-gray-300 rounded-lg text-center font-bold" 
                                   min="0" value="0">
                        </div>
                    </div>
                </div>
            `;
        });
        flowerSelection.innerHTML = html;
    }

    function handleQuantityChange(event) {
        const input = event.target;
        const flowerId = parseInt(input.dataset.id);
        const quantity = parseInt(input.value);

        if (quantity > 0) {
            cart[flowerId] = quantity;
        } else {
            delete cart[flowerId];
        }
        
        if (quantity < 0) {
            input.value = 0;
            delete cart[flowerId];
        }

        updateCart();
    }

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let totalCost = 0;
        let totalItems = 0;
        const cartIsEmpty = Object.keys(cart).length === 0;

        if (cartIsEmpty) {
            cartItemsContainer.innerHTML = '<p class="text-gray-500">Your cart is empty. Add some flowers to get started!</p>';
        } else {
            let cartHtml = '<div class="space-y-4">';
            for (const flowerId in cart) {
                const quantity = cart[flowerId];
                const flower = flowers.find(f => f.id == flowerId);
                const subtotal = flower.price * quantity;
                totalCost += subtotal;
                totalItems += quantity;

                cartHtml += `
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="font-bold text-lg">${flower.name}</p>
                            <p class="text-gray-600">Quantity: ${quantity}</p>
                        </div>
                        <p class="font-semibold text-lg">${CURRENCY}${subtotal.toFixed(2)}</p>
                    </div>
                `;
            }
            cartHtml += '</div>';
            cartItemsContainer.innerHTML = cartHtml;
        }

        totalCostEl.textContent = `${CURRENCY}${totalCost.toFixed(2)}`;
        cartCountEl.textContent = totalItems;
        whatsappBtn.disabled = cartIsEmpty;
    }

    function sendWhatsAppMessage() {
        let message = "Hello Bloom & Petal! I'd like to place an order:\n\n";
        let totalCost = 0;

        for (const flowerId in cart) {
            const quantity = cart[flowerId];
            const flower = flowers.find(f => f.id == flowerId);
            const subtotal = flower.price * quantity;
            totalCost += subtotal;
            message += `*${flower.name}*:\n`;
            message += `  - Quantity: ${quantity}\n`;
            message += `  - Price: ${CURRENCY}${flower.price.toFixed(2)} each\n`;
            message += `  - Subtotal: ${CURRENCY}${subtotal.toFixed(2)}\n\n`;
        }

        message += `*TOTAL COST: ${CURRENCY}${totalCost.toFixed(2)}*\n\n`;
        message += "Please confirm my order. Thank you!";

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
    }

    // --- INITIALIZATION & EVENT LISTENERS ---

    renderProducts();
    updateCart(); // Initial cart render

    flowerSelection.addEventListener('input', (event) => {
        if (event.target.classList.contains('quantity-input')) {
            handleQuantityChange(event);
        }
    });

    whatsappBtn.addEventListener('click', sendWhatsAppMessage);
});