document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const name = this.dataset.name;
            const price = parseFloat(this.dataset.price);
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

            const item = cartItems.find(item => item.name === name);
            if (item) {
                item.quantity += 1;
            } else {
                cartItems.push({ name, price, quantity: 1 });
            }

            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            alert(`${name} added to cart!`);
        });
    });
});
