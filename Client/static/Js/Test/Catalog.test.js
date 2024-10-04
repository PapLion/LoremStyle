/**
 * @jest-environment jsdom
 */
const { fetchCartItems, addItemToCart, removeItemFromCart, updateCart, clearCart } = require('../Utils/Side-Cart.js');

// Simulamos productos de prueba
const mockProducts = [
    { category: 'electronics', condition: 'new', for: 'adult', price: 300, popularity: 5, release_date: '2023-01-01', addedDate: '2023-09-01' },
    { category: 'clothing', condition: 'used', for: 'child', price: 50, popularity: 2, release_date: '2022-06-15', addedDate: '2023-09-02' },
  ];
  
  // Definimos las variables de filtro
  let categoryFilter = 'all'; 
  let conditionFilter = 'all'; 
  let ageFilter = 'all';       
  let minPriceFilter = 0;      
  let maxPriceFilter = Infinity; 
  let sortOrder = 'price-asc';
  
  // Funciones de configuración de filtros
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
  
  // Función para actualizar la URL
  function updateURLParameter(param, value) {
    const url = new URL(window.location);
    url.searchParams.set(param, value);
    window.history.pushState({}, '', url);
  }
  
  // Simulamos la función de filtrado de productos
  function filterProducts() {
    let filteredProducts = mockProducts.filter(product => {
      const categoryMatch = categoryFilter === 'all' || product.category === categoryFilter;
      const conditionMatch = conditionFilter === 'all' || product.condition === conditionFilter;
      const ageMatch = ageFilter === 'all' || product.for === ageFilter;
      const priceMatch = product.price >= minPriceFilter && product.price <= maxPriceFilter;
  
      return categoryMatch && conditionMatch && ageMatch && priceMatch;
    });
  
    // Aplicamos el ordenamiento
    filteredProducts = sortProducts(filteredProducts, sortOrder);
  
    return filteredProducts;
  }
  
  // Función para ordenar los productos
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
  
  // --- Tests ---
// Update any test that uses cartItems directly
test('should update category filter correctly', () => {
  const SideCart = require('../Utils/Side-Cart.js');
  SideCart.setCartItems([/* your test cart items */]);
  setCategoryFilter('electronics');
  expect(categoryFilter).toBe('electronics');
});
  
  test('should update condition filter correctly', () => {
    setConditionFilter('new');
    expect(conditionFilter).toBe('new');
  });
  
  test('should update age filter correctly', () => {
    setAgeFilter('adult');
    expect(ageFilter).toBe('adult');
  });
  
  test('should update price filter correctly', () => {
    setPriceFilter(100, 500);
    expect(minPriceFilter).toBe(100);
    expect(maxPriceFilter).toBe(500);
  });
  
  test('should update URL parameter correctly', () => {
    updateURLParameter('for', 'adult');
    const url = new URL(window.location);
    expect(url.searchParams.get('for')).toBe('adult');
  });
  
  test('should filter products based on category, condition, and price', () => {
    setCategoryFilter('electronics');
    setConditionFilter('new');
    setPriceFilter(100, 400);
  
    const filteredProducts = filterProducts();
    expect(filteredProducts.length).toBe(1); // Solo hay un producto que coincida
  });
  
  test('should sort products by price ascending', () => {
    const sortedProducts = sortProducts(mockProducts, 'price-asc');
    expect(sortedProducts[0].price).toBe(50);
    expect(sortedProducts[1].price).toBe(300);
  });
  
  test('should sort products by date descending', () => {
    const sortedProducts = sortProducts(mockProducts, 'date-desc');
    expect(new Date(sortedProducts[0].release_date).getTime()).toBeGreaterThan(new Date(sortedProducts[1].release_date).getTime());
  });
  
  