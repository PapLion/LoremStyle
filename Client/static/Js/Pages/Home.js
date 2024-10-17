document.addEventListener("DOMContentLoaded", () => {
  fetchLatestItems();
  updateLatestItems();
})

window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    const edad = params.get('edad');
  
    if (edad) {
      document.getElementById('age-filter').value = edad;
      setAgeFilter(edad); 
    }
  };

  function fetchLatestItems() {
    fetch('/latest_items', { method: 'GET' })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.detail) { 
          const items = data.detail;
          updateLatestItems(items);
        } else {
          console.error("El JSON no contiene la propiedad 'detail'.");
        }
      })
      .catch(error => {
        console.error('Error al obtener los últimos ítems:', error);
      });
  }
  
  function updateLatestItems(items) {
    const row = document.querySelector('.row.g-4.new');
    row.innerHTML = '';
  
    items.forEach((item) => {
      const col = document.createElement('div');
      col.classList.add('col-md-4');
      col.innerHTML = `
        <div class="card">
          <img src="${item.image_url}" class="product-image" alt="${item.name}">
          <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">$${item.price}</p>
            <button class="btn btn-primary w-100 mt-2" onclick="addToCart(${item.id})">Añadir Producto al Carrito</button>
          </div>
        </div>
      `;
      row.appendChild(col);
    });
  }

  function redirectToCatalog(edadSeleccionada) {
    window.location.href = `/catalog?audience=${edadSeleccionada}`;
  }

  module.exports = { fetchLatestItems, updateLatestItems };