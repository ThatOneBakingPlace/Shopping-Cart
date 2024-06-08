document.addEventListener('DOMContentLoaded', function() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.getElementById('total-price');

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        cartItems.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('cart-item');
            li.innerHTML = `${item.name} - $${item.price} x ${item.quantity}`;
            cartItemsContainer.appendChild(li);

            totalPrice += item.price * item.quantity;
        });

        totalPriceElement.textContent = totalPrice.toFixed(2);
    }

    updateCart();

    document.querySelector('.checkout').addEventListener('click', function() {
        alert('Proceeding to checkout...');
        // Add checkout functionality here
    });
});
