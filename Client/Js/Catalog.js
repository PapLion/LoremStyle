const mockProducts = [
  { id: 1, name: "Camiseta Básica", price: 19.99, category: "camisas", condition: "new", image: "https://via.placeholder.com/200", tipoRopa: "camisas", edad: "adultos", releaseDate: "2023-01-01", popularity: 5, addedDate: "2023-01-10" },
  { id: 2, name: "Vestido Floral", price: 49.99, category: "vestidos", condition: "new", image: "https://via.placeholder.com/200", tipoRopa: "vestidos", edad: "adultos", releaseDate: "2023-02-01", popularity: 3, addedDate: "2023-02-10" },
  { id: 3, name: "Reloj Clásico", price: 99.99, category: "accesorios", condition: "new", image: "https://via.placeholder.com/200", tipoRopa: "accesorios", edad: "adultos", releaseDate: "2023-03-01", popularity: 4, addedDate: "2023-03-10" },
  { id: 4, name: "Jeans de Segunda Mano", price: 29.99, category: "pantalones", condition: "used", image: "https://via.placeholder.com/200", tipoRopa: "pantalones", edad: "adultos", releaseDate: "2023-04-01", popularity: 2, addedDate: "2023-04-10" },
  { id: 5, name: "Blusa Elegante", price: 39.99, category: "camisas", condition: "new", image: "https://via.placeholder.com/200", tipoRopa: "camisas", edad: "adultos", releaseDate: "2023-05-01", popularity: 5, addedDate: "2023-05-10" },
  { id: 6, name: "Shorts Veraniegos", price: 25.99, category: "shorts", condition: "new", image: "https://via.placeholder.com/200", tipoRopa: "shorts", edad: "adultos", releaseDate: "2023-06-01", popularity: 3, addedDate: "2023-06-10" },
  { id: 7, name: "Falda de Tela", price: 35.99, category: "faldas", condition: "new", image: "https://via.placeholder.com/200", tipoRopa: "faldas", edad: "adultos", releaseDate: "2023-07-01", popularity: 4, addedDate: "2023-07-10" },
  { id: 8, name: "Camiseta de Rayas", price: 22.99, category: "camisas", condition: "new", image: "https://via.placeholder.com/200", tipoRopa: "camisas", edad: "adultos", releaseDate: "2023-08-01", popularity: 5, addedDate: "2023-08-10" },
  { id: 9, name: "Vestido de Noche", price: 89.99, category: "vestidos", condition: "new", image: "https://via.placeholder.com/200", tipoRopa: "vestidos", edad: "adultos", releaseDate: "2023-09-01", popularity: 2, addedDate: "2023-09-10" },
  { id: 10, name: "Pantalones Cortos", price: 34.99, category: "pantalones", condition: "new", image: "https://via.placeholder.com/200", tipoRopa: "pantalones", edad: "adultos", releaseDate: "2023-10-01", popularity: 3, addedDate: "2023-10-10" },
  { id: 11, name: "Camiseta de Algodón", price: 19.99, category: "camisas", condition: "new", image: "https://via.placeholder.com/200", tipoRopa: "camisas", edad: "adultos", releaseDate: "2023-11-01", popularity: 5, addedDate: "2023-11-10" },
  { id: 12, name: "Vestido de Verano", price: 54.99, category: "vestidos", condition: "new", image: "https://via.placeholder.com/200", tipoRopa: "vestidos", edad: "adultos", releaseDate: "2023-12-01", popularity: 4, addedDate: "2023-12-10" },
  { id: 13, name: "Cinturón de Cuero", price: 29.99, category: "accesorios", condition: "new", image: "https://via.placeholder.com/200", tipoRopa: "accesorios", edad: "adultos", releaseDate: "2024-01-01", popularity: 3, addedDate: "2024-01-10" },
  { id: 14, name: "Pantalones de Tela", price: 39.99, category: "pantalones", condition: "new", image: "https://via.placeholder.com/200", tipoRopa: "pantalones", edad: "adultos", releaseDate: "2024-02-01", popularity: 2, addedDate: "2024-02-10" },
  { id: 15, name: "Camiseta de Manga Larga", price: 24.99, category: "camisas", condition: "new", image: "https://via.placeholder.com/200", tipoRopa: "camisas", edad: "adultos", releaseDate: "2024-03-01", popularity: 5, addedDate: "2024-03-10" },
  { id: 16, name: "Vestido Casual", price: 44.99, category: "vestidos", condition: "new", image: "https://via.placeholder.com/200", tipoRopa: "vestidos", edad: "adultos", releaseDate: "2024-04-01", popularity: 4, addedDate: "2024-04-10" },
  { id: 17, name: "Gorra de Beisbol", price: 15.99, category: "accesorios", condition: "new", image: "https://via.placeholder.com/200", tipoRopa: "accesorios", edad: "adultos", releaseDate: "2024-05-01", popularity: 3, addedDate: "2024-05-10" },
  { id: 18, name: "Pantalones de Mezclilla", price: 49.99, category: "pantalones", condition: "new", image: "https://via.placeholder.com/200", tipoRopa: "pantalones", edad: "adultos", releaseDate: "2024-06-01", popularity: 2, addedDate: "2024-06-10" },
  { id: 19, name: "Camiseta de Diseño", price: 27.99, category: "camisas", condition: "new", image: "https://via.placeholder.com/200", tipoRopa: "camisas", edad: "adolescentes", releaseDate: "2024-07-01", popularity: 5, addedDate: "2024-07-10" },
  { id: 20, name: "Vestido de Fiesta", price: 99.99, category: "vestidos", condition: "new", image: "https://via.placeholder.com/200", tipoRopa: "vestidos", edad: "adultos", releaseDate: "2024-08-01", popularity: 1, addedDate: "2024-08-10" },
  { id: 21, name: "Pulsera de Moda", price: 19.99, category: "accesorios", condition: "new", image: "https://via.placeholder.com/200", tipoRopa: "accesorios", edad: "adultos", releaseDate: "2024-09-01", popularity: 4, addedDate: "2024-09-10" },
  { id: 22, name: "Pantalones Chinos", price: 39.99, category: "pantalones", condition: "new", image: "https://via.placeholder.com/200", tipoRopa: "pantalones", edad: "adultos", releaseDate: "2024-10-01", popularity: 3, addedDate: "2024-10-10" },
  { id: 23, name: "Camiseta de Verano", price: 21.99, category: "camisas", condition: "new", image: "https://via.placeholder.com/200", tipoRopa: "camisas", edad: "adultos", releaseDate: "2024-11-01", popularity: 5, addedDate: "2024-11-10" },
  { id: 24, name: "Vestido de Oficina", price: 59.99, category: "vestidos", condition: "new", image: "https://via.placeholder.com/200", tipoRopa: "vestidos", edad: "adultos", releaseDate: "2024-12-01", popularity: 4, addedDate: "2024-12-10" },
  { id: 25, name: "Reloj Deportivo", price: 79.99, category: "accesorios", condition: "new", image: "https://via.placeholder.com/200", tipoRopa: "accesorios", edad: "adultos", releaseDate: "2025-01-01", popularity: 3, addedDate: "2025-01-10" },
  { id: 26, name: "Pantalones de Jogging", price: 34.99, category: "pantalones", condition: "new", image: "https://via.placeholder.com/200", tipoRopa: "pantalones", edad: "adultos", releaseDate: "2025-02-01", popularity: 2, addedDate: "2025-02-10" },

  { id: 27, name: "Camiseta de Superhéroe", price: 15.99, category: "niños", condition: "new", image: "https://via.placeholder.com/200", tipoRopa: "camisas", edad: "niños", releaseDate: "2023-01-01", popularity: 5, addedDate: "2023-01-10" },
  { id: 28, name: "Pantalones Cortos de Verano", price: 19.99, category: "niños", condition: "new", image: "https://via.placeholder.com/200", tipoRopa: "pantalones", edad: "niños", releaseDate: "2023-02-01", popularity: 3, addedDate: "2023-02-10" },
  { id: 29, name: "Zapatos Deportivos", price: 29.99, category: "niños", condition: "new", image: "https://via.placeholder.com/200", tipoRopa: "accesorios", edad: "niños", releaseDate: "2023-03-01", popularity: 4, addedDate: "2023-03-10" },
  { id: 30, name: "Sudadera con Capucha", price: 24.99, category: "niños", condition: "new", image: "https://via.placeholder.com/200", tipoRopa: "sudaderas", edad: "niños", releaseDate: "2023-04-01", popularity: 2, addedDate: "2023-04-10" },
  { id: 31, name: "Gorra de Color", price: 12.99, category: "niños", condition: "new", image: "https://via.placeholder.com/200", tipoRopa: "accesorios", edad: "niños", releaseDate: "2023-05-01", popularity: 5, addedDate: "2023-05-10" },

  { id: 32, name: "Body de Algodón", price: 9.99, category: "bebés", condition: "new", image: "https://via.placeholder.com/200", tipoRopa: "ropa interior", edad: "bebés", releaseDate: "2023-06-01", popularity: 3, addedDate: "2023-06-10" },
  { id: 33, name: "Pantalones de Bebé", price: 14.99, category: "bebés", condition: "new", image: "https://via.placeholder.com/200", tipoRopa: "pantalones", edad: "bebés", releaseDate: "2023-07-01", popularity: 4, addedDate: "2023-07-10" },
  { id: 34, name: "Zapatos de Bebé", price: 19.99, category: "bebés", condition: "new", image: "https://via.placeholder.com/200", tipoRopa: "accesorios", edad: "bebés", releaseDate: "2023-08-01", popularity: 2, addedDate: "2023-08-10" },
  { id: 35, name: "Manta Suave", price: 22.99, category: "bebés", condition: "new", image: "https://via.placeholder.com/200", tipoRopa: "accesorios", edad: "bebés", releaseDate: "2023-09-01", popularity: 5, addedDate: "2023-09-10" },
  { id: 36, name: "Gorro de Bebé", price: 7.99, category: "bebés", condition: "new", image: "https://via.placeholder.com/200", tipoRopa: "accesorios", edad: "bebés", releaseDate: "2023-10-01", popularity: 3, addedDate: "2023-10-10" },

  { id: 37, name: "Camiseta de Diseño", price: 19.99, category: "adolescentes", condition: "new", image: "https://via.placeholder.com/200", tipoRopa: "camisas", edad: "adolescentes", releaseDate: "2023-11-01", popularity: 5, addedDate: "2023-11-10" },
  { id: 38, name: "Chaqueta de Cuero", price: 89.99, category: "adolescentes", condition: "new", image: "https://via.placeholder.com/200", tipoRopa: "chaquetas", edad: "adolescentes", releaseDate: "2023-12-01", popularity: 4, addedDate: "2023-12-10" },
  { id: 39, name: "Zapatillas de Moda", price: 49.99, category: "adolescentes", condition: "new", image: "https://via.placeholder.com/200", tipoRopa: "accesorios", edad: "adolescentes", releaseDate: "2024-01-01", popularity: 3, addedDate: "2024-01-10" },
  { id: 40, name: "Pantalones de Chándal", price: 34.99, category: "adolescentes", condition: "new", image: "https://via.placeholder.com/200", tipoRopa: "pantalones", edad: "adolescentes", releaseDate: "2024-02-01", popularity: 2, addedDate: "2024-02-10" },
  { id: 41, name: "Sudadera Estilizada", price: 29.99, category: "adolescentes", condition: "new", image: "https://via.placeholder.com/200", tipoRopa: "sudaderas", edad: "adolescentes", releaseDate: "2024-03-01", popularity: 5, addedDate: "2024-03-10" },

  { id: 42, name: "Camisa de Vestir", price: 39.99, category: "adultos", condition: "new", image: "https://via.placeholder.com/200", tipoRopa: "camisas", edad: "adultos", releaseDate: "2024-04-01", popularity: 4, addedDate: "2024-04-10" },
  { id: 43, name: "Pantalones Formales", price: 59.99, category: "adultos", condition: "new", image: "https://via.placeholder.com/200", tipoRopa: "pantalones", edad: "adultos", releaseDate: "2024-05-01", popularity: 3, addedDate: "2024-05-10" },
  { id: 44, name: "Chaqueta de Invierno", price: 99.99, category: "adultos", condition: "new", image: "https://via.placeholder.com/200", tipoRopa: "chaquetas", edad: "adultos", releaseDate: "2024-06-01", popularity: 2, addedDate: "2024-06-10" },
  { id: 45, name: "Zapatos de Cuero", price: 79.99, category: "adultos", condition: "new", image: "https://via.placeholder.com/200", tipoRopa: "accesorios", edad: "adultos", releaseDate: "2024-07-01", popularity: 5, addedDate: "2024-07-10" },
  { id: 46, name: "Bufanda de Lana", price: 24.99, category: "adultos", condition: "new", image: "https://via.placeholder.com/200", tipoRopa: "accesorios", edad: "adultos", releaseDate: "2024-08-01", popularity: 3, addedDate: "2024-08-10" }
];

