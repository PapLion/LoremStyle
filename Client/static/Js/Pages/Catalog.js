let categoryFilter = 'all'; 
let conditionFilter = 'all'; 
let ageFilter = 'all';       
let minPriceFilter = 0;      
let maxPriceFilter = Infinity; 
let sortOrder = 'price-asc'; 

// Set filter values
function setCategoryFilter(value) {
  categoryFilter = value;
  updateURLParameter('category', value);
  filterProducts();
}

function setConditionFilter(value) {
  conditionFilter = value;
  updateURLParameter('condition', value);
  filterProducts();
}

function setAgeFilter(value) {
  ageFilter = value;
  updateURLParameter('audience', value);
  filterProducts();  
}

function setPriceFilter(min, max) {
  minPriceFilter = parseFloat(min) || 0;
  maxPriceFilter = parseFloat(max) || Infinity;
  filterProducts();
}

function setSortOrder(value) {
  sortOrder = value;
  updateURLParameter('sort', value);
  filterProducts();
}

// Actualiza la URL con los parámetros del filtro sin recargar la página
function updateURLParameter(param, value) {
  const url = new URL(window.location);
  if (value === 'all') {
    url.searchParams.delete(param); // Eliminar el parámetro si es 'all'
  } else {
    url.searchParams.set(param, value); // Añadir o actualizar el parámetro
  }
  window.history.pushState({}, '', url);  // Actualizar la URL
}

// Filtra los productos con los parámetros actuales de manera asíncrona
async function filterProducts() {
  const productList = document.getElementById('product-list');
  productList.innerHTML = ''; // Limpiar la lista antes de agregar los productos

  try {
    const response = await fetch('/get_items'); // Fetch asíncrono
    const products = await response.json();

    // Filtrar productos según los valores seleccionados
    let filteredProducts = products.filter(product => {
      const categoryMatch = categoryFilter === 'all' || product.category === categoryFilter;
      const conditionMatch = conditionFilter === 'all' || product.condition === conditionFilter;
      const ageMatch = ageFilter === 'all' || product.audience === ageFilter;
      const priceMatch = product.price >= minPriceFilter && product.price <= maxPriceFilter;

      return categoryMatch && conditionMatch && ageMatch && priceMatch;
    });

    // Ordenar los productos filtrados
    filteredProducts = sortProducts(filteredProducts, sortOrder);

    // Mostrar los productos filtrados
    filteredProducts.forEach(product => {
      productList.innerHTML += `
        <div class="col-sm-6 col-lg-4 mb-4 product-card" data-category="${product.category}">
          <div class="card">
            <img src="${product.image}" class="card-img-top product-image" alt="${product.name}">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">$${product.price.toFixed(2)}</p>
              <p class="card-text text-muted">${product.condition === 'used' ? '(Segunda Mano)' : ''}</p>
              <button class="btn btn-primary w-100 mt-2" onclick="addToCart(${product.id})">Añadir Producto al Carrito</button>
            </div>
          </div>
        </div>
      `;
    });

    // Actualizar la visualización del contador de productos
    document.getElementById('product-count').textContent = `${filteredProducts.length} productos encontrados`;

  } catch (error) {
    console.error('Error al obtener los items del carrito:', error);
  }
}

// Ordenar los productos según el criterio seleccionado
function sortProducts(products, order) {
  switch (order) {
    case 'price-asc':
      return products.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return products.sort((a, b) => b.price - a.price);
    case 'date-asc':
      return products.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
    case 'date-desc':
      return products.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    default:
      return products;
  }
}

// Inicializar los filtros desde el query string al cargar la página
function initFilters() {
  const params = new URLSearchParams(window.location.search);

  const category = params.get('category') || 'all';
  const condition = params.get('condition') || 'all';
  const audience = params.get('audience') || 'all';
  const sort = params.get('sort') || 'price-asc';

  categoryFilter = category;
  conditionFilter = condition;
  ageFilter = audience;
  sortOrder = sort;

  document.getElementById('category-filter').value = category;
  document.getElementById('condition-filter').value = condition;
  document.getElementById('age-filter').value = audience;
  document.getElementById('sort-filter').value = sort;

  filterProducts(); // Ejecutar el fetch de productos
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', initFilters);
document.addEventListener('DOMContentLoaded', filterProducts);

// Detectar cambios en la URL y volver a aplicar filtros sin recargar
window.addEventListener('popstate', () => {
  initFilters();
  filterProducts();
});