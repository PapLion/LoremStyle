// Side-Cart.js

let cartItems = [];

function getUserToken() {
  return localStorage.getItem('userToken') || 'default_token';
}

async function fetchCartItems() {
  const token = getUserToken();
  try {
    const response = await fetch('/items_cart', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response || !response.ok) {
      throw new Error('Failed to fetch cart items');
    }
    cartItems = await response.json();
    return cartItems;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return [];
  }
}

async function addToCart(itemId) {
  const token = getUserToken();
  try {
    const response = await fetch('/add_to_cart', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ item_id: itemId, user_token: token })
    });
    if (!response || !response.ok) {
      throw new Error('Failed to add item to cart');
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
    const response = await fetch('/delete_to_cart', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ item_id: itemId, user_token: token })
    });
    if (!response || !response.ok) {
      throw new Error('Failed to remove item from cart');
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

const SideCart = {
  getCartItems: () => cartItems,
  setCartItems: (items) => { cartItems = items; },
  fetchCartItems,
  addToCart,
  removeFromCart,
  updateCart,
  getUserToken
};

module.exports = SideCart;