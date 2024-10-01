document.addEventListener('DOMContentLoaded', function () {
    const genderGroups = [
      { id: 'men', name: 'Hombre', icon: '👨', description: 'Ropa y accesorios para hombres' },
      { id: 'women', name: 'Mujer', icon: '👩', description: 'Ropa y accesorios para mujeres' },
      { id: 'unisex', name: 'Unisex', icon: '🧑', description: 'Ropa y accesorios para todos' }
    ];
  
    let selectedGender = null;
  
    const genderSelectionDiv = document.getElementById('gender-selection');
    const CatalogLink = document.getElementById('Catalog-link');
  
    genderGroups.forEach(group => {
      const cardDiv = document.createElement('div');
      cardDiv.classList.add('col-md-4', 'mb-4');
      
      cardDiv.innerHTML = `
        <div class="card" data-gender="${group.id}">
          <div class="card-body">
            <h5 class="card-title">${group.icon} ${group.name}</h5>
            <p class="card-text">${group.description}</p>
          </div>
        </div>
      `;
      
      genderSelectionDiv.appendChild(cardDiv);
    });
  
    genderSelectionDiv.addEventListener('click', function (e) {
      const card = e.target.closest('.card');
      if (card) {
        const selectedId = card.getAttribute('data-gender');
  
        document.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
  
        card.classList.add('selected');
        selectedGender = selectedId;
  
        CatalogLink.classList.remove('disabled');
        CatalogLink.setAttribute('href', `/Catalog?genero=${selectedGender}`);
      }
    });
  });
  