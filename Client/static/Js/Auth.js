const loginCard = document.getElementById('login-card');
const registerCard = document.getElementById('register-card');

/*  Necesito que realices una petición (POST) a la ruta /join_request.
    Datos a enviar si el formulario es un inicio de sesión:
        name: null
        email: str
        password: str      

    Datos a enviar si el formulario es un registro de usuaro:
        name: str
        email: str
        password: str
    
    El valor de "name", le indica al servidor si el formulario es un
    inicio de sesión o un registro de usuario, así que ten muy en cuenta este
    punto.
        ".*/

loginCard.addEventListener('click', function() {
  loginCard.classList.add('active');
  loginCard.classList.remove('inactive');
  registerCard.classList.remove('active');
  registerCard.classList.add('inactive');
});

registerCard.addEventListener('click', function() {
  registerCard.classList.add('active');
  registerCard.classList.remove('inactive');
  loginCard.classList.remove('active');
  loginCard.classList.add('inactive');
});