let categoryFilter = 'all'; 
let conditionFilter = 'all'; 
let ageFilter = 'all';       
let minPriceFilter = 0;      
let maxPriceFilter = Infinity; 
let sortOrder = 'price-asc'; 

// Set filter values
function setCategoryFilter(value) {
  categoryFilter = value;
  filterProducts();
}

function setConditionFilter(value) {
  conditionFilter = value;
  filterProducts();
}

function setAgeFilter(value) {
  ageFilter = value;
  updateURLParameter('for', value); 
  filterProducts();  
}

function setPriceFilter(min, max) {
  minPriceFilter = parseFloat(min) || 0;
  maxPriceFilter = parseFloat(max) || Infinity;
  filterProducts();
}

function setSortOrder(value) {
  sortOrder = value;
  filterProducts();
}

// Update URL with filter parameters
function updateURLParameter(param, value) {
  const url = new URL(window.location);
  url.searchParams.set(param, value);
  window.history.pushState({}, '', url);
}

// Fetch products and apply filters
function filterProducts() {
  const productList = document.getElementById('product-list');
  productList.innerHTML = ''; 

  // Fetch the products from the server
  fetch('/get_items')
    .then(response => response.json())
    .then(products => {
      // Filter products based on the selected criteria
      let filteredProducts = products.filter(product => {
        const categoryMatch = categoryFilter === 'all' || product.category === categoryFilter;
        const conditionMatch = conditionFilter === 'all' || product.condition === conditionFilter;
        const ageMatch = ageFilter === 'all' || product.for === ageFilter;
        const priceMatch = product.price >= minPriceFilter && product.price <= maxPriceFilter;

        return categoryMatch && conditionMatch && ageMatch && priceMatch;
      });

      // Sort the filtered products
      filteredProducts = sortProducts(filteredProducts, sortOrder);

      // Display the filtered and sorted products
      filteredProducts.forEach(product => {
        productList.innerHTML += `
          <div class="col-sm-6 col-lg-4 mb-4 product-card" data-category="${product.category}">
            <div class="card">
              <img src="${product.image}" class="card-img-top product-image" alt="${product.name}">
              <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">$${product.price.toFixed(2)}</p>
                <p class="card-text text-muted">${product.condition === 'used' ? '(Segunda Mano)' : ''}</p>
                <button class="btn btn-primary w-100 mt-2" onclick="addRandomItemToCart()">Añadir Producto al Carrito</button>
              </div>
            </div>
          </div>
        `;
      });

      // Update the product count display
      document.getElementById('product-count').textContent = `${filteredProducts.length} productos encontrados`;
    })
    .catch(error => {
      console.error('Error al obtener los items del carrito:', error);
    });
}

// Sort the products based on the selected sort order
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
    case 'popularity':
      return products.sort((a, b) => b.popularity - a.popularity);
    case 'added-date':
      return products.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
    default:
      return products;
  }
}

// Initialize filters on DOM load
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const edad = params.get('edad');
  
  if (edad) {
    document.getElementById('age-filter').value = edad;
    setAgeFilter(edad);
  }

  filterProducts();
});
