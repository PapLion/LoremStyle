// Side-Cart.js

let cartItems = [];

function getUserToken() {
  return localStorage.getItem('user_token')
}

async function fetchCartItems() {
  const token = getUserToken();
  try {
    const response = await fetch('/cart/get_items_cart', { 
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail);
    }

    cartItems = data.detail;
    return cartItems;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return [];
  }
}

async function addToCart(itemId) {
  const token = getUserToken();
  try {
    const response = await fetch('/cart/add_to_cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ item_id: itemId, token: token, quantity: 1 })
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.detail || 'Failed to add item to cart');
    }
    await fetchCartItems();
    updateCart();
  } catch (error) {
    console.error('Error adding item to cart:', error);
  }
}

async function removeFromCart(itemId) {
  const token = getUserToken();
  try {
    const response = await fetch('/cart/delete_to_cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ item_id: itemId, token: token, quantity: null })
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.detail || 'Failed to remove item from cart');
    }
    await fetchCartItems();
    updateCart();
  } catch (error) {
    console.error('Error removing item from cart:', error); 
  }
}

function updateCart() {
  const cartItemsList = document.getElementById('cart-items');
  const totalPrice = document.getElementById('total-price');
  const itemCount = document.getElementById('item-count');
  const checkoutButton = document.getElementById('checkout-link');

  if (!cartItemsList || !totalPrice || !itemCount || !checkoutButton) {
    console.error('One or more required DOM elements not found');
    return;
  }

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
      trashIcon.addEventListener('click', () => removeFromCart(item.id));

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
}

function openCart() {
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartOverlay = document.getElementById('cart-overlay');
  
  if (cartSidebar && cartOverlay) {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
    fetchCartItems().then(updateCart);
  } else {
    console.error('Cart sidebar or overlay not found');
  }
}

function closeCart() {
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartOverlay = document.getElementById('cart-overlay');
  
  if (cartSidebar && cartOverlay) {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
  } else {
    console.error('Cart sidebar or overlay not found');
  }
}

function initializeCart() {
  const cartIcon = document.getElementById('cart-icon');
  const closeCartButton = document.getElementById('close-cart');
  const cartOverlay = document.getElementById('cart-overlay');

  if (cartIcon) {
    cartIcon.addEventListener('click', openCart);
  } else {
    console.error('Cart icon not found');
  }

  if (closeCartButton) {
    closeCartButton.addEventListener('click', closeCart);
  } else {
    console.error('Close cart button not found');
  }

  if (cartOverlay) {
    cartOverlay.addEventListener('click', closeCart);
  } else {
    console.error('Cart overlay not found');
  }

  fetchCartItems().then(updateCart);
}

const SideCart = {
  getCartItems: () => cartItems,
  setCartItems: (items) => { cartItems = items; },
  fetchCartItems,
  addToCart,
  removeFromCart,
  updateCart,
  getUserToken,
  openCart,
  closeCart,
  initializeCart
};

document.addEventListener('DOMContentLoaded', SideCart.initializeCart);

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SideCart;
}