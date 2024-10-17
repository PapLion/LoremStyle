// Cart.js

let cartItems = [];

const getUserToken = () => {
  return sessionStorage.getItem('user_token');
};

const fetchCartItems = async () => {
  try {
    const response = await fetch('/cart/get_items_cart', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getUserToken()}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response || !response.ok) {
      throw new Error('Error al obtener los items del carrito');
    }

    cartItems = await response.json();
    console.log(cartItems.detail)
    updateCart();
  } catch (error) {
    console.error('Error al obtener los items del carrito:', error);
  }
};

const updateCart = () => {
  const cartContainer = document.getElementById('cart');
  const emptyCartMessage = document.getElementById('empty-cart');
  const cartItemsTable = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  if (!cartContainer || !emptyCartMessage || !cartItemsTable || !cartTotal) {
    console.error('One or more required DOM elements not found');
    return;
  }

  cartItemsTable.innerHTML = '';

  if (cartItems.length === 0) {
    cartContainer.style.display = 'none';
    emptyCartMessage.style.display = 'block';
  } else {
    cartContainer.style.display = 'block';
    emptyCartMessage.style.display = 'none';

    let total = 0;

    cartItems.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>
          <div class="d-flex align-items-center">
            <img src="${item.image || 'placeholder.svg?height=100&width=100'}" alt="${item.name}" style="width: 50px; margin-right: 10px;">
            ${item.name}
          </div>
        </td>
        <td>$${item.price.toFixed(2)}</td>
        <td>
          <div class="d-flex align-items-center">
            <button class="btn btn-sm btn-outline-secondary me-2" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
            <input type="number" class="form-control w-25 text-center" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
            <button class="btn btn-sm btn-outline-secondary ms-2" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
          </div>
        </td>
        <td>$${itemTotal.toFixed(2)}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="removeItem(${item.id})">Eliminar</button>
        </td>
      `;
      cartItemsTable.appendChild(row);
    });

    cartTotal.textContent = total.toFixed(2);
  }
};

const updateQuantity = async (id, newQuantity) => {
  if (newQuantity < 1) return;

  const item = cartItems.find(item => item.id === id);
  if (item) {
    item.quantity = parseInt(newQuantity);
    await fetch(`/update_quantity`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getUserToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ item_id: id, quantity: item.quantity })
    });
    updateCart();
  }
};

const removeItem = async (id) => {
  try {
    const response = await fetch('/cart/delete_to_cart', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getUserToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ item_id: id }),
    });

    if (!response || !response.ok) {
      throw new Error('Error al eliminar el item del carrito');
    }

    await fetchCartItems();
  } catch (error) {
    console.error('Error al eliminar el item del carrito:', error);
  }
};

const Cart = {
  getCartItems: () => cartItems,
  setCartItems: (items) => { cartItems = items; },
  fetchCartItems,
  updateCart,
  updateQuantity,
  removeItem,
  getUserToken
};

module.exports = Cart;