let cartItems = [
  { id: 1, name: "Camiseta Básica", price: 19.99, quantity: 1 },
  { id: 2, name: "Jeans Clásicos", price: 49.99, quantity: 1 },
  { id: 3, name: "Zapatos Deportivos", price: 69.99, quantity: 1 },
  { id: 4, name: "Gorra Casual", price: 14.99, quantity: 1 },
  { id: 5, name: "Suéter de Lana", price: 39.99, quantity: 1 },
  { id: 6, name: "Reloj de Pulsera", price: 89.99, quantity: 1 },
  { id: 7, name: "Bufanda de Algodón", price: 9.99, quantity: 1 },
  { id: 8, name: "Mochila Casual", price: 59.99, quantity: 1 },
  { id: 9, name: "Lentes de Sol", price: 29.99, quantity: 1 },
  { id: 10, name: "Corbata Elegante", price: 24.99, quantity: 1 }
];

const cartIcon = document.getElementById('cart-icon');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCartButton = document.getElementById('close-cart');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsList = document.getElementById('cart-items');
const totalPrice = document.getElementById('total-price');
const itemCount = document.getElementById('item-count');
const checkoutButton = document.getElementById('checkout-link');

const updateCart = () => {
  cartItemsList.innerHTML = '';

  if (cartItems.length === 0) {
    cartItemsList.innerHTML = '<li class="list-group-item text-center text-muted">Su carrito está vacío</li>';
    checkoutButton.disabled = true;
  } else {
    cartItems.forEach(item => {
      const itemElement = document.createElement('li');
      itemElement.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

      const trashIcon = document.createElement('i');
      trashIcon.classList.add('fa', 'fa-trash', 'text-danger');
      trashIcon.style.cursor = 'pointer';
      trashIcon.addEventListener('click', () => {
        removeItemFromCart(item.id);
      });

      itemElement.innerHTML = `
        <span>${item.name} (x${item.quantity})</span>
        <span>$${(item.price * item.quantity).toFixed(2)}</span>
      `;

      itemElement.appendChild(trashIcon);
      cartItemsList.appendChild(itemElement);
    });
    checkoutButton.disabled = false;
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalPrice.textContent = `$${total.toFixed(2)}`;
  itemCount.textContent = cartItems.reduce((sum, item) => sum + item.quantity, 0);
};

const removeItemFromCart = (itemId) => {
  cartItems = cartItems.filter(item => item.id !== itemId);
  updateCart();
};

cartIcon.addEventListener('click', () => {
  cartSidebar.classList.add('active');
  cartOverlay.classList.add('active');
  updateCart();
});

closeCartButton.addEventListener('click', () => {
  cartSidebar.classList.remove('active');
  cartOverlay.classList.remove('active');
});

cartOverlay.addEventListener('click', () => {
  cartSidebar.classList.remove('active');
  cartOverlay.classList.remove('active');
});

updateCart();
