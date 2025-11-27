window.cart = window.cart || [];
let cart = window.cart;

const cartCounter = document.getElementById('cartCounter');
const cartIcon = document.getElementById('cartIcon');
const cartModal = document.getElementById('cartModal');
const modalOverlay = document.createElement('div');
modalOverlay.classList.add('modal-overlay');
document.body.appendChild(modalOverlay);
const closeModal = cartModal.querySelector('.close');

function showModal() {
    cartModal.style.display = 'block';
    modalOverlay.style.display = 'block';
}
function hideModal() {
    cartModal.style.display = 'none';
    modalOverlay.style.display = 'none';
}

cartIcon.addEventListener('click', showModal);
closeModal.addEventListener('click', hideModal);
modalOverlay.addEventListener('click', hideModal);

function updateCartUI() {
    cartCounter.textContent = cart.length;
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';

    let grouped = {};
    cart.forEach(item => {
        if(!grouped[item.currency]) grouped[item.currency] = [];
        grouped[item.currency].push(item);
    });

    let totalText = '';
    Object.keys(grouped).forEach(currency => {
        let subtotal = 0;
        grouped[currency].forEach(item => {
            subtotal += item.price * item.quantity;
            const li = document.createElement('li');
            li.innerHTML = `${item.title} x ${item.quantity} = ${item.price * item.quantity} ${currency} 
                <button class="remove-item">X</button>`;
            li.querySelector('.remove-item').addEventListener('click', () => {
                window.cart = window.cart.filter(i => i !== item);
                cart = window.cart;
                updateCartUI();
            });
            cartItems.appendChild(li);
        });
        totalText += `${subtotal} ${currency} `;
    });
    document.getElementById('cartTotal').textContent = totalText.trim();
}

function animateToCart(img) {
    const clone = img.cloneNode(true);
    const rect = img.getBoundingClientRect();
    clone.style.position = 'fixed';
    clone.style.left = rect.left + 'px';
    clone.style.top = rect.top + 'px';
    clone.style.width = rect.width + 'px';
    clone.style.height = rect.height + 'px';
    clone.style.transition = 'all 0.5s ease-in-out';
    clone.style.zIndex = 1000;
    document.body.appendChild(clone);

    const cartRect = cartIcon.getBoundingClientRect();
    setTimeout(() => {
        clone.style.left = cartRect.left + 'px';
        clone.style.top = cartRect.top + 'px';
        clone.style.width = '0px';
        clone.style.height = '0px';
        clone.style.opacity = 0;
    }, 50);

    setTimeout(() => document.body.removeChild(clone), 550);
}

document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('article');
        const img = card.querySelector('img');
        animateToCart(img);

        const priceText = card.querySelector('.price').textContent;
        const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
        const currency = priceText.replace(/[0-9.,\s]/g,'').trim();

        const product = {
            title: card.querySelector('.title').textContent,
            price: price,
            currency: currency,
            quantity: 1
        };
        cart.push(product);
        updateCartUI();
    });
});
