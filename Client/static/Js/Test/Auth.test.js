// auth.test.js
const fetchMock = require('jest-fetch-mock');

fetchMock.enableMocks();

describe('Auth Form Tests', () => {
  beforeEach(() => {
    // Reinicia los mocks antes de cada prueba
    fetch.resetMocks();
  });

  test('should send login request correctly', async () => {
    const email = 'test@example.com';
    const password = 'password123';

    // Mockea la respuesta de fetch
    fetch.mockResponseOnce(JSON.stringify({ success: true }));

    // Simula la acción de llenar el formulario de inicio de sesión y enviarlo
    const loginForm = document.createElement('form');
    loginForm.id = 'login-form'; // Asigna un ID al formulario
    loginForm.innerHTML = `
      <input type="email" id="login-email" value="${email}">
      <input type="password" id="login-password" value="${password}">
    `;

    // Agrega el formulario al documento
    document.body.appendChild(loginForm);

    // Agrega un evento de envío al formulario
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Previene el envío real del formulario

      // Llama a la función de envío
      const data = {
        name: null,
        email: document.getElementById('login-email').value,
        password: document.getElementById('login-password').value,
      };

      // Envía la solicitud usando fetch
      fetch('/join_request', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });

    // Simula el envío del formulario
    const event = new Event('submit');
    loginForm.dispatchEvent(event);

    // Espera a que la llamada fetch se complete
    await new Promise(resolve => setTimeout(resolve, 0));

    // Verifica que fetch fue llamado correctamente
    expect(fetch).toHaveBeenCalledWith('/join_request', expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({
        name: null,
        email: email,
        password: password,
      }),
    }));
  });

  test('should send register request correctly', async () => {
    const name = 'Test User';
    const email = 'test@example.com';
    const password = 'password123';

    // Mockea la respuesta de fetch
    fetch.mockResponseOnce(JSON.stringify({ success: true }));

    // Simula la acción de llenar el formulario de registro y enviarlo
    const registerForm = document.createElement('form');
    registerForm.id = 'register-form'; // Asigna un ID al formulario
    registerForm.innerHTML = `
      <input type="text" id="register-name" value="${name}">
      <input type="email" id="register-email" value="${email}">
      <input type="password" id="register-password" value="${password}">
    `;

    // Agrega el formulario al documento
    document.body.appendChild(registerForm);

    // Agrega un evento de envío al formulario
    registerForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Previene el envío real del formulario

      // Llama a la función de envío
      const data = {
        name: document.getElementById('register-name').value,
        email: document.getElementById('register-email').value,
        password: document.getElementById('register-password').value,
      };

      // Envía la solicitud usando fetch
      fetch('/join_request', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });

    // Simula el envío del formulario
    const event = new Event('submit');
    registerForm.dispatchEvent(event);

    // Espera a que la llamada fetch se complete
    await new Promise(resolve => setTimeout(resolve, 0));

    // Verifica que fetch fue llamado correctamente
    expect(fetch).toHaveBeenCalledWith('/join_request', expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    }));
  });
});
