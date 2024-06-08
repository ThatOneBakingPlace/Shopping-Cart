document.addEventListener('DOMContentLoaded', function() {
    const cartItems = [];
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.getElementById('total-price');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const name = this.dataset.name;
            const price = parseFloat(this.dataset.price);

            const item = cartItems.find(item => item.name === name);
            if (item) {
                item.quantity += 1;
            } else {
                cartItems.push({ name, price, quantity: 1 });
            }
            updateCart();
        });
    });

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
});
