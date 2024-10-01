window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    const edad = params.get('edad');
  
    if (edad) {
      document.getElementById('age-filter').value = edad;
      setAgeFilter(edad); 
    }
  };

  function redirectToCatalog(edadSeleccionada) {
    window.location.href = `./Html/Catalog.html?edad=${edadSeleccionada}`;
  }