/**
 * @jest-environment jsdom
 */

const { fetchLatestItems, updateLatestItems } = require('../Pages/Home'); // Ruta correcta del archivo

// Mockear fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([
        {
          id: 1,
          name: 'Producto 1',
          price: 19.99,
          image_url: 'producto1.jpg',
        },
        {
          id: 2,
          name: 'Producto 2',
          price: 49.99,
          image_url: 'producto2.jpg',
        },
        {
          id: 3,
          name: 'Producto 3',
          price: 79.99,
          image_url: 'producto3.jpg',
        },
      ]),
  })
);

describe('fetchLatestItems', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <section class="py-5 bg-light">
        <div class="container">
          <h2 class="text-center mb-5">Nuevas llegadas!</h2>
          <div class="row g-4"></div>
        </div>
      </section>
    `;
  });

  it('debería hacer la petición y actualizar el DOM con los nuevos productos', async () => {
    await fetchLatestItems(); // Llamada a la función a testear

    // Verificar que fetch fue llamado correctamente
    expect(fetch).toHaveBeenCalledWith('/latest_items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ limit: 3 }),
    });

    // Verificar que el DOM fue actualizado
    const items = document.querySelectorAll('.col-md-4');
    expect(items.length).toBe(3); // Deberían haber 3 productos

    expect(items[0].querySelector('.card-title').textContent).toBe('Producto 1');
    expect(items[0].querySelector('.card-text').textContent).toBe('$19.99');
    expect(items[1].querySelector('.card-title').textContent).toBe('Producto 2');
    expect(items[1].querySelector('.card-text').textContent).toBe('$49.99');
    expect(items[2].querySelector('.card-title').textContent).toBe('Producto 3');
    expect(items[2].querySelector('.card-text').textContent).toBe('$79.99');
  });
});