let categoryFilter = 'all'; 
let conditionFilter = 'all'; 
let ageFilter = 'all';       
let minPriceFilter = 0;      
let maxPriceFilter = Infinity; 
let sortOrder = 'price-asc'; 

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
  updateURLParameter('edad', value); 
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

function updateURLParameter(param, value) {
  const url = new URL(window.location);
  url.searchParams.set(param, value);
  window.history.pushState({}, '', url);
}

function filterProducts() {
  const productList = document.getElementById('product-list');
  productList.innerHTML = ''; 

  let filteredProducts = mockProducts.filter(product => {
    const categoryMatch = categoryFilter === 'all' || product.category === categoryFilter;
    const conditionMatch = conditionFilter === 'all' || product.condition === conditionFilter;
    const ageMatch = ageFilter === 'all' || product.edad === ageFilter;
    const priceMatch = product.price >= minPriceFilter && product.price <= maxPriceFilter;

    return categoryMatch && conditionMatch && ageMatch && priceMatch;
  });

  filteredProducts = sortProducts(filteredProducts, sortOrder);

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

  document.getElementById('product-count').textContent = `${filteredProducts.length} productos encontrados`;
}

function sortProducts(products, order) {
  switch (order) {
    case 'price-asc':
      return products.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return products.sort((a, b) => b.price - a.price);
    case 'date-asc':
      return products.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
    case 'date-desc':
      return products.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
    case 'popularity':
      return products.sort((a, b) => b.popularity - a.popularity);
    case 'added-date':
      return products.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
    default:
      return products;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const edad = params.get('edad');
  
  if (edad) {
    document.getElementById('age-filter').value = edad;
    setAgeFilter(edad);
  }

  filterProducts();
});
