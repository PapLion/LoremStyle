const cartItems = [
  { id: 1, name: "Camiseta Básica", price: 19.99, quantity: 1, image: "placeholder.svg?height=100&width=100" },
  { id: 2, name: "Jeans Clásicos", price: 49.99, quantity: 1, image: "placeholder.svg?height=100&width=100" },
  { id: 3, name: "Zapatillas Deportivas", price: 59.99, quantity: 1, image: "placeholder.svg?height=100&width=100" },
  { id: 4, name: "Chaqueta de Cuero", price: 89.99, quantity: 1, image: "placeholder.svg?height=100&width=100" },
  { id: 5, name: "Gorra de Beisbol", price: 15.99, quantity: 1, image: "placeholder.svg?height=100&width=100" },
];

function renderCart() {
  const cartContainer = document.getElementById('cart');
  const emptyCartMessage = document.getElementById('empty-cart');
  const cartItemsTable = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  if (cartItems.length === 0) {
      cartContainer.style.display = 'none';
      emptyCartMessage.style.display = 'block';
  } else {
      cartContainer.style.display = 'block';
      emptyCartMessage.style.display = 'none';

      cartItemsTable.innerHTML = '';
      let total = 0;

      cartItems.forEach(item => {
          const itemTotal = item.price * item.quantity;
          total += itemTotal;

          const row = document.createElement('tr');
          row.innerHTML = `
            <td>
              <div class="d-flex align-items-center">
                <img src="${item.image}" alt="${item.name}" style="width: 50px; margin-right: 10px;">
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
}

function updateQuantity(id, newQuantity) {
  if (newQuantity < 1) return;

  const item = cartItems.find(item => item.id === id);
  if (item) {
      item.quantity = parseInt(newQuantity);
      renderCart();
  }
}

function removeItem(id) {
  const index = cartItems.findIndex(item => item.id === id);
  if (index !== -1) {
      cartItems.splice(index, 1);
      renderCart();
  }
}

document.addEventListener('DOMContentLoaded', renderCart);
