const loginCard = document.getElementById('login-card');
const registerCard = document.getElementById('register-card');

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